// Messages service worker: push notifications + notification click.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { body: event.data && event.data.text() }; }
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // Skip the banner if the chat is open and visible on this device
    if (wins.some((w) => w.visibilityState === 'visible' && new URL(w.url).pathname.startsWith('/chat'))) return;
    const prev = await self.registration.getNotifications({ tag: 'chat' });
    const count = prev.reduce((n, p) => n + ((p.data && p.data.count) || 1), 0) + 1;
    if ('setAppBadge' in self.navigator) { try { await self.navigator.setAppBadge(count); } catch (e) {} }
    await self.registration.showNotification(d.title || 'New message', {
      body: count > 1 ? `${d.body || ''}\n(${count} new messages)` : (d.body || 'New message'),
      tag: 'chat',
      renotify: true,
      icon: '/chat/icon-192.png',
      badge: '/chat/icon-192.png',
      data: { url: d.url || '/chat/', count },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/chat/';
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) {
      if (new URL(w.url).pathname.startsWith('/chat')) { await w.focus(); return; }
    }
    await self.clients.openWindow(url);
  })());
});
