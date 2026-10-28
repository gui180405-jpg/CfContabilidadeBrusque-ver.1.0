/*
============================================================
API: /api/callback — retorno do GitHub no login do painel
============================================================
1. confere o "state" (cookie HttpOnly x parâmetro da URL);
2. troca o "code" pelo token no GitHub (o segredo fica só aqui);
3. entrega o token ao painel por postMessage, apenas para a
   mesma origem (ver api/_oauth.js).
============================================================
*/
import {
  STATE_COOKIE,
  firstParam,
  getEnv,
  getOrigin,
  readCookie,
  renderResult,
  safeEqual,
  stateCookie,
} from './_oauth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    res.end('Method not allowed');
    return;
  }

  // o state vale uma única vez
  res.setHeader('Set-Cookie', stateCookie('', 0));

  const query = req.query || Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
  const code = firstParam(query.code);
  const state = firstParam(query.state);
  const githubError = firstParam(query.error);
  const { clientId, clientSecret } = getEnv();
  const origin = getOrigin(req);

  if (githubError) {
    // só um código curto e conhecido aparece na tela
    renderResult(res, 'error', { error: githubError === 'access_denied' ? 'acesso_negado' : 'github_recusou' });
    return;
  }
  if (!clientId || !clientSecret || !origin) {
    renderResult(res, 'error', { error: 'oauth_nao_configurado' });
    return;
  }
  if (!state || !safeEqual(state, readCookie(req, STATE_COOKIE))) {
    renderResult(res, 'error', { error: 'sessao_expirada' });
    return;
  }
  if (!code || typeof code !== 'string' || code.length > 200) {
    renderResult(res, 'error', { error: 'codigo_ausente' });
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'cf-contabilidade-painel-blog',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.error || typeof data.access_token !== 'string') {
      renderResult(res, 'error', { error: 'troca_de_token_falhou' });
      return;
    }

    renderResult(res, 'success', { token: data.access_token });
  } catch {
    renderResult(res, 'error', { error: 'falha_de_conexao' });
  }
}
