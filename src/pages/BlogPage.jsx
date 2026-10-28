import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Newspaper } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import { Eyebrow, MaskText, RevealLine } from '../components/motion/primitives';
import { EASE, VIEWPORT, stagger, variants } from '../components/motion/motionConfig';
import {
  blogJourneys,
  blogPosts,
  getJourneyBySlug,
  getJourneyForCategory,
  postMatchesJourney,
} from '../content/blogPosts';

/*
============================================================
PÁGINA: BLOG / NOTÍCIAS
============================================================
Blog organizado por jornada:
- mais educativo;
- menos poluído;
- permite conteúdos por segmento sem nichar a CF.
============================================================
*/

const visibleJourneyCards = blogJourneys.filter((journey) => journey.name !== 'Todos');

function getInitialJourney() {
  const params = new URLSearchParams(window.location.search);
  const journeyParam = params.get('jornada');

  if (!journeyParam) return 'Todos';

  return getJourneyBySlug(journeyParam)?.name || getJourneyForCategory(journeyParam);
}

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

function BlogImageFallback({ category }) {
  const journey = getJourneyForCategory(category);

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-cf-navy p-3 sm:min-h-[220px] sm:p-7">
      <Newspaper className="h-5 w-5 text-cf-on-dark sm:h-6 sm:w-6" strokeWidth={1.5} />
      <p className="cf-label hidden text-cf-on-dark sm:block">{journey}</p>
    </div>
  );
}

function PostMeta({ post, light = false }) {
  const textColor = light ? 'text-cf-on-dark' : 'text-cf-muted';

  return (
    <div className={`mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${textColor}`}>
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

function PostButton({ post }) {
  if (!isAvailable(post)) {
    return <span className="cf-label mt-7 inline-flex text-cf-muted">Em breve</span>;
  }

  return (
    <a
      href={getPostUrl(post)}
      target={isExternalLink(post.link) ? '_blank' : undefined}
      rel={isExternalLink(post.link) ? 'noopener noreferrer' : undefined}
      aria-label={`Ler artigo completo: ${post.title}`}
      className="cf-link mt-7 self-start text-cf-blue hover:text-cf-blue-dark"
    >
      Ler artigo completo
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function PostImage({ post, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-cf-soft ${className}`}>
      {post.image ? (
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-cf group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0">
          <BlogImageFallback category={post.category} />
        </div>
      )}
    </div>
  );
}

function FeaturedPost({ post }) {
  if (!post) return null;

  const journey = getJourneyForCategory(post.category);

  return (
    <m.article
      initial="hidden"
      animate="visible"
      variants={stagger(0.1)}
      className="group grid gap-10 border-b border-cf-border pb-16 lg:grid-cols-12 lg:items-center lg:gap-10 md:pb-24"
    >
      <m.div variants={variants.image} className="lg:col-span-7">
        <PostImage post={post} className="aspect-[16/10] w-full" />
      </m.div>

      <div className="lg:col-span-5">
        <m.p variants={variants.fade} className="cf-label flex flex-wrap items-center gap-3 text-cf-blue">
          <span>Conteúdo em destaque</span>
          <span aria-hidden="true" className="h-px w-6 bg-cf-blue" />
          <span className="text-cf-muted">{journey}</span>
          {post.type && <span className="text-cf-muted">• {post.type}</span>}
        </m.p>

        <m.h2 variants={variants.up} className="mt-6 text-3xl font-black leading-[1.08] tracking-[-0.035em] text-cf-navy md:text-[2.6rem]">
          {post.title}
        </m.h2>

        <m.p variants={variants.up} className="mt-5 text-lg leading-8 text-cf-muted">
          {post.excerpt}
        </m.p>

        <m.div variants={variants.fade}>
          <PostMeta post={post} />
        </m.div>

        <m.div variants={variants.cta} className="mt-8">
          {isAvailable(post) ? (
            <PrimaryButton
              href={getPostUrl(post)}
              external={isExternalLink(post.link)}
              aria-label={`Ler artigo em destaque: ${post.title}`}
            >
              Ler artigo em destaque
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          ) : (
            <span className="cf-label text-cf-muted">Conteúdo em breve</span>
          )}
        </m.div>
      </div>
    </m.article>
  );
}

function JourneyFilters({ selectedJourney, onSelectJourney }) {
  return (
    <div className="mt-14 md:mt-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Conteúdos por jornada</Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-3xl font-black leading-[1.06] tracking-[-0.035em] text-cf-navy md:text-4xl"
            lines={['Encontre conteúdos pelo momento da sua empresa.']}
          />
        </div>

        <button
          type="button"
          onClick={() => onSelectJourney('Todos')}
          className={`cf-link shrink-0 self-start md:self-auto ${selectedJourney === 'Todos' ? 'text-cf-navy' : 'text-cf-blue hover:text-cf-blue-dark'}`}
        >
          Ver todos
        </button>
      </div>

      {/* Mobile: abas roláveis na horizontal + descrição só da jornada escolhida */}
      <div className="mt-8 sm:hidden">
        <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-6 border-b border-cf-border">
            {visibleJourneyCards.map((journey) => {
              const active = selectedJourney === journey.name;

              return (
                <button
                  key={journey.name}
                  type="button"
                  onClick={() => onSelectJourney(journey.name)}
                  aria-pressed={active}
                  className={`relative whitespace-nowrap py-3.5 text-sm font-bold transition-colors ${active ? 'text-cf-navy' : 'text-cf-muted'}`}
                >
                  {journey.name}
                  {active && (
                    <m.span
                      layoutId="cf-journey-tab"
                      transition={{ duration: 0.4, ease: EASE }}
                      aria-hidden="true"
                      className="absolute -bottom-px left-0 right-0 h-[2px] bg-cf-blue"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-cf-muted">
          {blogJourneys.find((item) => item.name === selectedJourney)?.description}
        </p>
      </div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={stagger(0.04)}
        className="mt-10 hidden border-t border-cf-border sm:grid sm:grid-cols-2 lg:grid-cols-4"
      >
        {visibleJourneyCards.map((journey, index) => {
          const active = selectedJourney === journey.name;

          return (
            <m.button
              key={journey.name}
              variants={variants.up}
              type="button"
              onClick={() => onSelectJourney(journey.name)}
              aria-pressed={active}
              className={`group relative border-b border-cf-border p-5 text-left transition-colors duration-300 sm:[&:nth-child(2n)]:border-l lg:[&:not(:nth-child(4n+1))]:border-l ${
                active ? 'bg-white' : 'hover:bg-white/60'
              }`}
            >
              {active && (
                <m.span
                  layoutId="cf-journey-indicator"
                  transition={{ duration: 0.45, ease: EASE }}
                  aria-hidden="true"
                  className="absolute -top-px left-0 right-0 h-[2px] bg-cf-blue"
                />
              )}
              <span className={`cf-numeral block text-sm ${active ? 'text-cf-blue' : 'text-cf-muted'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 font-extrabold text-cf-navy">{journey.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-cf-muted">{journey.description}</p>
            </m.button>
          );
        })}
      </m.div>
    </div>
  );
}

function BlogCard({ post, index }) {
  const journey = getJourneyForCategory(post.category);

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: index * 0.05 } }}
      className="group grid h-full grid-cols-[5.5rem_1fr] gap-4 border-b border-cf-border pb-7 sm:flex sm:flex-col sm:gap-0 sm:border-b-0 sm:pb-0"
    >
      {/* mobile: miniatura quadrada à esquerda; sm+: imagem larga no topo */}
      <PostImage post={post} className="aspect-square w-full sm:aspect-[16/10]" />

      <div className="flex min-w-0 flex-1 flex-col sm:border-b sm:border-cf-border sm:pb-8 sm:pt-6">
        <p className="cf-label flex flex-wrap gap-2 text-cf-blue">
          {journey}
          {post.type && <span className="text-cf-muted">• {post.type}</span>}
        </p>

        <h3 className="mt-2 text-lg font-black leading-snug tracking-[-0.02em] text-cf-navy sm:mt-4 sm:text-xl md:text-2xl">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-cf-muted sm:mt-3 sm:line-clamp-none sm:text-base sm:leading-7">
          {post.excerpt}
        </p>

        <PostMeta post={post} />

        <PostButton post={post} />
      </div>
    </m.article>
  );
}

export default function BlogPage() {
  const [selectedJourney, setSelectedJourney] = useState(getInitialJourney);

  function handleSelectJourney(journeyName) {
    setSelectedJourney(journeyName);

    const journey = blogJourneys.find((item) => item.name === journeyName);
    const nextUrl = !journey || journey.name === 'Todos' ? '/blog' : `/blog?jornada=${journey.slug}`;

    window.history.replaceState({}, '', nextUrl);
  }

  const visiblePosts = useMemo(() => {
    return blogPosts.filter((post) => post.published !== false && !post.draft);
  }, []);

  const featuredPost = useMemo(() => {
    return visiblePosts.find((post) => post.featured) || visiblePosts[0];
  }, [visiblePosts]);

  const filteredPosts = useMemo(() => {
    const postsWithoutFeatured = visiblePosts.filter((post) => post.slug !== featuredPost?.slug);

    return postsWithoutFeatured.filter((post) => postMatchesJourney(post, selectedJourney));
  }, [featuredPost, selectedJourney, visiblePosts]);

  return (
    <div className="min-h-screen bg-cf-background">
      <PageHero
        tone="dark"
        eyebrow="Blog e jornadas empresariais"
        title="Conteúdos organizados pelo momento da sua empresa."
        description="Orientações sobre abertura, impostos, rotina contábil, trabalhista, gestão, regularização e segmentos empresariais — sem transformar a CF em uma contabilidade de um nicho só."
        points={['Artigos práticos', 'Guias por momento', 'Segmentos como conteúdo educativo']}
      />

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <FeaturedPost post={featuredPost} />

          <JourneyFilters
            selectedJourney={selectedJourney}
            onSelectJourney={handleSelectJourney}
          />

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:mt-12 sm:gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogCard key={`${selectedJourney}-${post.slug}`} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full border-y border-cf-border py-14 text-center">
                <p className="text-lg font-bold text-cf-navy">
                  Ainda não existem conteúdos nessa jornada.
                </p>
                <p className="mt-2 text-cf-muted">
                  Pelo painel /admin, você pode criar posts e escolher essa jornada.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-cf-navy px-5 py-16 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Eyebrow tone="light">Precisa de orientação?</Eyebrow>
          <MaskText
            as="h2"
            className="mt-7 max-w-4xl text-3xl font-black leading-[1.06] tracking-[-0.035em] text-white md:text-5xl"
            lines={['Leu algum conteúdo e percebeu que sua empresa precisa de mais organização?']}
          />
          <RevealLine className="mt-10 bg-white/20" />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="max-w-2xl text-lg leading-8 text-cf-on-dark lg:col-span-6">
              A CF pode analisar sua situação contábil e indicar os próximos passos com clareza.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
              <PrimaryButton variant="light" href="/diagnostico">
                Analisar minha situação contábil
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <PrimaryButton
                variant="outline-light"
                href="/contato"
              >
                Falar com a CF
                <ArrowUpRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
