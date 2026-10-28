# CF Contabilidade Brusque — Site Institucional

React 18 + Vite 6 + Tailwind 3, publicado na Vercel. Blog com painel Sveltia CMS
(artigos em Markdown no próprio repositório do GitHub).

## Páginas

```txt
/             Página inicial
/servicos     Serviços contábeis
/sobre        Sobre a CF
/diagnostico  Diagnóstico (4 perguntas → WhatsApp)
/blog         Blog
/blog/<slug>  Artigo
/contato      Contato e localização
/admin/blog   Painel do blog (ver GUIA-PAINEL-BLOG.md)
```

Endereços que não existem recebem uma página 404 de verdade (status 404, `noindex`).

## Executar no computador

Requisitos: Node.js 20 ou mais recente (a Vercel usa a versão de `engines` do package.json).

```bash
npm ci          # instala exatamente as versões do package-lock.json
npm run dev     # http://localhost:5173
```

No Windows também dá para usar `rodar-site.bat` e `testar-build.bat`.

## Conferir antes de publicar

```bash
npm run lint    # erros de código
npm run build   # gera dist/ — precisa terminar com "built in …"
npm run check   # os dois acima em sequência
npm audit       # avisos de segurança das dependências
```

Para ver o build final: `npm run preview` (http://localhost:4173).
Obs.: o `preview` do Vite não aplica o `vercel.json` (cabeçalhos de segurança, 404, URLs limpas);
isso só vale na Vercel.

## Publicar na Vercel

Configuração do projeto:

```txt
Framework Preset:  Vite
Install Command:   npm ci
Build Command:     npm run build
Output Directory:  dist
```

Cada commit na branch `main` gera um deploy. Depois de publicar, confira em uma aba anônima:
a Home, um artigo do blog, um endereço inexistente (deve mostrar a página 404) e o `/admin/blog`.

Variáveis de ambiente (Settings → Environment Variables) — **todas opcionais**:

| Variável | Para quê |
|---|---|
| `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` | botão "Entrar com GitHub" do painel (ver GUIA-PAINEL-BLOG.md) |
| `OAUTH_SCOPE` | `public_repo` se o repositório for público (permissão menor) |

O segredo `VERCEL_DEPLOY_HOOK_URL` fica no **GitHub** (não na Vercel) e serve para a publicação agendada.

## Onde editar

| O quê | Arquivo |
|---|---|
| Telefone, WhatsApp, e-mail, endereço, fotos, FAQ | `src/content/siteContent.js` |
| Título e descrição de cada página no Google | `src/content/pageMeta.js` |
| Dados da empresa para buscadores (JSON-LD) | `index.html` |
| Artigos do blog | painel `/admin/blog` (ou `src/content/posts/*.md`) |
| Cores e fontes | `src/index.css` e `tailwind.config.js` |
| Cabeçalhos de segurança, URLs, cache | `vercel.json` |

Fotos: originais em `public/fotos/`; versões otimizadas (WebP em vários tamanhos) em
`public/fotos/otimizadas/`, geradas por `python scripts/otimizar_fotos.py`.

## Segurança

Resumo em `SECURITY_NOTES.md`.
