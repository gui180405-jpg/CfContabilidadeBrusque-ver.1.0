/*
============================================================
API ROUTE: /api/auth
============================================================
Inicia o login do Decap CMS com GitHub na Vercel.

Variável necessária na Vercel:
- OAUTH_CLIENT_ID
============================================================
*/

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

function randomState() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
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

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  // GitHub usa escopos separados por espaço.
  // repo = permite criar/editar arquivos no repositório.
  // user = permite identificar o usuário autenticado.
  authUrl.searchParams.set('scope', 'repo user');

  authUrl.searchParams.set('state', randomState());

  res.setHeader('Location', authUrl.toString());
  res.status(302).end();
}
