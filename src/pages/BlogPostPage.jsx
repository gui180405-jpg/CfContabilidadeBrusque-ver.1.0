import { ArrowLeft, CalendarDays, Clock3, ExternalLink } from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import { blogPosts, getJourneyForCategory } from '../content/blogPosts';

function formatPostDate(date) {
  if (!date || date === 'Em breve') return date || 'Em breve';

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('pt-BR');
}

function renderInline(text) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${token}-${match.index}`} className="font-extrabold text-slate-950">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*')) {
      parts.push(
        <em key={`${token}-${match.index}`}>
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const label = linkMatch?.[1] || token;
      const href = linkMatch?.[2] || '#';
      const isExternal = /^https?:\/\//i.test(href);

      parts.push(
        <a
          key={`${token}-${match.index}`}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-bold text-sky-800 underline decoration-sky-300 underline-offset-4 hover:text-sky-600"
        >
          {label}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function MarkdownContent({ content }) {
  if (!content) {
    return (
      <p>
        Este conteúdo ainda está em preparação.
      </p>
    );
  }

  const lines = content.split('\n');
  const elements = [];
  let listItems = [];

  function flushList() {
    if (listItems.length === 0) return;

    elements.push(
      <ul key={`list-${elements.length}`} className="my-6 space-y-2">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-700" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );

    listItems = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed === '---') {
      elements.push(<hr key={index} className="my-10 border-slate-200" />);
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="mt-10 text-2xl font-extrabold text-slate-950">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="mt-12 text-3xl font-extrabold text-slate-950">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={index} className="mt-12 text-3xl font-extrabold text-slate-950">
          {renderInline(trimmed.slice(2))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={index} className="my-8 rounded-2xl border-l-4 border-sky-700 bg-sky-50 p-5 font-semibold text-slate-700">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    elements.push(
      <p key={index} className="mt-5 leading-8 text-slate-700">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList();

  return elements;
}

export default function BlogPostPage({ navigate, onStartQuiz }) {
  const slug = decodeURIComponent(window.location.pathname.split('/blog/')[1] || '');
  const post = blogPosts.find((item) => item.slug === slug);
  const journey = post ? getJourneyForCategory(post.category) : '';

  if (!post) {
    return (
      <main className="min-h-screen bg-[#eef1f4] px-5 py-32 md:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/75 bg-white/82 p-8 text-center shadow-xl shadow-slate-900/8 backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
            Conteúdo não encontrado
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-950">
            Esse artigo não foi encontrado.
          </h1>
          <p className="mt-4 text-slate-600">
            Ele pode ter sido removido, renomeado ou ainda não estar publicado.
          </p>
          <div className="mt-7">
            <PrimaryButton onClick={() => navigate('/blog')}>
              Voltar para o Blog
            </PrimaryButton>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef1f4]">
      <section className="relative overflow-hidden bg-[#163a56] px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(125,211,252,0.22),transparent_36%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.06]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef1f4] via-[#eef1f4]/75 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-sm font-bold text-sky-200 transition hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </button>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-400/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-200 ring-1 ring-sky-300/20">
              {journey}
            </span>
            <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-200 ring-1 ring-white/10">
              {post.type}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatPostDate(post.date)}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <article className="relative px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-4xl">
          {post.image && (
            <div className="relative -mt-10 mb-10 overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur">
              <img
                src={post.image}
                alt={post.title}
                className="h-[320px] w-full rounded-[1.5rem] object-cover md:h-[440px]"
              />
            </div>
          )}

          <div className="rounded-[2rem] border border-white/75 bg-white/86 p-7 shadow-xl shadow-slate-900/8 backdrop-blur md:p-10">
            <div className="prose prose-slate max-w-none">
              <MarkdownContent content={post.content} />
            </div>

            {post.link && /^https?:\/\//i.test(post.link) && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-bold text-sky-800 transition hover:-translate-y-0.5 hover:bg-sky-100"
              >
                Ver fonte externa
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
          </div>

          <div className="mt-10 rounded-[1.7rem] bg-[#173d5a] p-7 text-white shadow-2xl shadow-slate-900/12 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
              Próximo passo
            </p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
              Esse conteúdo fez sentido para a realidade da sua empresa?
            </h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Você pode responder o diagnóstico e enviar um resumo da sua situação para a CF.
            </p>
            <div className="mt-6">
              <PrimaryButton onClick={onStartQuiz}>
                Analisar minha situação contábil
              </PrimaryButton>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
