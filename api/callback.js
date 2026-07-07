/*
============================================================
API ROUTE: /api/callback
============================================================
Recebe o retorno do GitHub, troca o code por token e devolve
esse token para o Decap CMS via postMessage.

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

function renderOAuthResponse(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

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
        width: min(520px, calc(100% - 32px));
        border-radius: 18px;
        background: white;
        padding: 28px;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
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
      <h1>
        ${status === 'success' ? 'Login autorizado' : 'Erro na autenticação'}
      </h1>

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
        var message = ${JSON.stringify(message)};

        function sendMessage(targetOrigin) {
          if (!window.opener) {
            document.getElementById('status').textContent =
              'Esta janela foi aberta sem conexão com o painel. Feche e tente entrar pelo /admin novamente.';
            return;
          }

          try {
            window.opener.postMessage(message, targetOrigin || '*');
          } catch (error) {
            window.opener.postMessage(message, '*');
          }
        }

        function receiveMessage(event) {
          sendMessage(event.origin);
          window.removeEventListener('message', receiveMessage, false);

          setTimeout(function () {
            window.close();
          }, 700);
        }

        window.addEventListener('message', receiveMessage, false);

        // Envia imediatamente para o Decap.
        sendMessage('*');

        // Mantém compatibilidade com o handshake usado pelo Decap.
        if (window.opener) {
          window.opener.postMessage('authorizing:github', '*');
        }

        // Tentativas extras caso o painel demore a escutar.
        setTimeout(function () {
          sendMessage('*');
        }, 500);

        setTimeout(function () {
          sendMessage('*');
        }, 1200);

        setTimeout(function () {
          document.getElementById('status').textContent =
            'Se esta janela não fechar automaticamente, feche-a e volte para o painel.';
        }, 2500);
      })();
    </script>
  </body>
</html>`;
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
    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('error', {
          error: githubError,
          message: githubErrorDescription || 'GitHub recusou a autenticação.',
        })
      );
    return;
  }

  if (!clientId || !clientSecret) {
    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('error', {
          error: 'missing_environment_variables',
          message: 'OAUTH_CLIENT_ID ou OAUTH_CLIENT_SECRET não configurado na Vercel.',
        })
      );
    return;
  }

  if (!code) {
    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('error', {
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
      res
        .status(200)
        .setHeader('Content-Type', 'text/html; charset=utf-8')
        .send(
          renderOAuthResponse('error', {
            error: tokenData.error || 'token_exchange_failed',
            message: tokenData.error_description || 'Não foi possível obter o token do GitHub.',
          })
        );
      return;
    }

    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('success', {
          token: tokenData.access_token,
        })
      );
  } catch (error) {
    res
      .status(200)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('error', {
          error: 'unexpected_error',
          message: error instanceof Error ? error.message : 'Erro inesperado no OAuth.',
        })
      );
  }
}
