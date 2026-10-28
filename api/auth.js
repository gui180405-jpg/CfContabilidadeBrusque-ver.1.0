/*
============================================================
API: /api/auth — início do login "Entrar com GitHub" do painel
============================================================
Variáveis na Vercel (Settings → Environment Variables):
- OAUTH_CLIENT_ID      (do OAuth App criado no GitHub)
- OAUTH_CLIENT_SECRET  (usado só em /api/callback, nunca no navegador)
- OAUTH_SCOPE          (opcional: "public_repo" se o repositório for público)

Sem essas variáveis, o login por token continua funcionando normalmente.
============================================================
*/
import { getEnv, getOrigin, randomState, renderResult, setSecurityHeaders, stateCookie } from './_oauth.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    res.end('Method not allowed');
    return;
  }

  const { clientId, scope } = getEnv();
  const origin = getOrigin(req);

  if (!clientId || !origin) {
    renderResult(res, 'error', { error: 'oauth_nao_configurado' });
    return;
  }

  const state = randomState();
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', `${origin}/api/callback`);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('allow_signup', 'false');

  setSecurityHeaders(res);
  res.setHeader('Set-Cookie', stateCookie(state, 600));
  res.setHeader('Location', authUrl.toString());
  res.statusCode = 302;
  res.end();
}
