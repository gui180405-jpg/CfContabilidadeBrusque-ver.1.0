import { m } from 'framer-motion';
import { EASE_IN_OUT, stagger, variants } from '../motion/motionConfig';

/*
============================================================
PROCESS TIMELINE — O MÉTODO COMO PERCURSO
============================================================
Desktop: linha horizontal que se desenha da esquerda para a
direita; cada marco acende quando a linha "chega" nele e só
então o texto do passo aparece.

Mobile: a mesma lógica na vertical.

steps: [{ number, title, text }]
tone:  'light' | 'dark'
============================================================
*/

const LINE_DURATION = 1.6;

export default function ProcessTimeline({ steps, tone = 'light', className = '', headingAs = 'h3' }) {
  const Heading = headingAs === 'h2' ? m.h2 : m.h3;
  const isDark = tone === 'dark';
  const count = steps.length;
  const track = isDark ? 'bg-cf-offwhite/15' : 'bg-cf-border';
  const titleColor = isDark ? 'text-cf-offwhite' : 'text-cf-black';
  const textColor = isDark ? 'text-cf-on-dark' : 'text-cf-muted';

  return (
    <m.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative grid gap-0 lg:gap-10 ${count === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} ${className}`}
    >
      {/* trilho horizontal (desktop) */}
      <span aria-hidden="true" className={`absolute left-0 right-0 top-[7px] hidden h-px lg:block ${track}`} />
      <m.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: LINE_DURATION, ease: EASE_IN_OUT } },
        }}
        className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-cf-blue lg:block"
      />

      {/* trilho vertical (mobile) */}
      <span aria-hidden="true" className={`absolute bottom-0 left-[7px] top-0 w-px lg:hidden ${track}`} />
      <m.span
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: LINE_DURATION, ease: EASE_IN_OUT } },
        }}
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-cf-blue lg:hidden"
      />

      {steps.map((step, index) => {
        // o marco acende quando a linha passa por ele
        const reach = (index / count) * LINE_DURATION * 0.9;

        return (
          <m.li
            key={step.number}
            variants={stagger(0.1, reach)}
            className="relative pb-10 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12"
          >
            <m.span
              aria-hidden="true"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE_IN_OUT } },
              }}
              className={`absolute left-0 top-0 block h-[15px] w-[15px] border-2 border-cf-blue ${
                isDark ? 'bg-cf-navy' : 'bg-cf-background'
              }`}
            />

            <m.span variants={variants.number} className={`cf-numeral block text-[2.6rem] leading-none md:text-6xl ${titleColor}`}>
              {step.number}
            </m.span>
            <Heading variants={variants.up} className={`mt-3 text-xl font-black tracking-[-0.03em] md:mt-5 md:text-[1.7rem] ${titleColor}`}>
              {step.title}
            </Heading>
            <m.p variants={variants.up} className={`mt-2 max-w-sm leading-7 md:mt-3 md:max-w-xs ${textColor}`}>
              {step.text}
            </m.p>
          </m.li>
        );
      })}
    </m.ol>
  );
}
