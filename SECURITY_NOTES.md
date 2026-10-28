# Notas de segurança — site CF Contabilidade Brusque

Última revisão: auditoria V15 (outubro/2026). Segurança é um processo contínuo: este arquivo
descreve o que o código faz, não substitui conferir a configuração real da Vercel e do GitHub.

## Arquitetura (o que existe e o que não existe)

- Site estático (React/Vite) servido pela Vercel. **Não há banco de dados nem formulário que
  grave dados no servidor.** O diagnóstico monta uma mensagem e abre o WhatsApp; nada é salvo.
- Duas funções na Vercel: `/api/auth` e `/api/callback` — só para o login "Entrar com GitHub"
  do painel do blog. Ficam desligadas (mostram erro amigável) enquanto `OAUTH_CLIENT_ID` e
  `OAUTH_CLIENT_SECRET` não forem cadastrados.
- Painel do blog (`/admin`): Sveltia CMS. **Quem autoriza é o GitHub**: cada salvar é um commit
  feito com o token da pessoa logada; sem permissão de escrita no repositório, nada é gravado.
  Esconder o endereço `/admin` não é a proteção — a permissão do GitHub é.

## Proteções no código

- Sem `dangerouslySetInnerHTML`. O Markdown dos artigos vira elementos React e só aceita links
  `http(s)`, `mailto:`, `tel:` e caminhos do site (bloqueia `javascript:`/`data:`).
- Capa e "link externo" dos artigos são validados no build (`scripts/vite-plugin-cf-blog.js`).
- Rascunhos e artigos agendados não entram no JavaScript público.
- Links externos com `target="_blank"` usam `rel="noopener noreferrer"`.
- Vídeo do YouTube via `youtube-nocookie.com`; fonte Inter servida pelo próprio site
  (nenhuma requisição ao Google Fonts).

## Login OAuth do painel (`api/`)

- `state` aleatório (crypto) em cookie `HttpOnly; Secure; SameSite=Lax`, conferido no retorno (anti-CSRF).
- O token só é entregue por `postMessage` à **mesma origem** do painel — nunca para `"*"`.
- Nada vindo da URL é refletido no HTML sem escape; a página de retorno tem CSP com nonce.
- `OAUTH_CLIENT_SECRET` só existe na função do servidor. Escopo padrão `repo`
  (use `OAUTH_SCOPE=public_repo` se o repositório for público).

## Cabeçalhos (vercel.json)

- Site: `Content-Security-Policy` (scripts só do próprio domínio; iframe só do youtube-nocookie),
  `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy`, `HSTS`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy`.
- Painel: `no-store`, `X-Frame-Options: DENY`, `noindex` e uma CSP em modo **Report-Only**
  (registra no console sem bloquear). O Sveltia injeta um script embutido próprio; antes de tornar
  a CSP obrigatória, abra o painel logado, use todas as telas e confira os avisos no console.
- Sveltia CMS com versão fixa e `integrity` (SRI): um arquivo alterado no CDN não executa.

## Dependências

- `npm audit`: 0 vulnerabilidades na data da auditoria. Rode `npm audit` a cada atualização.
- Atualizações grandes (React 19, Vite 7+, Tailwind 4, Framer Motion 12+) mudam APIs: fazer
  em uma branch separada, com teste completo — não atualizar tudo de uma vez.

## Pendências que dependem de configuração externa

1. **GitHub**: confirmar quem tem permissão de escrita no repositório; ativar 2FA nessas contas;
   ativar Dependabot alerts e Secret scanning (Settings → Code security).
2. **Arquivos removidos do zip**: `public/blog/Persona-5-Royal-Mona.jpg` (imagem de teste sem
   relação com a CF) — apagar também no GitHub.
3. **Domínio próprio**: ao ativar `cfcontabilidadebrusque.com`, trocar `site_url`, `display_url`
   e `base_url` em `public/admin/config.yml` (e o callback do OAuth App, se usado).
4. **LGPD**: o site não coleta dados por formulário, mas usa WhatsApp, YouTube e (se houver)
   análise de visitas. Uma política de privacidade deve ser redigida pela CF/assessoria jurídica
   com as informações reais do tratamento — não foi criado texto jurídico fictício.
