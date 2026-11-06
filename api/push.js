// Vercel serverless function: sends Web Push notifications for the Messages chat.
// No npm dependencies (VAPID + aes128gcm implemented with Node crypto).
//
// Vercel → Project → Settings → Environment Variables:
//   VAPID_PUBLIC_KEY   (base64url, 65-byte uncompressed P-256 public key)
//   VAPID_PRIVATE_KEY  (base64url, 32-byte private key)
//   VAPID_SUBJECT      optional, e.g. mailto:you@example.com
//
// GET  /api/push            -> { publicKey }
// POST /api/push { message_id, supa_url, supa_key }  (Authorization: Bearer <user access token>)
//      Verifies the caller through Supabase (RLS), then notifies the other member's devices.

const crypto = require('crypto');

const b64u = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const ub64 = (s) => { s = String(s).replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return Buffer.from(s, 'base64'); };

function vapidJWT(audience, subject, pubB64, privB64) {
  const header = b64u(JSON.stringify({ typ: 'JWT', alg: 'ES256' }));
  const payload = b64u(JSON.stringify({ aud: audience, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject }));
  const pub = ub64(pubB64);
  const key = crypto.createPrivateKey({
    key: { kty: 'EC', crv: 'P-256', x: b64u(pub.subarray(1, 33)), y: b64u(pub.subarray(33, 65)), d: privB64 },
    format: 'jwk',
  });
  const sig = crypto.sign('sha256', Buffer.from(header + '.' + payload), { key, dsaEncoding: 'ieee-p1363' });
  return header + '.' + payload + '.' + b64u(sig);
}

// RFC 8291 (aes128gcm) payload encryption
function encrypt(plaintext, p256dhB64, authB64) {
  const uaPublic = ub64(p256dhB64);
  const authSecret = ub64(authB64);
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.generateKeys();
  const asPublic = ecdh.getPublicKey();
  const shared = ecdh.computeSecret(uaPublic);
  const salt = crypto.randomBytes(16);
  const keyInfo = Buffer.concat([Buffer.from('WebPush: info\0'), uaPublic, asPublic]);
  const ikm = Buffer.from(crypto.hkdfSync('sha256', shared, authSecret, keyInfo, 32));
  const cek = Buffer.from(crypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: aes128gcm\0'), 16));
  const nonce = Buffer.from(crypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: nonce\0'), 12));
  const cipher = crypto.createCipheriv('aes-128-gcm', cek, nonce);
  const body = Buffer.concat([cipher.update(Buffer.concat([Buffer.from(plaintext), Buffer.from([2])])), cipher.final(), cipher.getAuthTag()]);
  const header = Buffer.alloc(21);
  salt.copy(header, 0);
  header.writeUInt32BE(4096, 16);
  header.writeUInt8(65, 20);
  return Buffer.concat([header, asPublic, body]);
}

async function sendOne(sub, payload, keys) {
  const url = new URL(sub.endpoint);
  const jwt = vapidJWT(url.origin, keys.subject, keys.pub, keys.priv);
  const r = await fetch(sub.endpoint, {
    method: 'POST',
    headers: {
      TTL: '86400',
      Urgency: 'high',
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      Authorization: `vapid t=${jwt}, k=${keys.pub}`,
    },
    body: encrypt(JSON.stringify(payload), sub.p256dh, sub.auth),
  });
  return r.status;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const keys = {
    pub: (process.env.VAPID_PUBLIC_KEY || '').trim(),
    priv: (process.env.VAPID_PRIVATE_KEY || '').trim(),
    subject: (process.env.VAPID_SUBJECT || 'mailto:notifications@example.com').trim(),
  };
  if (req.method === 'GET') return res.status(200).json({ publicKey: keys.pub || null });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!keys.pub || !keys.priv) return res.status(500).json({ error: 'VAPID keys are not set on the server' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const supaUrl = String(body.supa_url || process.env.SUPA_URL || '').replace(/\/+$/, '');
    const supaKey = String(body.supa_key || process.env.SUPA_KEY || '');
    if (!token || !body.message_id) return res.status(400).json({ error: 'Missing token or message_id' });
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(supaUrl)) return res.status(400).json({ error: 'Bad Supabase URL' });

    const h = { apikey: supaKey, Authorization: `Bearer ${token}` };
    const get = async (path) => {
      const r = await fetch(`${supaUrl}/rest/v1/${path}`, { headers: h });
      if (!r.ok) throw new Error(`${path.split('?')[0]}: ${r.status}`);
      return r.json();
    };

    // RLS guarantees the caller is a chat member and the message exists
    const msgs = await get(`chat_messages?id=eq.${encodeURIComponent(body.message_id)}&select=id,sender_id,body,attachments,deleted_at`);
    const msg = msgs[0];
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    const members = await get('chat_members?select=user_id,display_name');
    const sender = members.find((m) => m.user_id === msg.sender_id);
    const subs = await get(`chat_push_subs?user_id=neq.${msg.sender_id}&select=endpoint,p256dh,auth`);

    const n = Array.isArray(msg.attachments) ? msg.attachments.length : 0;
    let text = (msg.body || '').trim();
    if (!text && n) text = n === 1 ? `📎 ${msg.attachments[0].name || '1 file'}` : `📎 ${n} files`;
    else if (n) text = `📎 ${n} · ${text}`;
    const payload = {
      title: sender?.display_name || 'New message',
      body: text.length > 140 ? text.slice(0, 137) + '…' : text,
      tag: 'chat',
      url: '/chat/',
      id: msg.id,
    };

    const results = await Promise.allSettled(subs.map((s) => sendOne(s, payload, keys)));
    const gone = [];
    results.forEach((r, i) => { if (r.status === 'fulfilled' && (r.value === 404 || r.value === 410)) gone.push(subs[i].endpoint); });
    for (const ep of gone) {
      await fetch(`${supaUrl}/rest/v1/chat_push_subs?endpoint=eq.${encodeURIComponent(ep)}`, { method: 'DELETE', headers: h }).catch(() => {});
    }
    return res.status(200).json({
      sent: results.filter((r) => r.status === 'fulfilled' && r.value >= 200 && r.value < 300).length,
      devices: subs.length,
      removed: gone.length,
    });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};

module.exports._test = { encrypt, vapidJWT, b64u, ub64 };
