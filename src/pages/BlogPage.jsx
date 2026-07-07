import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  Newspaper,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import { blogCategories, blogPosts } from '../content/blogPosts';

/*
============================================================
PÁGINA: BLOG / NOTÍCIAS — CF CONTABILIDADE
============================================================
Lista os posts criados em Markdown pelo painel /admin.

Regra:
- Se o campo link for externo, abre fora.
- Se o campo link estiver vazio ou "#", abre a página interna /blog/:slug.
============================================================
*/

function isExternalLink(link) {
  return typeof link === 'string' && /^https?:\/\//i.test(link);
}

function isAvailable(post) {
  return Boolean(post) && !post.draft;
}

function getPostUrl(post) {
  if (isExternalLink(post.link)) {
    return post.link;
  }

  return `/blog/${encodeURIComponent(post.slug)}`;
}

function formatPostDate(date) {
  if (!date || date === 'Em breve') return date || 'Em breve';

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('pt-BR');
}

function navigateToPost(event, post, navigate) {
  if (isExternalLink(post.link)) return;

  event.preventDefault();
  navigate(`/blog/${post.slug}`);
}

function BlogImageFallback({ category }) {
  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-900 via-sky-950 to-sky-700 p-8">
      <div className="absolute inset-0 cf-subtle-grid opacity-10" />
      <div className="relative text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/20 bg-white/10 text-sky-200 shadow-2xl shadow-black/20 backdrop-blur">
          <Newspaper className="h-8 w-8" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-200">
          {category}
        </p>
      </div>
    </div>
  );
}

function PostMeta({ post, light = false }) {
  const textColor = light ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${textColor}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4" />
        {formatPostDate(post.date)}
      </span>

      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-4 w-4" />
        {post.readTime}
      </span>
    </div>
  );
}

function PostButton({ post, navigate }) {
  if (!isAvailable(post)) {
    return (
      <span className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500">
        Em breve
      </span>
    );
  }

  return (
    <a
      href={getPostUrl(post)}
      target={isExternalLink(post.link) ? '_blank' : undefined}
      rel={isExternalLink(post.link) ? 'noopener noreferrer' : undefined}
      onClick={(event) => navigateToPost(event, post, navigate)}
      aria-label={`Ler artigo completo: ${post.title}`}
      className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-800 to-sky-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-sky-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-sky-900/25"
    >
      Ler artigo completo
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );
}

function FeaturedPost({ post, navigate }) {
  if (!post) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative -mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/20 md:-mt-14"
    >
      <div className="absolute inset-0">
        {post.image ? (
          <img
            src={post.image}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-950 via-sky-950 to-sky-800" />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.88)_45%,rgba(8,47,73,0.72)_100%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.06]" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid gap-8 p-7 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/8 px-4 py-2 text-sm font-bold text-sky-200 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Destaque
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-400/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-200 ring-1 ring-sky-300/20">
              {post.category}
            </span>
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-200 ring-1 ring-white/10">
              {post.type}
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            {post.title}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            {post.excerpt}
          </p>

          <PostMeta post={post} light />

          <div className="mt-7">
            {isAvailable(post) ? (
              <a
                href={getPostUrl(post)}
                target={isExternalLink(post.link) ? '_blank' : undefined}
                rel={isExternalLink(post.link) ? 'noopener noreferrer' : undefined}
                onClick={(event) => navigateToPost(event, post, navigate)}
                aria-label={`Ler artigo em destaque: ${post.title}`}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50 md:text-base"
              >
                Ler artigo em destaque
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-bold text-white/75 backdrop-blur md:text-base">
                Conteúdo em breve
              </span>
            )}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-[2rem] bg-sky-300/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 p-3 backdrop-blur">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="h-[340px] w-full rounded-[1.25rem] object-cover"
              />
            ) : (
              <BlogImageFallback category={post.category} />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function BlogCard({ post, index, navigate }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="cf-depth-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/86 shadow-xl shadow-slate-900/8 backdrop-blur transition duration-300 hover:border-sky-200"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <BlogImageFallback category={post.category} />
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-sky-800 shadow-lg backdrop-blur">
            {post.category}
          </span>
          <span className="rounded-full bg-slate-950/78 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur">
            {post.type}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-snug text-slate-950">
          {post.title}
        </h3>

        <p className="mt-3 flex-1 leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <PostMeta post={post} />

        <PostButton post={post} navigate={navigate} />
      </div>
    </motion.article>
  );
}

export default function BlogPage({ navigate, onStartQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const visiblePosts = useMemo(() => {
    return blogPosts.filter((post) => post.published !== false && !post.draft);
  }, []);

  const featuredPost = useMemo(() => {
    return visiblePosts.find((post) => post.featured) || visiblePosts[0];
  }, [visiblePosts]);

  const filteredPosts = useMemo(() => {
    const postsWithoutFeatured = visiblePosts.filter((post) => post.slug !== featuredPost?.slug);

    if (selectedCategory === 'Todos') {
      return postsWithoutFeatured;
    }

    return postsWithoutFeatured.filter((post) => post.category === selectedCategory);
  }, [featuredPost, selectedCategory, visiblePosts]);

  return (
    <main className="min-h-screen bg-[#eef1f4]">
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-28 pt-32 md:px-8 md:pb-32 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(56,189,248,0.16),transparent_34%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.06]" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef1f4] via-[#eef1f4]/75 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/8 px-4 py-2 text-sm font-bold text-sky-200 backdrop-blur">
              <Newspaper className="h-4 w-4" />
              Blog e notícias
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
              Conteúdos para empresas que querem decidir com mais clareza.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Orientações sobre contabilidade, impostos, abertura de empresa, rotina fiscal,
              trabalhista e gestão para negócios que buscam mais organização.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 backdrop-blur">
                <FileText className="h-4 w-4 text-sky-300" />
                Artigos
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 backdrop-blur">
                <Newspaper className="h-4 w-4 text-sky-300" />
                Notícias
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 backdrop-blur">
                <Tag className="h-4 w-4 text-sky-300" />
                Alertas fiscais
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(15,23,42,0.05),transparent_32%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />

        <div className="relative mx-auto max-w-7xl">
          <FeaturedPost post={featuredPost} navigate={navigate} />

          <div className="mt-14 rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-xl shadow-slate-900/8 backdrop-blur">
            <div className="mb-4 flex items-center gap-2 px-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
              <Search className="h-4 w-4" />
              Filtrar por assunto
            </div>

            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition duration-300 ${
                      active
                        ? 'bg-sky-800 text-white shadow-lg shadow-sky-900/18'
                        : 'bg-white/80 text-slate-700 hover:bg-sky-50 hover:text-sky-800'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} navigate={navigate} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-white/70 bg-white/75 p-8 text-center shadow-xl shadow-slate-900/8 backdrop-blur">
                <p className="text-lg font-bold text-slate-900">
                  Ainda não existem conteúdos nessa categoria.
                </p>
                <p className="mt-2 text-slate-600">
                  Depois, pelo painel /admin, você poderá criar posts para cada assunto.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 shadow-2xl shadow-slate-950/20 md:p-10">
          <div className="relative">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/14 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
                  Precisa de orientação?
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                  Leu algum conteúdo e percebeu que sua empresa precisa de mais organização?
                </h2>

                <p className="mt-4 max-w-2xl text-slate-300">
                  A CF pode analisar sua situação contábil e indicar os próximos passos com clareza.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <PrimaryButton onClick={onStartQuiz}>
                  Analisar minha situação contábil
                  <ArrowRight className="ml-2 h-5 w-5" />
                </PrimaryButton>

                <a
                  href="/contato"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate('/contato');
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:bg-white/12 md:text-base"
                >
                  Falar com a CF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
