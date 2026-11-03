import { Children, useEffect, useRef, useState } from 'react';
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import PhotoImage from '../common/PhotoImage';
import { VIEWPORT, stagger, variants } from './motionConfig';

/*
============================================================
PRIMITIVAS DE MOVIMENTO
============================================================
Peças pequenas e combináveis. As seções não escrevem
animação "na mão": elas compõem estas primitivas.
============================================================
*/

function getTag(as) {
  return m[as] || m.div;
}

/**
 * Container que dispara a entrada em sequência dos filhos <StaggerItem>.
 * `mount` = anima ao montar (topo de página), em vez de esperar o scroll.
 */
export function Stagger({
  as = 'div',
  children,
  className = '',
  gap = 0.08,
  delay = 0,
  mount = false,
  viewport = VIEWPORT,
  ...props
}) {
  const Tag = getTag(as);
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport };

  return (
    <Tag initial="hidden" {...trigger} variants={stagger(gap, delay)} className={className} {...props}>
      {children}
    </Tag>
  );
}

/** Filho de <Stagger>. Herda o gatilho do container. */
export function StaggerItem({ as = 'div', variant = 'up', children, className = '', ...props }) {
  const Tag = getTag(as);

  return (
    <Tag variants={variants[variant] || variants.up} className={className} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Título que sobe linha a linha por trás de uma máscara.
 * Passe `lines` (array) para controlar a quebra — no mobile as linhas
 * continuam quebrando naturalmente dentro de cada máscara.
 */
export function MaskText({
  as = 'h2',
  lines,
  children,
  className = '',
  lineClassName = '',
  mount = false,
  delay = 0,
  gap = 0.09,
  keepLines = false, // true = mantém as quebras também no mobile
}) {
  const Tag = getTag(as);
  const content = lines || Children.toArray(children);
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <Tag initial="hidden" {...trigger} variants={stagger(gap, delay)} className={className}>
      {content.map((line, index) => (
        // No mobile as linhas viram texto corrido (quebra natural, só fade);
        // a partir de md cada linha sobe pela própria máscara.
        <span
          key={index}
          className={`${keepLines ? 'block overflow-hidden pb-[0.1em] -mb-[0.1em]' : 'inline md:block md:overflow-hidden md:pb-[0.1em] md:-mb-[0.1em]'} ${
            Array.isArray(lineClassName) ? lineClassName[index] || '' : lineClassName
          }`}
        >
          <m.span className={keepLines ? 'block will-change-transform' : 'inline md:block md:will-change-transform'} variants={variants.mask}>
            {line}
          </m.span>
          {index < content.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}

/** Linha editorial que se expande (horizontal ou vertical). */
export function RevealLine({ axis = 'x', className = '', delay = 0, mount = false }) {
  const variant = axis === 'y' ? variants.lineY : variants.line;
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <m.span
      aria-hidden="true"
      initial="hidden"
      {...trigger}
      variants={variant}
      custom={delay}
      className={`block ${axis === 'y' ? 'w-px origin-top' : 'h-px origin-left'} ${className}`}
    />
  );
}

/** Label pequeno com traço que cresce antes do texto aparecer. */
export function Eyebrow({ children, tone = 'blue', className = '', mount = false }) {
  const colors = {
    blue: 'text-cf-blue',
    light: 'text-cf-on-dark',
    white: 'text-cf-offwhite', // sobre o azul CF (o cinza-claro não tem contraste suficiente ali)
    muted: 'text-cf-muted',
  };
  const lineColors = {
    blue: 'bg-cf-blue',
    light: 'bg-cf-on-dark/60',
    white: 'bg-cf-offwhite/70',
    muted: 'bg-cf-muted/60',
  };
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <m.p
      initial="hidden"
      {...trigger}
      variants={stagger(0.18)}
      className={`cf-label flex items-center gap-4 ${colors[tone]} ${className}`}
    >
      <m.span aria-hidden="true" variants={variants.line} className={`block h-px w-10 origin-left ${lineColors[tone]}`} />
      <m.span variants={variants.fade}>{children}</m.span>
    </m.p>
  );
}

/**
 * Número que conta até o valor quando entra na tela.
 * Aceita "17+", "4", "2009". Textos sem número (ex.: "Brusque") são exibidos direto.
 */
export function CountUp({ value, className = '', duration = 1.4, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : null;
  const [current, setCurrent] = useState(target === null || reduce ? target : 0);

  useEffect(() => {
    if (target === null) return undefined;
    if (reduce) {
      setCurrent(target);
      return undefined;
    }
    if (!inView) return undefined;

    // rAF próprio (em vez de animate()) para manter o bundle inicial leve.
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    let frame;
    let start;
    const tick = (now) => {
      if (start === undefined) start = now + delay * 1000;
      const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      setCurrent(Math.round(ease(t) * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduce, duration, delay]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{String(value)}</span>
      <span aria-hidden="true">
        {match[1]}
        {current}
        {match[3]}
      </span>
    </span>
  );
}

/**
 * Foto com abertura por recorte e parallax muito leve no scroll.
 * `intensity` em % do próprio quadro (4–8 é o suficiente).
 */
export function ParallaxImage({
  src,
  fallback,
  alt,
  className = '',
  imgClassName = 'object-cover object-center',
  intensity = 5,
  reveal = true,
  loading = 'lazy',
  fetchPriority,
  mount = false,
  sizes,
  children,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const range = reduce ? 0 : intensity;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.15 } };

  return (
    <m.div
      ref={ref}
      initial={reveal ? 'hidden' : false}
      {...(reveal ? trigger : {})}
      variants={variants.image}
      className={`relative overflow-hidden ${className}`}
    >
      <m.div style={{ y }} className="absolute inset-0 will-change-transform">
        <PhotoImage
          src={src}
          fallback={fallback}
          alt={alt}
          className={`absolute left-0 w-full ${imgClassName}`}
          style={{ top: `-${range}%`, height: `${100 + range * 2}%` }}
          loading={loading}
          fetchPriority={fetchPriority}
          sizes={sizes}
          decoding="async"
        />
      </m.div>
      {children}
    </m.div>
  );
}

/** Seta que desliza um pouco no hover do elemento pai (`group`). */
export function HoverArrow({ icon: Icon, className = '' }) {
  return (
    <Icon
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-cf group-hover:translate-x-1 ${className}`}
    />
  );
}

