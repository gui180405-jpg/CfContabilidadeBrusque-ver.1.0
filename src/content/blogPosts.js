/*
============================================================
BLOG POSTS — SVELTIA CMS
============================================================
Posts em Markdown dentro de src/content/posts/.
O blog agora é organizado por jornadas, não por filtros soltos.
============================================================
*/

// Artigos já filtrados no build (scripts/vite-plugin-cf-blog.js):
// só entram publicados com data de hoje ou anterior. Rascunhos e
// agendados não chegam ao navegador.
import { posts as publicPosts, redirects as slugRedirects } from 'virtual:cf-blog';

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

export const blogPosts = publicPosts.map((post) => ({
  ...post,
  journey: getJourneyForCategory(post.category),
  // compatibilidade com os componentes do blog
  published: true,
  draft: false,
}));

/** Endereço novo de um artigo cujo slug foi trocado (ou undefined). */
export function findRedirect(slug = '') {
  return slugRedirects[slug];
}
