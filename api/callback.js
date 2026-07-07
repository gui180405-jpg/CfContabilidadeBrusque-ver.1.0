/*
============================================================
API ROUTE: /api/callback
============================================================
Callback OAuth para Decap CMS + GitHub na Vercel.

Esta versão mantém o fluxo padrão do Decap via postMessage
e adiciona um fallback:
se o painel não aceitar o postMessage, o token é salvo no
sessionStorage da janela /admin e o painel é recarregado.

Variáveis necessárias na Vercel:
- OAUTH_CLIENT_ID
- OAUTH_CLIENT_SECRET
============================================================
*/

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

function renderBody(status, content) {
  const payload = `authorization:github:${status}:${JSON.stringify(content)}`;
  const token = status === 'success' && content && content.token ? content.token : '';

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Autenticando com GitHub...</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        background: #f3f4f6;
        color: #0f172a;
      }

      .card {
        width: min(560px, calc(100% - 32px));
        border-radius: 18px;
        background: #ffffff;
        padding: 30px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
        text-align: center;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 22px;
      }

      p {
        margin: 0;
        color: #475569;
        line-height: 1.6;
      }

      code {
        display: inline-block;
        margin-top: 16px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #f1f5f9;
        color: #0369a1;
        font-size: 13px;
      }
    </style>
  </head>

  <body>
    <div class="card">
      <h1>${status === 'success' ? 'Login autorizado' : 'Erro na autenticação'}</h1>
      <p id="status">
        ${
          status === 'success'
            ? 'Finalizando login no painel. Esta janela deve fechar automaticamente.'
            : 'Não foi possível concluir o login. Volte para o painel e tente novamente.'
        }
      </p>
      <code>${content.error || 'Decap CMS OAuth'}</code>
    </div>

    <script>
      (function () {
        var payload = ${JSON.stringify(payload)};
        var token = ${JSON.stringify(token)};

        function setStatus(text) {
          var element = document.getElementById('status');
          if (element) element.textContent = text;
        }

        function sendAuthorization(targetOrigin) {
          if (!window.opener) return false;

          try {
            window.opener.postMessage(payload, targetOrigin || '*');
            return true;
          } catch (error) {
            try {
              window.opener.postMessage(payload, '*');
              return true;
            } catch (innerError) {
              return false;
            }
          }
        }

        function fallbackToAdmin() {
          if (!token) return;

          try {
            if (window.opener && !window.opener.closed) {
              window.opener.sessionStorage.setItem('decap_oauth_token', token);
              window.opener.sessionStorage.setItem('decap_oauth_provider', 'github');
              window.opener.location.href = '/admin/?v=oauth-fallback';
              window.close();
              return;
            }
          } catch (error) {
            // Se o acesso ao opener falhar, tenta na própria janela.
          }

          try {
            sessionStorage.setItem('decap_oauth_token', token);
            sessionStorage.setItem('decap_oauth_provider', 'github');
            window.location.href = '/admin/?v=oauth-fallback';
          } catch (error) {
            setStatus('Login autorizado, mas não foi possível devolver o token ao painel. Tente novamente em aba anônima.');
          }
        }

        function receiveMessage(event) {
          sendAuthorization(event.origin);
          window.removeEventListener('message', receiveMessage, false);

          setTimeout(function () {
            window.close();
          }, 650);
        }

        window.addEventListener('message', receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage('authorizing:github', '*');
        }

        // Tentativa padrão.
        setTimeout(function () {
          sendAuthorization('*');
        }, 600);

        // Fallback mais forte: grava token na janela do admin e recarrega o painel.
        setTimeout(function () {
          setStatus('Login autorizado. Reabrindo o painel...');
          fallbackToAdmin();
        }, 2300);
      })();
    </script>
  </body>
</html>`;
}

function sendHtml(res, html, statusCode = 200) {
  res.status(statusCode);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
  const githubError = Array.isArray(req.query.error) ? req.query.error[0] : req.query.error;
  const githubErrorDescription = Array.isArray(req.query.error_description)
    ? req.query.error_description[0]
    : req.query.error_description;

  if (githubError) {
    sendHtml(
      res,
      renderBody('error', {
        error: githubError,
        message: githubErrorDescription || 'GitHub recusou a autenticação.',
      })
    );
    return;
  }

  if (!clientId || !clientSecret) {
    sendHtml(
      res,
      renderBody('error', {
        error: 'missing_environment_variables',
        message: 'OAUTH_CLIENT_ID ou OAUTH_CLIENT_SECRET não configurado na Vercel.',
      })
    );
    return;
  }

  if (!code) {
    sendHtml(
      res,
      renderBody('error', {
        error: 'missing_code',
        message: 'GitHub não retornou o código de autorização.',
      })
    );
    return;
  }

  try {
    const redirectUri = `${getBaseUrl(req)}/api/callback`;

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'cf-contabilidade-decap-cms',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
      sendHtml(
        res,
        renderBody('error', {
          error: tokenData.error || 'token_exchange_failed',
          message: tokenData.error_description || 'Não foi possível obter o token do GitHub.',
        })
      );
      return;
    }

    sendHtml(
      res,
      renderBody('success', {
        token: tokenData.access_token,
        provider: 'github',
      })
    );
  } catch (error) {
    sendHtml(
      res,
      renderBody('error', {
        error: 'unexpected_error',
        message: error instanceof Error ? error.message : 'Erro inesperado no OAuth.',
      })
    );
  }
}
