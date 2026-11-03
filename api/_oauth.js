/*
============================================================
OAUTH DO PAINEL DO BLOG — funções compartilhadas
============================================================
Usado por /api/auth e /api/callback (login "Entrar com GitHub" do
Sveltia CMS). Arquivos que começam com "_" não viram rota na Vercel.

Regras de segurança aplicadas aqui:
- "state" aleatório (crypto) guardado em cookie HttpOnly/Secure e
  conferido no retorno → bloqueia login forjado (CSRF).
- O token do GitHub só é entregue por postMessage para a MESMA
  origem do painel (/admin) — nunca para "*".
- Todo texto vindo da URL é escapado antes de ir para o HTML.
- Nada de token, segredo ou código em logs ou mensagens de erro.
============================================================
*/
import crypto from 'node:crypto';

export const STATE_COOKIE = 'cf_oauth_state';

export function getEnv() {
  return {
    clientId: process.env.OAUTH_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
    // "repo" é necessário para repositório privado. Se o repositório for
    // público, defina OAUTH_SCOPE=public_repo na Vercel (permissão menor).
    scope: process.env.OAUTH_SCOPE || 'repo',
  };
}

export function getOrigin(req) {
  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  // host só pode conter caracteres de domínio/porta
  if (!/^[a-z0-9.-]+(:\d+)?$/i.test(host)) return null;
  return `${proto === 'http' ? 'http' : 'https'}://${host}`;
}

export function randomState() {
  return crypto.randomBytes(32).toString('base64url');
}

export function readCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return '';
}

export function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}

export function stateCookie(value, maxAge) {
  return `${STATE_COOKIE}=${encodeURIComponent(value)}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function firstParam(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

// JSON seguro para colocar dentro de <script> (não fecha a tag).
function scriptJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

/**
 * Página devolvida ao popup de login.
 * status: 'success' | 'error'
 * content: { token } no sucesso; { error } (código curto) no erro.
 */
export function renderResult(res, status, content) {
  const nonce = crypto.randomBytes(16).toString('base64');
  const provider = 'github';
  const payload = `authorization:${provider}:${status}:${JSON.stringify({ ...content, provider })}`;
  const ok = status === 'success';

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="robots" content="noindex" />
<title>${ok ? 'Login autorizado' : 'Não foi possível entrar'} | CF Contabilidade</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;background:#F5F4F1;color:#000000}
  main{max-width:520px;padding:32px;border-top:2px solid #194BAC;background:#ECEAE5}
  h1{margin:0 0 12px;font-size:22px} h1{color:#0E2034} p{margin:0;color:#5D5D5C;line-height:1.6} code{color:#194BAC}
</style>
</head>
<body>
<main>
  <h1>${ok ? 'Login autorizado' : 'Não foi possível entrar'}</h1>
  <p id="status">${
    ok
      ? 'Finalizando o login no painel. Esta janela fecha sozinha.'
      : `Volte ao painel e tente de novo. Se continuar, use “Entrar com token de acesso”. <br/>Código: <code>${escapeHtml(content.error)}</code>`
  }</p>
</main>
<script nonce="${nonce}">
(function () {
  var payload = ${scriptJson(payload)};
  var origin = window.location.origin; // o painel fica no MESMO domínio
  var opener = window.opener;
  var status = document.getElementById('status');
  if (!opener) {
    status.textContent = 'Esta janela não encontrou o painel. Feche-a e entre de novo pelo /admin.';
    return;
  }
  window.addEventListener('message', function (event) {
    // só responde ao próprio painel: mesma origem e a janela que abriu o popup
    if (event.origin !== origin || event.source !== opener) return;
    if (event.data !== 'authorizing:github') return;
    opener.postMessage(payload, origin);
    ${ok ? "setTimeout(function () { window.close(); }, 500);" : ''}
  });
  opener.postMessage('authorizing:github', origin);
})();
</script>
</body>
</html>`;

  setSecurityHeaders(res);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
  );
  res.statusCode = ok ? 200 : 400;
  res.end(html);
}
