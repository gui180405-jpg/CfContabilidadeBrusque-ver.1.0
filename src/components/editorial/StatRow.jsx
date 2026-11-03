import { m } from 'framer-motion';
import { CountUp } from '../motion/primitives';
import { VIEWPORT, stagger, variants } from '../motion/motionConfig';

/*
============================================================
STAT ROW — NÚMEROS COM PRESENÇA
============================================================
Linha de provas (anos, cidade, registro) que entra em sequência:
1. a linha superior de cada coluna se desenha;
2. o valor sobe (números contam até o valor final);
3. o rótulo aparece por último.

items: [{ value: '17+', label: 'anos de experiência' }]
tone:  'light' (fundo claro) | 'dark' (fundo navy)
size:  'md' | 'lg'
============================================================
*/

const sizes = {
  md: 'text-[2.1rem] sm:text-4xl md:text-[2.6rem]',
  lg: 'text-[2.4rem] sm:text-5xl md:text-6xl',
  // número de destaque no mobile (primeiro item); no sm+ volta ao tamanho da linha
  lead: 'text-[4rem] sm:text-4xl md:text-[2.6rem]',
  leadLg: 'text-[4.25rem] sm:text-5xl md:text-6xl',
};

function isNumeric(value) {
  return /^\D*\d/.test(String(value));
}

function StatValue({ value, tone }) {
  if (!isNumeric(value)) {
    return <span className="font-black tracking-[-0.04em] text-[0.66em] sm:text-[0.85em] md:text-[0.9em]">{value}</span>;
  }

  const [, number, suffix] = String(value).match(/^(\d+)(.*)$/) || [null, value, ''];

  return (
    <span className="cf-numeral">
      <CountUp value={number} />
      {suffix && <span className={tone === 'dark' ? 'text-cf-on-dark' : 'text-cf-blue'}>{suffix}</span>}
    </span>
  );
}

export default function StatRow({ items, tone = 'light', size = 'md', mount = false, delay = 0, className = '' }) {
  const isDark = tone === 'dark';
  const lineTrack = isDark ? 'bg-cf-offwhite/15' : 'bg-cf-border';
  const lineFill = isDark ? 'bg-cf-offwhite/70' : 'bg-cf-navy';
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <m.dl
      initial="hidden"
      {...trigger}
      variants={stagger(0.14, delay)}
      className={`grid gap-x-5 gap-y-7 ${items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'} ${className}`}
    >
      {items.map((item, index) => {
        // Mobile (3 itens): o primeiro número ganha a linha inteira — vira o "título" da prova.
        const lead = items.length === 3 && index === 0;

        return (
        <m.div
          key={`${item.value}-${item.label}`}
          variants={stagger(0.12)}
          className={`min-w-0 ${lead ? 'col-span-2 sm:col-span-1' : ''}`}
        >
          <span aria-hidden="true" className={`relative block h-px ${lineTrack}`}>
            <m.span variants={variants.line} className={`absolute inset-0 block origin-left ${lineFill}`} />
          </span>

          <dt className="sr-only">{item.label}</dt>
          <dd className={`pt-4 md:pt-5 ${lead ? 'flex items-end gap-4 sm:block' : ''}`}>
            <m.span
              variants={variants.number}
              className={`block leading-none ${lead ? (size === 'lg' ? sizes.leadLg : sizes.lead) : sizes[size]} ${isDark ? 'text-cf-offwhite' : 'text-cf-black'}`}
            >
              <StatValue value={item.value} tone={tone} />
            </m.span>
            <m.span
              variants={variants.fade}
              aria-hidden="true"
              className={`block text-xs leading-5 md:text-sm ${lead ? 'max-w-[9rem] pb-1 sm:mt-3 sm:max-w-none sm:pb-0' : 'mt-3'} ${
                isDark ? 'text-cf-on-dark' : 'text-cf-muted'
              }`}
            >
              {item.label}
            </m.span>
          </dd>
        </m.div>
        );
      })}
    </m.dl>
  );
}
