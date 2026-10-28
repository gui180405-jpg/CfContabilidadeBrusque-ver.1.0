# Painel do blog — CF Contabilidade Brusque

## Como acessar

- **Endereço:** `https://SEU-SITE/admin/blog` (atalho direto para a lista de artigos)
  ou `https://SEU-SITE/admin`.
- O link **não aparece** no site público. Esconder o endereço não é a proteção:
  quem não tem permissão no GitHub não consegue salvar nada (veja "Segurança").

### Login (primeira vez em cada navegador)

1. Abra `/admin/blog` e clique em **Entrar com token de acesso** (*Sign In Using Access Token*).
2. Clique no link que o painel mostra para criar o token no GitHub, ou crie em
   GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**:
   - Repository access: **somente** `gui180405-jpg/CfContabilidadeBrusque-ver.1.0`
   - Permissions → Repository → **Contents: Read and write**
   - Expiração: 90 dias (renove quando vencer)
3. Cole o token no painel. O navegador fica conectado até você sair.

### Opcional: ativar o botão "Entrar com GitHub"

Mais simples para quem não quer lidar com token. Precisa ser feito uma vez:

1. GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App
   - Homepage URL: `https://cf-contabilidade-brusque-ver-1-0.vercel.app`
   - Authorization callback URL: `https://cf-contabilidade-brusque-ver-1-0.vercel.app/api/callback`
2. Copie o **Client ID** e gere um **Client secret**.
3. Vercel → projeto → Settings → Environment Variables:
   `OAUTH_CLIENT_ID` e `OAUTH_CLIENT_SECRET` (e `OAUTH_SCOPE=public_repo` se o repositório for público).
4. Faça um novo deploy.

Enquanto isso não for feito, o botão mostra "oauth_nao_configurado" — use o token.
O login só funciona no mesmo domínio configurado em `base_url` (`public/admin/config.yml`);
ao trocar de domínio, atualize `base_url`, `site_url`, `display_url` e a callback URL do OAuth App.

## O que dá para fazer

| Ação | Onde |
|---|---|
| Ver publicados / rascunhos | filtros **Publicados** e **Rascunhos** na lista; agrupar por **Status** ou **Ano** |
| Pesquisar pelo título | busca no topo do painel |
| Filtrar por jornada | filtros com o nome de cada jornada |
| Novo artigo | **Novo artigo** |
| Salvar sem publicar | Status = **Rascunho** → Salvar |
| Publicar | Status = **Publicado** → Salvar (aparece no site em 1–2 min) |
| Despublicar | volte o Status para **Rascunho** → Salvar |
| Agendar | Status = **Publicado** + **Data de publicação** futura |
| Excluir | abrir o artigo → menu ⋯ → Excluir (o painel pede confirmação) |
| Pré-visualizar | painel da direita do editor, com a tipografia do site |
| Ver no site | botão de pré-visualização/“ver no site” do artigo publicado |

O editor tem: títulos (seção, subseção, item), negrito, itálico, links, citação,
listas com marcadores e numeradas e **imagem no meio do texto** (botão “+” → Imagem; o campo
“Título” da imagem vira a legenda e o “Texto alternativo” descreve a foto).
O painel avisa quando há alterações não salvas.

### Campos de cada artigo

- **Título, Resumo, Conteúdo** — o essencial.
- **Status, Data de publicação, Autor, Jornada, Tipo, Tags, Destaque.**
- **Imagem de capa + descrição da imagem** — envie direto do computador; o painel converte
  para WebP (até 1600 px). Formatos: JPG, PNG, WebP; até 8 MB.
- **Endereço (slug)** — o final do link: `/blog/endereco-do-artigo`.
- **SEO e compartilhamento** (opcional) — título e descrição para o Google, WhatsApp e LinkedIn.
  Vazio = usa o título e o resumo.
- **Avançado:** tempo de leitura (vazio = automático), link externo, endereços antigos.

### Trocar o endereço de um artigo já publicado

Coloque o endereço antigo em **Endereços antigos**. Quem abrir o link antigo é levado ao novo.
(Se o endereço for o mesmo do nome do arquivo criado pelo painel, isso é feito sozinho.)

## Onde ficam os dados

- **Artigos:** `src/content/posts/*.md` no repositório do GitHub (um arquivo por artigo).
- **Imagens do blog:** `public/blog/`.
- Cada **Salvar** vira um *commit* no GitHub e a Vercel publica o site sozinha.
- **Cópia de segurança e recuperação:** o histórico do GitHub guarda todas as versões.
  Para recuperar um texto apagado ou alterado: GitHub → arquivo → *History* → abrir a versão → copiar.

## Como o site usa os artigos (técnico)

`scripts/vite-plugin-cf-blog.js` roda no build e:

- publica só artigos com Status **Publicado** e data de hoje ou anterior (horário de Brasília);
  **rascunhos e agendados não entram no JavaScript do site**;
- gera `/blog/<endereco>.html` com título, descrição, canonical e Open Graph de cada artigo;
- gera as páginas de redirecionamento dos endereços antigos;
- gera o `sitemap.xml` com os artigos publicados;
- aceita os campos antigos (`published` / `draft`) caso algum arquivo antigo seja restaurado.

## Segurança

- Só quem tem **permissão de escrita no repositório do GitHub** consegue criar, editar,
  publicar ou excluir artigos. Não existe outra forma de escrita no site.
- O token fica só no navegador de quem fez login; nada de chave secreta no código do site.
- Para tirar o acesso de alguém: remova a pessoa do repositório ou revogue o token dela no GitHub.

## Atualizar o Sveltia CMS

A versão do painel é fixa em `public/admin/index.html` (com `integrity`), para que uma versão nova
ou alterada no CDN não rode sem revisão. Para atualizar:

1. Escolha uma versão em https://www.npmjs.com/package/@sveltia/cms?activeTab=versions
   (prefira uma publicada há pelo menos duas semanas).
2. Gere o hash: `curl -sL https://unpkg.com/@sveltia/cms@VERSAO/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A`
3. Troque a versão no `src` e o valor de `integrity` (`sha384-` + hash) no `index.html`.
4. Abra `/admin` e confira se carrega. Se o painel ficar em branco, o hash não confere.

## Configurações externas pendentes

1. **Publicação agendada:** criar um *Deploy Hook* na Vercel e salvar a URL como segredo
   `VERCEL_DEPLOY_HOOK_URL` no GitHub (instruções em
   `.github/workflows/blog-publicacao-agendada.yml`). Sem isso, um artigo agendado só aparece
   no próximo build (qualquer salvamento no painel também dispara um build).
2. **Domínio:** quando `cfcontabilidadebrusque.com` estiver ativo, troque `site_url` e
   `display_url` em `public/admin/config.yml`. O endereço usado nas meta tags dos artigos
   fica em `vite.config.js` (`siteUrl`).
