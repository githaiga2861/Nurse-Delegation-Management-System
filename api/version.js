// GET /api/version -> { v } : the deployed commit. Pages compare it with the version they loaded
// and show an "Update now" banner when a newer version has been deployed.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ v: process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || 'dev' }));
};
