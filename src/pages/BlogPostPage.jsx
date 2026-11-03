import { m } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink } from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import { Eyebrow, MaskText, RevealLine } from '../components/motion/primitives';
import { variants } from '../components/motion/motionConfig';
import { useEffect } from 'react';
import { blogPosts, findRedirect, getJourneyForCategory } from '../content/blogPosts';
import ArticleContent from '../components/blog/ArticleContent';
import useDocumentMeta from '../components/blog/useDocumentMeta';
import { SITE_URL, notFoundMeta } from '../content/pageMeta';

function formatPostDate(date) {
  if (!date || date === 'Em breve') return date || 'Em breve';

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('pt-BR');
}

export default function BlogPostPage({ navigate }) {
  const slug = decodeURIComponent((window.location.pathname.split('/blog/')[1] || '').replace(/\/$/, ''));
  const post = blogPosts.find((item) => item.slug === slug);
  const journey = post ? getJourneyForCategory(post.category) : '';
  const redirectTo = post ? null : findRedirect(slug);

  // Endereço antigo (slug trocado no painel): troca a URL sem criar entrada no histórico.
  useEffect(() => {
    if (!redirectTo) return;
    navigate(`/blog/${redirectTo}${window.location.search}${window.location.hash}`, { replace: true });
  }, [redirectTo, navigate]);

  useDocumentMeta(
    post
      ? {
          title: post.seoTitle || `${post.title} | CF Contabilidade Brusque`,
          description: post.seoDescription || post.excerpt,
          canonical: `${SITE_URL}/blog/${post.slug}`,
          image: post.image ? new URL(post.image, SITE_URL).toString() : '',
          imageAlt: post.imageAlt || post.title,
          robots: 'index, follow',
        }
      : { ...notFoundMeta, robots: 'noindex' },
  );

  if (redirectTo) return null;

  if (!post) {
    return (
      <div className="min-h-screen bg-cf-background px-5 py-40 md:px-8">
        <div className="mx-auto max-w-3xl border-y border-cf-border py-14 text-center">
          <p className="cf-label text-cf-blue">
            Conteúdo não encontrado
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-cf-black">
            Esse artigo não foi encontrado.
          </h1>
          <p className="mt-4 text-cf-muted">
            Ele pode ter sido removido, renomeado ou ainda não estar publicado.
          </p>
          <div className="mt-7">
            <PrimaryButton href="/blog">
              Voltar para o Blog
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cf-background">
      <section className="bg-cf-navy px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <a
            href="/blog"
            className="group inline-flex min-h-[44px] items-center text-sm font-bold text-cf-on-dark transition hover:text-cf-offwhite"
          >
            <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar para o Blog
          </a>

          <Eyebrow mount tone="light" className="mt-10">
            {journey}{post.type ? ` • ${post.type}` : ''}
          </Eyebrow>

          <MaskText
            as="h1"
            mount
            delay={0.1}
            lines={[post.title]}
            className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.045em] text-cf-offwhite md:text-6xl"
          />

          <m.div initial="hidden" animate="visible" variants={variants.up} custom={0.5}>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-cf-on-dark md:text-xl md:leading-9">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cf-offwhite/15 pt-5 text-sm text-cf-on-dark">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatPostDate(post.date)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>

              {post.author && <span>Por {post.author}</span>}
            </div>
          </m.div>
        </div>
      </section>

      <article className="px-5 pb-16 md:px-8 md:pb-32">
        <div className="mx-auto max-w-4xl">
          {post.image && (
            <m.div
              initial="hidden"
              animate="visible"
              variants={variants.image}
              custom={0.3}
              className="relative -mt-10 mb-14 aspect-[16/9] overflow-hidden bg-cf-soft md:-mt-14"
            >
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </m.div>
          )}

          <div className={`mx-auto max-w-3xl ${post.image ? '' : 'pt-16 md:pt-20'}`}>
            <ArticleContent content={post.content} />

            {post.tags?.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-cf-border pt-6" aria-label="Tags do artigo">
                {post.tags.map((tag) => (
                  <li key={tag} className="border border-cf-border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-cf-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {post.link && /^https?:\/\//i.test(post.link) && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cf-link mt-12 text-cf-blue hover:text-cf-blue-dark"
              >
                Ver fonte externa
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <RevealLine className="bg-cf-navy" />
            <div className="pt-10">
              <p className="cf-label text-cf-blue">Próximo passo</p>
              <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-[-0.035em] text-cf-black md:text-4xl">
                Esse conteúdo fez sentido para a realidade da sua empresa?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-cf-muted">
                Você pode responder o diagnóstico e enviar um resumo da sua situação para a CF.
              </p>
              <div className="mt-8">
                <PrimaryButton href="/diagnostico">
                  Analisar minha situação contábil
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
