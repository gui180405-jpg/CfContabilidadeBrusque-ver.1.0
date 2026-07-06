/*
============================================================
API ROUTE: /api/auth
============================================================
Inicia o login do Decap CMS com GitHub.

Requer variáveis de ambiente na Vercel:
- OAUTH_CLIENT_ID
- OAUTH_CLIENT_SECRET
============================================================
*/

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).send('Missing OAUTH_CLIENT_ID environment variable.');
    return;
  }

  const redirectUri = `${getBaseUrl(req)}/api/callback`;
  const state = Array.isArray(req.query.state) ? req.query.state[0] : req.query.state;

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'repo,user');

  if (state) {
    authUrl.searchParams.set('state', state);
  }

  res.setHeader('Location', authUrl.toString());
  res.status(302).end();
}
