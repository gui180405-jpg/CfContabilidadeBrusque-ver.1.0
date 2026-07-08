import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Newspaper,
  Tag,
} from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import { blogPosts } from '../content/blogPosts';

function decodeSlug(slug = '') {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function normalizeText(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function formatPostDate(date) {
  if (!date || date === 'Em breve') return date || 'Em breve';

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString('pt-BR');
}

function removeDuplicatedLeadingTitle(content = '', title = '') {
  const lines = String(content).split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim());

  if (firstContentIndex === -1) return '';

  const firstLine = lines[firstContentIndex].trim();

  if (!firstLine.startsWith('#')) {
    return content;
  }

  const headingText = firstLine.replace(/^#{1,3}\s+/, '').trim();

  if (normalizeText(headingText) !== normalizeText(title)) {
    return content;
  }

  return [
    ...lines.slice(0, firstContentIndex),
    ...lines.slice(firstContentIndex + 1),
  ].join('\n').trim();
}

function isExternalUrl(url = '') {
  return /^https?:\/\//i.test(url);
}

function InlineText({ text }) {
  const source = String(text);
  const tokens = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(source)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: source.slice(lastIndex, match.index) });
    }

    if (match[2] && match[3]) {
      tokens.push({ type: 'link', label: match[2], href: match[3] });
    } else if (match[4]) {
      tokens.push({ type: 'strong', value: match[4] });
    } else if (match[5]) {
      tokens.push({ type: 'em', value: match[5] });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < source.length) {
    tokens.push({ type: 'text', value: source.slice(lastIndex) });
  }

  return (
    <>
      {tokens.map((token, index) => {
        if (token.type === 'strong') {
          return (
            <strong key={index} className="font-extrabold text-slate-950">
              {token.value}
            </strong>
          );
        }

        if (token.type === 'em') {
          return (
            <em key={index} className="italic text-slate-800">
              {token.value}
            </em>
          );
        }

        if (token.type === 'link') {
          return (
            <a
              key={index}
              href={token.href}
              target={isExternalUrl(token.href) ? '_blank' : undefined}
              rel={isExternalUrl(token.href) ? 'noopener noreferrer' : undefined}
              className="font-bold text-sky-800 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-600"
            >
              {token.label}
            </a>
          );
        }

        return <span key={index}>{token.value}</span>;
      })}
    </>
  );
}

function getLineType(line) {
  const trimmed = line.trim();

  if (!trimmed) return 'empty';
  if (trimmed === '---') return 'hr';
  if (trimmed.startsWith('### ')) return 'h3';
  if (trimmed.startsWith('## ')) return 'h2';
  if (trimmed.startsWith('# ')) return 'h2';
  if (trimmed.startsWith('> ')) return 'quote';
  if (/^[-*]\s+/.test(trimmed)) return 'ul';
  if (/^\d+\.\s+/.test(trimmed)) return 'ol';

  return 'paragraph';
}

function parseMarkdownBlocks(content) {
  const lines = String(content || '').split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    const type = getLineType(line);

    if (type === 'empty') {
      index += 1;
      continue;
    }

    if (type === 'hr') {
      blocks.push({ type: 'hr' });
      index += 1;
      continue;
    }

    if (type === 'h2' || type === 'h3') {
      blocks.push({
        type,
        text: trimmed.replace(/^#{1,3}\s+/, ''),
      });
      index += 1;
      continue;
    }

    if (type === 'quote') {
      const quoteLines = [];

      while (index < lines.length && getLineType(lines[index]) === 'quote') {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }

      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    if (type === 'ul' || type === 'ol') {
      const items = [];

      while (index < lines.length && getLineType(lines[index]) === type) {
        items.push(
          lines[index]
            .trim()
            .replace(/^[-*]\s+/, '')
            .replace(/^\d+\.\s+/, '')
        );
        index += 1;
      }

      blocks.push({ type, items });
      continue;
    }

    const paragraphLines = [];

    while (
      index < lines.length &&
      getLineType(lines[index]) === 'paragraph'
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: 'p', text: paragraphLines.join(' ') });
  }

  return blocks;
}

function MarkdownContent({ content, title }) {
  const cleanContent = removeDuplicatedLeadingTitle(content, title);
  const blocks = parseMarkdownBlocks(cleanContent);

  if (!blocks.length) {
    return (
      <p className="text-lg leading-8 text-slate-700">
        Conteúdo em preparação.
      </p>
    );
  }

  return (
    <div>
      {blocks.map((block, blockIndex) => {
        if (block.type === 'hr') {
          return <hr key={blockIndex} className="my-9 border-slate-200" />;
        }

        if (block.type === 'h2') {
          return (
            <h2
              key={blockIndex}
              className="mt-10 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl"
            >
              <InlineText text={block.text} />
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={blockIndex}
              className="mt-8 text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl"
            >
              <InlineText text={block.text} />
            </h3>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={blockIndex}
              className="my-7 rounded-2xl border-l-4 border-sky-700 bg-sky-50 px-6 py-5 text-lg font-semibold leading-relaxed text-slate-800"
            >
              <InlineText text={block.text} />
            </blockquote>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={blockIndex} className="mt-5 space-y-3">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-lg leading-relaxed text-slate-700">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                  <span>
                    <InlineText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={blockIndex} className="mt-5 space-y-3 counter-reset-list">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-lg leading-relaxed text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-800 text-sm font-extrabold text-white">
                    {itemIndex + 1}
                  </span>
                  <span>
                    <InlineText text={item} />
                  </span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={blockIndex} className="mt-5 text-lg leading-8 text-slate-700">
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function BlogImageFallback({ category }) {
  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#173d5a] via-[#1d5578] to-[#2f7da6] p-8">
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

export default function BlogPostPage({ slug, navigate, onStartQuiz }) {
  const currentSlug = decodeSlug(slug);
  const post = blogPosts.find((item) => item.slug === currentSlug);

  if (!post || post.draft) {
    return (
      <section className="min-h-screen bg-[#eef1f4] px-5 py-32 md:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-8 text-center shadow-xl shadow-slate-900/8 backdrop-blur md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
            <FileText className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-slate-950">
            Artigo não encontrado
          </h1>

          <p className="mt-4 leading-relaxed text-slate-600">
            Esse conteúdo pode ter sido removido, ainda estar em rascunho ou o link pode estar incorreto.
          </p>

          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-sky-800 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-sky-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o blog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#eef1f4]">
      <div className="relative overflow-hidden bg-[#163a56] px-5 pb-24 pt-32 md:px-8 md:pb-28 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(125,211,252,0.22),transparent_36%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.06]" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-sky-300/18 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef1f4] via-[#eef1f4]/75 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-bold text-slate-200 backdrop-blur transition duration-300 hover:bg-white/12"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-200 ring-1 ring-sky-300/20">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-200 ring-1 ring-white/10">
                <FileText className="h-3.5 w-3.5" />
                {post.type}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
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
          </motion.div>
        </div>
      </div>

      <article className="relative px-5 pb-20 md:px-8 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(15,23,42,0.05),transparent_32%)]" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="-mt-12 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur md:-mt-16 md:p-5">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="h-[280px] w-full rounded-[1.5rem] object-cover md:h-[420px]"
              />
            ) : (
              <BlogImageFallback category={post.category} />
            )}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/90 p-7 shadow-xl shadow-slate-900/8 backdrop-blur md:p-10 lg:p-12">
            <MarkdownContent content={post.content} title={post.title} />

            <div className="mt-12 rounded-[1.5rem] bg-[#173d5a] p-7 shadow-2xl shadow-slate-900/12 md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
                Precisa de orientação?
              </p>

              <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                Sua empresa precisa olhar para esse assunto com mais clareza?
              </h2>

              <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
                A CF pode analisar sua situação contábil e indicar os próximos passos com organização e segurança.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton onClick={onStartQuiz}>
                  Analisar minha situação contábil
                </PrimaryButton>

                <button
                  type="button"
                  onClick={() => navigate('/contato')}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:bg-white/12 md:text-base"
                >
                  Falar com a CF
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
