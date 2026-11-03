import { m } from 'framer-motion';
import { Eyebrow, MaskText } from '../motion/primitives';
import { VIEWPORT, variants } from '../motion/motionConfig';

/*
============================================================
SECTION HEADER — EDITORIAL
============================================================
theme="light"  -> textos escuros, para fundos claros.
theme="dark"   -> textos claros, para fundos escuros.

layout="stack" -> label, título e texto empilhados (padrão).
layout="split" -> label + título à esquerda, texto à direita,
                  alinhado pela base. Bom para abrir seções largas.

`lines` permite controlar a quebra do título (cada item = uma linha
que sobe pela máscara). Sem `lines`, o título entra como uma linha só.
============================================================
*/

export default function SectionHeader({
  eyebrow,
  title,
  lines,
  description,
  theme = 'light',
  layout = 'stack',
  align = 'left',
  className = '',
  titleClassName = 'cf-title-lg',
  children,
}) {
  const isDark = theme === 'dark';
  const titleColor = isDark ? 'text-cf-offwhite' : 'text-cf-black';
  const textColor = isDark ? 'text-cf-on-dark' : 'text-cf-muted';
  const centered = align === 'center' && layout === 'stack';

  const heading = (
    <>
      {eyebrow && (
        <Eyebrow tone={isDark ? 'light' : 'blue'} className={centered ? 'justify-center' : ''}>
          {eyebrow}
        </Eyebrow>
      )}
      <MaskText as="h2" lines={lines || [title]} className={`mt-6 ${titleClassName} ${titleColor}`} />
    </>
  );

  const body = (description || children) && (
    <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={variants.up} custom={0.25}>
      {description && <p className={`text-base leading-7 md:text-lg md:leading-8 ${textColor}`}>{description}</p>}
      {children}
    </m.div>
  );

  if (layout === 'split') {
    return (
      <header className={`grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
        <div className="lg:col-span-7">{heading}</div>
        {body && <div className="max-w-xl lg:col-span-4 lg:col-start-9 lg:pb-2">{body}</div>}
      </header>
    );
  }

  return (
    <header className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {heading}
      {body && <div className={`mt-6 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{body}</div>}
    </header>
  );
}
