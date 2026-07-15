/*
============================================================
BLOG POSTS — SVELTIA CMS
============================================================
Posts em Markdown dentro de src/content/posts/.
O blog agora é organizado por jornadas, não por filtros soltos.
============================================================
*/

const postModules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const blogJourneys = [
  {
    name: 'Todos',
    slug: 'todos',
    description: 'Todos os conteúdos publicados no blog da CF.',
    aliases: [],
  },
  {
    name: 'Começando a empresa',
    slug: 'comecando-a-empresa',
    description: 'Abertura de CNPJ, primeiros passos, enquadramento e decisões iniciais.',
    aliases: ['Abertura de empresa', 'Empresa em abertura', 'Abrir CNPJ'],
  },
  {
    name: 'Rotina contábil',
    slug: 'rotina-contabil',
    description: 'Documentos, prazos, obrigações mensais e organização do dia a dia.',
    aliases: ['Obrigações mensais', 'Rotina fiscal', 'Contabilidade'],
  },
  {
    name: 'Impostos e enquadramento',
    slug: 'impostos-e-enquadramento',
    description: 'Simples Nacional, regime tributário, guias e carga de impostos.',
    aliases: ['Impostos', 'Simples Nacional', 'Tributário'],
  },
  {
    name: 'Trabalhista e equipe',
    slug: 'trabalhista-e-equipe',
    description: 'Folha, admissões, desligamentos e cuidados com colaboradores.',
    aliases: ['Trabalhista', 'Departamento pessoal', 'Folha de pagamento'],
  },
  {
    name: 'Gestão financeira',
    slug: 'gestao-financeira',
    description: 'Organização financeira, previsibilidade e separação de contas.',
    aliases: ['Financeiro'],
  },
  {
    name: 'Regularização e pendências',
    slug: 'regularizacao-e-pendencias',
    description: 'Atrasos, multas, documentos, CNPJ irregular e ajustes necessários.',
    aliases: ['Regularização', 'Pendências'],
  },
  {
    name: 'Guias por segmento',
    slug: 'guias-por-segmento',
    description: 'Conteúdos educativos para diferentes realidades de negócio.',
    aliases: ['Segmentos empresariais', 'Segmentos', 'Nichos empresariais'],
  },
  {
    name: 'Notícias e prazos',
    slug: 'noticias-e-prazos',
    description: 'Alertas, novidades e mudanças importantes para empresas.',
    aliases: ['Notícias', 'Prazos', 'Alerta', 'Alertas'],
  },
];

export const blogCategories = blogJourneys.map((journey) => journey.name);

export const adminBlogCategories = blogJourneys
  .filter((journey) => journey.name !== 'Todos')
  .map((journey) => journey.name);

export function normalizeComparable(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getJourneyBySlug(slug = '') {
  const normalizedSlug = normalizeComparable(slug).replace(/\s+/g, '-');

  return blogJourneys.find((journey) => journey.slug === normalizedSlug);
}

export function getJourneyForCategory(category = '') {
  if (!category) return 'Todos';

  const normalizedCategory = normalizeComparable(category);

  const journey = blogJourneys.find((item) => {
    if (item.name === 'Todos') return false;

    const names = [item.name, ...item.aliases];

    return names.some((name) => normalizeComparable(name) === normalizedCategory);
  });

  return journey?.name || category;
}

export function postMatchesJourney(post, selectedJourney) {
  if (!selectedJourney || selectedJourney === 'Todos') return true;

  const journey = blogJourneys.find((item) => item.name === selectedJourney);

  if (!journey) {
    return post.category === selectedJourney;
  }

  const acceptedNames = [journey.name, ...journey.aliases].map(normalizeComparable);
  const postCategory = normalizeComparable(post.category);

  return acceptedNames.includes(postCategory);
}

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
      category: 'Notícias e prazos',
      journey: 'Notícias e prazos',
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

  const category = data.category || 'Notícias e prazos';

  return {
    slug: data.slug || fallbackSlug,
    title: data.title || fallbackSlug,
    category,
    journey: getJourneyForCategory(category),
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
