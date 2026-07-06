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

function renderOAuthResponse(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Autenticando...</title>
  </head>
  <body>
    <script>
      (function () {
        function receiveMessage(message) {
          window.opener.postMessage(${JSON.stringify(message)}, message.origin);
          window.removeEventListener('message', receiveMessage, false);
        }

        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    <p>Autenticando com GitHub...</p>
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

  if (!clientId || !clientSecret) {
    res
      .status(500)
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
      .status(400)
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
      .status(500)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        renderOAuthResponse('error', {
          error: 'unexpected_error',
          message: error instanceof Error ? error.message : 'Erro inesperado no OAuth.',
        })
      );
  }
}
