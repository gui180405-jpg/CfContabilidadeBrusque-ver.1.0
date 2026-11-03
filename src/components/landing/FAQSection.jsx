import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { faq } from '../../content/siteContent';
import { EASE, VIEWPORT, stagger, variants } from '../motion/motionConfig';

/*
  FAQ editorial
  - título fixo à esquerda (desktop), perguntas numeradas à direita;
  - a pergunta aberta ganha peso e uma linha azul; as outras recuam um pouco;
  - a resposta abre por altura com o texto subindo, o "+" gira para "×".
*/

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-cf-background px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              eyebrow="Dúvidas frequentes"
              title="Perguntas comuns antes de falar com a CF"
              description="Respostas objetivas para entender melhor como funciona o atendimento e o diagnóstico inicial."
              titleClassName="text-4xl font-black leading-[1.04] tracking-[-0.04em] md:text-5xl"
            />
          </div>
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.06)}
          className="border-t border-cf-border lg:col-span-7"
        >
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <m.li key={item.question} variants={variants.up} className="relative border-b border-cf-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-6 text-left md:grid-cols-[3.5rem_1fr_auto] md:py-7"
                  aria-expanded={isOpen}
                  aria-controls={`faq-resposta-${index}`}
                  id={`faq-pergunta-${index}`}
                >
                  <span className={`cf-numeral text-sm ${isOpen ? 'text-cf-blue' : 'text-cf-muted'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-bold leading-snug tracking-[-0.015em] text-cf-black md:text-xl">{item.question}</span>
                  <Plus
                    aria-hidden="true"
                    className={`h-5 w-5 self-center text-cf-blue transition-transform duration-500 ease-cf ${isOpen ? 'rotate-45' : 'group-hover:rotate-90'}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      key="answer"
                      id={`faq-resposta-${index}`}
                      role="region"
                      aria-labelledby={`faq-pergunta-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.45, ease: EASE } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: EASE } }}
                      className="overflow-hidden"
                    >
                      <m.p
                        initial={{ y: 8 }}
                        animate={{ y: 0, transition: { duration: 0.45, ease: EASE } }}
                        className="max-w-2xl pb-7 pl-[3.25rem] leading-7 text-cf-muted md:pl-[4.25rem]"
                      >
                        {item.answer}
                      </m.p>
                    </m.div>
                  )}
                </AnimatePresence>

                {isOpen && (
                  <m.span
                    layoutId="cf-faq-indicator"
                    transition={{ duration: 0.45, ease: EASE }}
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-cf-blue"
                  />
                )}
              </m.li>
            );
          })}
        </m.ol>
      </div>
    </section>
  );
}
