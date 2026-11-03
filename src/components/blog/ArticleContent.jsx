/*
============================================================
ARTICLE CONTENT — renderiza o Markdown gravado pelo painel
============================================================
Suporta o que o editor do painel produz:
- títulos (## seção, ### subseção, #### item);
- parágrafos (linhas seguidas viram um parágrafo só);
- listas com marcadores e numeradas;
- citações (>), linha divisória (---);
- negrito (** ou __), itálico (* ou _), tachado (~~), código (`);
- links [texto](url) — externos abrem em nova aba;
- imagens ![descrição](arquivo "legenda") como figura com legenda;
- caracteres escapados com barra (\*, \_ …).

Sem dangerouslySetInnerHTML: tudo vira elemento React.
============================================================
*/

const ESCAPABLE = /\\([\\`*_{}[\]()#+\-.!>~|])/g;
const PLACEHOLDER = (index) => `\uE000${index}\uE000`;

function isExternal(href) {
  return /^https?:\/\//i.test(href);
}

// Só deixa passar endereços seguros: http(s), mailto, tel, caminhos do site e âncoras.
// Bloqueia javascript:, data: etc. mesmo que alguém escreva isso no painel.
function safeHref(href) {
  const value = String(href || '').trim();
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  if (/^(\/(?!\/)|#|\.{0,2}\/)/.test(value)) return value;
  return null;
}

function safeImageSrc(src) {
  const value = String(src || '').trim();
  if (/^https:\/\//i.test(value) || /^\/(?!\/)/.test(value)) return value;
  return null;
}

function renderInline(text, keyPrefix = 'i') {
  // 1) protege caracteres escapados
  const escaped = [];
  const source = text.replace(ESCAPABLE, (_, char) => {
    escaped.push(char);
    return PLACEHOLDER(escaped.length - 1);
  });
  const restore = (value) => value.replace(/\uE000(\d+)\uE000/g, (_, index) => escaped[Number(index)]);

  const pattern =
    /(!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+(?:\s+"[^"]*")?\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\*[^*\s][^*]*\*|(?<![\p{L}\p{N}])_[^_\s][^_]*_(?![\p{L}\p{N}]))/gu;

  const parts = [];
  let last = 0;
  let match;
  let n = 0;

  while ((match = pattern.exec(source)) !== null) {
    if (match.index > last) parts.push(restore(source.slice(last, match.index)));
    const token = match[0];
    const key = `${keyPrefix}-${n++}`;

    if (token.startsWith('![')) {
      const [, alt, rawSrc] = token.match(/^!\[([^\]]*)\]\(([^)\s]+)/);
      const src = safeImageSrc(rawSrc);
      if (src) parts.push(<img key={key} src={src} alt={restore(alt)} className="inline-block max-h-[1.2em] align-middle" loading="lazy" />);
    } else if (token.startsWith('[')) {
      const [, label, rawHref] = token.match(/^\[([^\]]+)\]\(([^)\s]+)/);
      const href = safeHref(rawHref);
      if (!href) {
        parts.push(<span key={key}>{renderInline(restore(label), key)}</span>);
        last = pattern.lastIndex;
        continue;
      }
      parts.push(
        <a
          key={key}
          href={href}
          target={isExternal(href) ? '_blank' : undefined}
          rel={isExternal(href) ? 'noopener noreferrer' : undefined}
          className="font-bold text-cf-blue underline decoration-cf-blue/40 underline-offset-4 hover:text-cf-blue-dark"
        >
          {renderInline(restore(label), key)}
        </a>,
      );
    } else if (token.startsWith('**') || token.startsWith('__')) {
      parts.push(
        <strong key={key} className="font-extrabold text-cf-black">
          {renderInline(restore(token.slice(2, -2)), key)}
        </strong>,
      );
    } else if (token.startsWith('~~')) {
      parts.push(<s key={key}>{restore(token.slice(2, -2))}</s>);
    } else if (token.startsWith('`')) {
      parts.push(
        <code key={key} className="bg-cf-soft px-1.5 py-0.5 text-[0.9em]">
          {restore(token.slice(1, -1))}
        </code>,
      );
    } else {
      parts.push(<em key={key}>{renderInline(restore(token.slice(1, -1)), key)}</em>);
    }

    last = pattern.lastIndex;
  }

  if (last < source.length) parts.push(restore(source.slice(last)));
  return parts;
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;
const UL_ITEM = /^[-*+]\s+(.*)$/;
const OL_ITEM = /^\d+[.)]\s+(.*)$/;

function parseBlocks(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = null;
  let quote = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'p', lines: paragraph });
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) blocks.push({ type: 'quote', lines: quote });
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      return;
    }

    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      quote.push(trimmed.replace(/^>\s?/, ''));
      return;
    }
    flushQuote();

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushAll();
      blocks.push({ type: 'heading', level: Math.min(Math.max(heading[1].length, 2), 4), text: heading[2] });
      return;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushAll();
      blocks.push({ type: 'hr' });
      return;
    }

    const image = trimmed.match(IMAGE_LINE);
    if (image) {
      flushAll();
      blocks.push({ type: 'image', alt: image[1], src: image[2], caption: image[3] || '' });
      return;
    }

    const ul = trimmed.match(UL_ITEM);
    const ol = trimmed.match(OL_ITEM);
    if (ul || ol) {
      flushParagraph();
      const kind = ul ? 'ul' : 'ol';
      if (!list || list.type !== kind) {
        flushList();
        list = { type: kind, items: [] };
      }
      list.items.push((ul || ol)[1]);
      return;
    }

    // linha que continua o item de lista anterior (texto quebrado)
    if (list && /^\s{2,}/.test(rawLine)) {
      list.items[list.items.length - 1] += ` ${trimmed}`;
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushAll();
  return blocks;
}

function renderParagraphLines(lines, key) {
  // quebra forçada: linha terminando com "\" ou dois espaços
  const out = [];
  lines.forEach((line, index) => {
    const hardBreak = /(\\|\s{2,})$/.test(line);
    const clean = line.replace(/(\\|\s{2,})$/, '').trim();
    out.push(...renderInline(clean, `${key}-${index}`));
    if (index < lines.length - 1) out.push(hardBreak ? <br key={`${key}-br-${index}`} /> : ' ');
  });
  return out;
}

export default function ArticleContent({ content }) {
  if (!content) {
    return <p className="text-lg leading-8 text-cf-text">Este conteúdo ainda está em preparação.</p>;
  }

  return parseBlocks(content).map((block, index) => {
    const key = `b-${index}`;

    switch (block.type) {
      case 'heading': {
        if (block.level === 2) {
          return (
            <h2 key={key} className="mt-14 text-3xl font-black leading-tight tracking-[-0.03em] text-cf-black first:mt-0">
              {renderInline(block.text, key)}
            </h2>
          );
        }
        if (block.level === 3) {
          return (
            <h3 key={key} className="mt-12 text-2xl font-black tracking-[-0.025em] text-cf-black">
              {renderInline(block.text, key)}
            </h3>
          );
        }
        return (
          <h4 key={key} className="mt-10 text-xl font-extrabold tracking-[-0.02em] text-cf-black">
            {renderInline(block.text, key)}
          </h4>
        );
      }
      case 'hr':
        return <hr key={key} className="my-12 border-cf-border" />;
      case 'quote':
        return (
          <blockquote key={key} className="my-10 border-l-2 border-cf-blue pl-6 text-xl font-semibold leading-8 tracking-[-0.01em] text-cf-black">
            {renderParagraphLines(block.lines, key)}
          </blockquote>
        );
      case 'image':
        if (!safeImageSrc(block.src)) return null;
        return (
          <figure key={key} className="my-12">
            <img src={block.src} alt={block.alt} loading="lazy" decoding="async" className="w-full bg-cf-soft" />
            {block.caption && <figcaption className="mt-3 text-sm leading-6 text-cf-muted">{block.caption}</figcaption>}
          </figure>
        );
      case 'ul':
        return (
          <ul key={key} className="my-6 space-y-2.5">
            {block.items.map((item, itemIndex) => (
              <li key={`${key}-${itemIndex}`} className="flex gap-3 text-lg leading-8 text-cf-text">
                <span aria-hidden="true" className="mt-4 h-px w-3 shrink-0 bg-cf-blue" />
                <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={key} className="my-6 space-y-2.5">
            {block.items.map((item, itemIndex) => (
              <li key={`${key}-${itemIndex}`} className="flex gap-4 text-lg leading-8 text-cf-text">
                <span className="cf-numeral w-6 shrink-0 pt-px text-base text-cf-blue">{String(itemIndex + 1).padStart(2, '0')}</span>
                <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
              </li>
            ))}
          </ol>
        );
      default:
        return (
          <p key={key} className="mt-5 text-lg leading-8 text-cf-text">
            {renderParagraphLines(block.lines, key)}
          </p>
        );
    }
  });
}
