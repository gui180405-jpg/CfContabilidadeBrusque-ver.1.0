/*
============================================================
BLOG POSTS — PREPARAÇÃO PARA DECAP CMS
============================================================

Este arquivo lê automaticamente todos os posts em Markdown dentro de:

src/content/posts/

Cada post precisa ter um bloco de dados no topo, chamado frontmatter:

---
title: "Título do post"
category: "Impostos"
type: "Artigo"
date: "2026-07-03"
readTime: "4 min de leitura"
excerpt: "Resumo curto do conteúdo."
image: ""
link: "#"
featured: true
published: true
draft: true
---

Quando configurarmos o Decap CMS, ele vai criar e editar esses arquivos
Markdown pelo painel /admin, sem você mexer direto no código.
============================================================
*/

const postModules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const blogCategories = [
  'Todos',
  'Notícias',
  'Impostos',
  'Simples Nacional',
  'Trabalhista',
  'Abertura de empresa',
  'Gestão financeira',
  'Regularização',
  'Obrigações mensais',
];

function normalizeValue(value = '') {
  const trimmed = value.trim();

  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(rawContent, filePath) {
  const match = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const fallbackSlug = filePath
    .split('/')
    .pop()
    .replace(/\.md$/, '');

  if (!match) {
    return {
      slug: fallbackSlug,
      title: fallbackSlug,
      category: 'Notícias',
      type: 'Artigo',
      date: 'Em breve',
      readTime: '3 min de leitura',
      excerpt: 'Conteúdo em preparação.',
      image: '',
      link: '#',
      featured: false,
      published: true,
      draft: true,
      content: rawContent.trim(),
    };
  }

  const [, frontmatter, body] = match;
  const data = {};

  frontmatter.split('\n').forEach((line) => {
    const cleanLine = line.trim();

    if (!cleanLine || cleanLine.startsWith('#')) return;

    const separatorIndex = cleanLine.indexOf(':');
    if (separatorIndex === -1) return;

    const key = cleanLine.slice(0, separatorIndex).trim();
    const value = cleanLine.slice(separatorIndex + 1);

    data[key] = normalizeValue(value);
  });

  return {
    slug: data.slug || fallbackSlug,
    title: data.title || fallbackSlug,
    category: data.category || 'Notícias',
    type: data.type || 'Artigo',
    date: data.date || 'Em breve',
    readTime: data.readTime || '3 min de leitura',
    excerpt: data.excerpt || 'Conteúdo em preparação.',
    image: data.image || '',
    link: data.link || '#',
    featured: Boolean(data.featured),
    published: data.published !== false,
    draft: Boolean(data.draft),
    content: body.trim(),
  };
}

function getDateValue(date) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return 0;
  }

  return parsed.getTime();
}

export const blogPosts = Object.entries(postModules)
  .map(([filePath, rawContent]) => parseFrontmatter(rawContent, filePath))
  .filter((post) => post.published)
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    return getDateValue(b.date) - getDateValue(a.date);
  });
