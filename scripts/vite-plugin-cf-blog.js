/*
============================================================
VITE PLUGIN — BLOG DA CF (roda só no build / dev, nunca no navegador)
============================================================
Fonte da verdade: src/content/posts/*.md (gravados pelo painel /admin
direto no GitHub). Este plugin:

1. lê e valida os artigos (YAML de verdade, via js-yaml);
2. entrega ao site SÓ o que é público — rascunhos e artigos agendados
   para o futuro NÃO entram no JavaScript do site;
3. gera, no build, uma página HTML por artigo com título, descrição,
   canonical e Open Graph próprios (compartilhamento no WhatsApp/LinkedIn);
4. gera páginas de redirecionamento para endereços antigos (slug trocado);
5. regenera o sitemap.xml incluindo os artigos publicados;
6. gera um HTML por página do site (/sobre, /servicos…) com título,
   descrição e canonical próprios (src/content/pageMeta.js) e o 404.html.

Módulo virtual consumido pelo site:  import data from 'virtual:cf-blog'
============================================================
*/
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { notFoundMeta, pageMeta } from '../src/content/pageMeta.js';

const VIRTUAL_ID = 'virtual:cf-blog';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

const DEFAULT_AUTHOR = 'Equipe CF Contabilidade';
const TIMEZONE = 'America/Sao_Paulo';

const STATIC_PAGES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/servicos', changefreq: 'monthly', priority: '0.9' },
  { loc: '/sobre', changefreq: 'monthly', priority: '0.8' },
  { loc: '/diagnostico', changefreq: 'monthly', priority: '0.9' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.7' },
  { loc: '/contato', changefreq: 'monthly', priority: '0.8' },
];

export function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

/** Data de hoje (AAAA-MM-DD) no fuso de Brusque. */
export function todayInBrazil(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(now);
}

function asText(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function asList(value) {
  if (Array.isArray(value)) return value.map(asText).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
}

function estimateReadTime(body) {
  const words = body.replace(/[#>*_`[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de leitura`;
}

/**
 * Status editorial. Compatível com os campos antigos (published/draft):
 * - status: "draft" | "published"   (novo)
 * - draft: true  ou  published: false (antigo) → rascunho
 */
function resolveStatus(data) {
  const status = asText(data.status).toLowerCase();
  if (status === 'draft' || status === 'rascunho') return 'draft';
  if (status === 'published' || status === 'publicado') return 'published';
  if (data.draft === true || data.published === false) return 'draft';
  return 'published';
}

// Capa: só caminho do próprio site (/blog/...) ou https. Qualquer outra coisa é ignorada.
function safeImage(value) {
  return /^\/(?!\/)/.test(value) || /^https:\/\//i.test(value) ? value : '';
}

// Link externo: só http(s). Vazio ou "#" = abre a página do artigo no site.
function safeLink(value) {
  return /^https?:\/\//i.test(value) ? value : '#';
}

export function parsePostFile(raw, fileName) {
  const id = fileName.replace(/\.md$/, '');
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);

  let data = {};
  let body = raw;
  const warnings = [];

  if (match) {
    try {
      data = yaml.load(match[1], { schema: yaml.CORE_SCHEMA }) || {};
    } catch (error) {
      warnings.push(`YAML inválido: ${error.message}`);
      data = {};
    }
    body = match[2];
  } else {
    warnings.push('sem cabeçalho (frontmatter)');
  }

  body = body.trim();
  const title = asText(data.title) || id;
  const slug = slugify(asText(data.slug) || title) || slugify(id);
  const date = asText(data.date).slice(0, 10);
  const seo = data.seo && typeof data.seo === 'object' ? data.seo : {};

  // Slug derivado do nome do arquivo (o painel cria "AAAA-MM-DD-slug.md").
  // Se o slug for trocado depois, o endereço antigo continua funcionando.
  const fileSlug = slugify(id.replace(/^\d{4}-\d{2}-\d{2}-/, ''));
  const redirectFrom = [...new Set([...asList(data.redirect_from).map(slugify), fileSlug])].filter(
    (old) => old && old !== slug,
  );

  return {
    post: {
      id,
      slug,
      title,
      category: asText(data.category) || 'Notícias e prazos',
      type: asText(data.type) || 'Artigo',
      date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '',
      updated: asText(data.updated).slice(0, 10),
      author: asText(data.author) || DEFAULT_AUTHOR,
      tags: asList(data.tags),
      readTime: asText(data.readTime) || estimateReadTime(body),
      excerpt: asText(data.excerpt),
      image: safeImage(asText(data.image)),
      imageAlt: asText(data.image_alt),
      link: safeLink(asText(data.link)),
      featured: data.featured === true,
      status: resolveStatus(data),
      seoTitle: asText(seo.title),
      seoDescription: asText(seo.description),
      content: body,
    },
    redirectFrom,
    warnings,
  };
}

export function loadBlog(postsDir, { today = todayInBrazil(), log = () => {} } = {}) {
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter((file) => file.endsWith('.md')) : [];
  const all = [];
  const redirects = {};

  files.sort().forEach((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { post, redirectFrom, warnings } = parsePostFile(raw, file);
    warnings.forEach((warning) => log(`[blog] ${file}: ${warning}`));
    all.push({ ...post, redirectFrom });
  });

  // Slugs duplicados: o mais antigo (por arquivo) fica com o endereço; os outros ganham sufixo.
  const used = new Set();
  all.forEach((post) => {
    let candidate = post.slug;
    let n = 2;
    while (used.has(candidate)) candidate = `${post.slug}-${n++}`;
    if (candidate !== post.slug) log(`[blog] slug duplicado "${post.slug}" em ${post.id} → "${candidate}"`);
    post.slug = candidate;
    used.add(candidate);
  });

  const isLive = (post) => post.status === 'published' && (!post.date || post.date <= today);
  const live = all.filter(isLive);

  live.forEach((post) => {
    post.redirectFrom.forEach((old) => {
      if (!used.has(old)) redirects[old] = post.slug;
    });
  });

  const publicPosts = live
    .map(({ redirectFrom, status, id, ...rest }) => rest) // eslint-disable-line no-unused-vars
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.date || '').localeCompare(a.date || '');
    });

  const summary = {
    total: all.length,
    published: live.length,
    drafts: all.filter((post) => post.status === 'draft').length,
    scheduled: all.filter((post) => post.status === 'published' && post.date > today).length,
  };

  return { posts: publicPosts, redirects, summary, today };
}

/* ---------------- HTML por artigo (meta tags no build) ---------------- */


function escapeHtml(value = '') {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function absolute(siteUrl, url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

function replaceMeta(html, { title, description, canonical, image, imageAlt, type = 'article', robots }) {
  let out = html;
  const set = (regex, replacement) => {
    out = regex.test(out) ? out.replace(regex, replacement) : out.replace('</head>', `    ${replacement}\n  </head>`);
  };

  set(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  set(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  set(/<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
  set(/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  set(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  set(/<meta\s+property="og:type"[\s\S]*?\/>/, `<meta property="og:type" content="${type}" />`);
  set(/<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${escapeHtml(canonical)}" />`);

  if (image) {
    out = out
      .replace(/\s*<meta\s+property="og:image:width"[\s\S]*?\/>/, '')
      .replace(/\s*<meta\s+property="og:image:height"[\s\S]*?\/>/, '');
    set(/<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${escapeHtml(image)}" />`);
    set(/<meta\s+property="og:image:alt"[\s\S]*?\/>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt || title)}" />`);
  }
  if (robots) set(/<meta\s+name="robots"[\s\S]*?\/>/, `<meta name="robots" content="${robots}" />`);
  return out;
}

export function postMeta(post, siteUrl) {
  const title = post.seoTitle || `${post.title} | CF Contabilidade Brusque`;
  const description = (post.seoDescription || post.excerpt || '').slice(0, 300);
  return {
    title,
    description,
    canonical: `${siteUrl}/blog/${post.slug}`,
    image: post.image ? absolute(siteUrl, post.image) : '',
    imageAlt: post.imageAlt || post.title,
  };
}

function redirectHtml(target, siteUrl) {
  const url = `/blog/${target}`;
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecionando…</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${siteUrl}${url}" />
    <meta http-equiv="refresh" content="0; url=${url}" />
  </head>
  <body><p>Este artigo mudou de endereço: <a href="${url}">${siteUrl}${url}</a></p></body>
</html>
`;
}

function sitemapXml(posts, siteUrl, today) {
  const urls = [
    ...STATIC_PAGES.map((page) => ({ ...page, lastmod: today })),
    ...posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: post.updated || post.date || today,
    })),
  ];
  const body = urls
    .map(
      (url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/* ---------------- Plugin ---------------- */

export default function cfBlog({ postsDir, siteUrl }) {
  let root = process.cwd();
  let dir = postsDir;
  let data;

  const load = (logger) => {
    data = loadBlog(dir, { log: (msg) => (logger ? logger.warn(msg) : console.warn(msg)) });
    return data;
  };

  return {
    name: 'cf-blog',

    configResolved(config) {
      root = config.root;
      dir = path.resolve(root, postsDir);
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_ID) return null;
      const { posts, redirects, today } = load();
      fs.readdirSync(dir).forEach((file) => this.addWatchFile(path.join(dir, file)));
      return `export const posts = ${JSON.stringify(posts)};\nexport const redirects = ${JSON.stringify(
        redirects,
      )};\nexport const builtAt = ${JSON.stringify(today)};\n`;
    },

    // Em desenvolvimento: salvar/criar/apagar um .md recarrega o blog.
    configureServer(server) {
      server.watcher.add(dir);
      const refresh = (file) => {
        if (!file.startsWith(dir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('change', refresh);
      server.watcher.on('unlink', refresh);
    },

    // Depois que o Vite grava o dist/: usa o index.html final (com os assets
    // corretos) como modelo das páginas de cada artigo.
    writeBundle(options) {
      const outDir = options.dir || path.resolve(root, 'dist');
      const { posts, redirects, summary, today } = data || load();
      const templatePath = path.join(outDir, 'index.html');
      const write = (rel, content) => {
        const target = path.join(outDir, rel);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, content);
      };

      if (fs.existsSync(templatePath)) {
        let template = fs.readFileSync(templatePath, 'utf8');

        const assetsDir = path.join(outDir, 'assets');
        // Recursos de animação (chunk "features"): baixados em paralelo com o app,
        // em vez de só depois dele — o topo da página aparece mais cedo.
        const featuresChunk = fs.existsSync(assetsDir)
          ? fs.readdirSync(assetsDir).find((file) => /^features-.*\.js$/.test(file))
          : null;
        if (featuresChunk && !template.includes(featuresChunk)) {
          template = template.replace('</head>', `  <link rel="modulepreload" crossorigin href="/assets/${featuresChunk}" />\n  </head>`);
        }

        // Páginas fixas: cada uma com o próprio título/descrição/canonical.
        Object.entries(pageMeta).forEach(([route, meta]) => {
          const html = replaceMeta(template, {
            ...meta,
            canonical: `${siteUrl}${route === '/' ? '/' : route}`,
            type: 'website',
          });
          write(route === '/' ? 'index.html' : `${route.slice(1)}.html`, html);
        });

        // 404 de verdade (status 404 na Vercel) com o visual do site e noindex.
        write(
          '404.html',
          replaceMeta(template, { ...notFoundMeta, canonical: `${siteUrl}/`, type: 'website', robots: 'noindex' })
            .replace(/\s*<link\s+rel="canonical"[\s\S]*?\/>/, '')
            .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, ''),
        );

        posts
          .filter((post) => !/^https?:\/\//i.test(post.link))
          .forEach((post) => {
            const html = replaceMeta(template, postMeta(post, siteUrl));
            // .html → servido em /blog/slug pela Vercel (cleanUrls); pasta/index.html → servidores locais
            write(`blog/${post.slug}.html`, html);
            write(`blog/${post.slug}/index.html`, html);
          });
      }

      Object.entries(redirects).forEach(([from, to]) => {
        write(`blog/${from}.html`, redirectHtml(to, siteUrl));
        write(`blog/${from}/index.html`, redirectHtml(to, siteUrl));
      });

      // substitui o public/sitemap.xml estático pelo gerado (com os artigos)
      write('sitemap.xml', sitemapXml(posts, siteUrl, today));

      this.info?.(
        `[blog] ${summary.published} publicado(s) · ${summary.drafts} rascunho(s) · ${summary.scheduled} agendado(s) · ${
          Object.keys(redirects).length
        } redirecionamento(s)`,
      );
    },
  };
}
