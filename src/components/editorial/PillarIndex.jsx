import { useState } from 'react';
import { m } from 'framer-motion';
import { EASE, VIEWPORT, stagger, variants } from '../motion/motionConfig';

/*
============================================================
PILLAR INDEX — PILARES LADO A LADO, UM EM FOCO
============================================================
Três (ou quatro) colunas separadas por linhas, sem cards.
Ao passar o mouse (ou focar) em um pilar:
- uma linha azul desliza até ele no topo;
- o número ganha cor;
- os outros pilares recuam levemente.

items: [{ title, description, icon? }]
============================================================
*/

const COLS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function PillarIndex({ items, tone = 'light', indicatorId = 'cf-pillar-indicator', className = '' }) {
  const [active, setActive] = useState(null);
  const isDark = tone === 'dark';

  return (
    <m.ul
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(0.12)}
      onMouseLeave={() => setActive(null)}
      className={`grid border-t ${COLS[items.length] || 'md:grid-cols-3'} ${isDark ? 'border-white/15' : 'border-cf-border'} ${className}`}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = active === index;
        const dimmed = active !== null && !isActive;

        return (
          <m.li
            key={item.title}
            variants={variants.up}
            tabIndex={0}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className={`relative border-b py-9 outline-none transition-opacity duration-500 ease-cf md:border-b-0 md:px-8 md:py-12 md:first:pl-0 md:[&:not(:first-child)]:border-l ${
              isDark ? 'border-white/15' : 'border-cf-border'
            } ${dimmed ? 'md:opacity-[0.45]' : 'opacity-100'}`}
          >
            {isActive && (
              <m.span
                layoutId={indicatorId}
                transition={{ duration: 0.5, ease: EASE }}
                aria-hidden="true"
                className="absolute -top-px left-0 right-0 hidden h-[2px] bg-cf-blue md:block"
              />
            )}

            <div className="flex items-start justify-between gap-6">
              <span
                className={`cf-numeral text-6xl leading-none transition-colors duration-500 md:text-7xl ${
                  isActive ? 'text-cf-blue' : isDark ? 'text-white' : 'text-cf-navy'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {Icon && (
                <Icon
                  aria-hidden="true"
                  className={`mt-2 h-5 w-5 transition-transform duration-500 ease-cf ${isActive ? '-translate-y-1 text-cf-blue' : isDark ? 'text-cf-on-dark' : 'text-cf-muted'}`}
                />
              )}
            </div>

            <h3 className={`mt-10 text-2xl font-black tracking-[-0.03em] ${isDark ? 'text-white' : 'text-cf-navy'}`}>{item.title}</h3>
            <p className={`mt-3 max-w-sm leading-7 ${isDark ? 'text-cf-on-dark' : 'text-cf-muted'}`}>{item.description}</p>
          </m.li>
        );
      })}
    </m.ul>
  );
}
