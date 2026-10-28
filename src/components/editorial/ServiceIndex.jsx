import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EASE } from '../motion/motionConfig';

/*
============================================================
SERVICE INDEX — SERVIÇOS EM SCROLL STORYTELLING
============================================================
REGRA: o SCROLL controla o serviço ativo. O HOVER nunca troca
o serviço — ele só dá feedback visual (contraste/linha).

Como funciona:
- a seção ganha um "trilho" alto (uma etapa de rolagem por serviço);
- dentro dele, um palco fica preso (sticky) na tela;
- conforme o visitante rola, o progresso define o serviço ativo:
  01 → 02 → 03 → 04 … e o conteúdo troca de forma suave;
- tocar/clicar num número ou título apenas ROLA a página até a
  etapa daquele serviço (o scroll continua sendo o controle).

Desktop: índice vertical à esquerda (com linha de progresso) +
conteúdo do serviço ativo à direita.
Mobile: barra de etapas no topo do palco + conteúdo do serviço.
Telas muito baixas (ex.: celular deitado): lista estática, sem sticky.

Performance: um único listener de scroll do Framer (useScroll),
estado React só muda quando o índice muda; as barras de progresso
são MotionValues (não re-renderizam o React).

services: [{ id?, number, title, description, items: [] }]
cta:      nó opcional exibido no palco (ex.: link para /servicos)
============================================================
*/

// Rolagem dedicada a cada serviço (em % da altura da tela).
// V13: antes 62/75 → ~6–7 "cliques" de roda por serviço e ~27 para atravessar
// a seção no desktop. Agora ~3 cliques por serviço (≈300–340px), o que dá
// progresso perceptível com mouse comum, touchpad e toque.
const STEP = { mobile: 40, desktop: 36 };

// Altura do header fixo: é onde o palco "gruda". O progresso começa e termina
// exatamente quando o palco está preso (antes contava ~70px fora dele).
const HEADER = { mobile: 64, desktop: 72 };

function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/* Barra de progresso de uma etapa (0 → 1 enquanto o serviço está ativo). */
function StepFill({ progress, index, total, axis = 'x' }) {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * total - index)));
  return (
    <m.span
      aria-hidden="true"
      style={axis === 'x' ? { scaleX: fill } : { scaleY: fill }}
      className={`absolute inset-0 block bg-white ${axis === 'x' ? 'origin-left' : 'origin-top'}`}
    />
  );
}

/* Conteúdo do serviço ativo — troca com direção (desce = sobe o novo). */
function ServiceDetail({ service, total, direction, size }) {
  const isDesktop = size === 'desktop';

  return (
    // V13: "popLayout" em vez de "wait" — o novo conteúdo entra junto com a
    // saída do anterior (crossfade). Antes a troca esperava a saída terminar
    // (~0,7 s), o que dava sensação de atraso ao rolar rápido.
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <m.div
        key={service.number}
        custom={direction}
        variants={{
          enter: (dir) => ({ opacity: 0, y: dir * 16 }),
          center: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
          exit: (dir) => ({ opacity: 0, y: dir * -10, transition: { duration: 0.18, ease: EASE } }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <div className="flex items-end gap-5">
          <span
            aria-hidden="true"
            className={`cf-numeral leading-[0.8] text-white ${
              isDesktop ? 'text-[8rem] xl:text-[9.5rem]' : 'text-[4.5rem] [@media(max-height:700px)]:text-[3.5rem]'
            }`}
          >
            {service.number}
          </span>
          <span className="cf-label pb-1.5 text-cf-on-dark">
            de {String(total).padStart(2, '0')}
          </span>
        </div>

        <h3
          className={`font-black tracking-[-0.035em] text-white ${
            isDesktop ? 'mt-10 text-4xl leading-[1.05] xl:text-[2.75rem]' : 'mt-5 text-[1.85rem] leading-[1.05] [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:text-[1.6rem]'
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`text-cf-on-dark ${
            isDesktop ? 'mt-6 max-w-xl text-lg leading-8' : 'mt-4 text-base leading-7 [@media(max-height:700px)]:text-[0.95rem] [@media(max-height:700px)]:leading-6'
          }`}
        >
          {service.description}
        </p>

        <ul
          className={
            isDesktop
              ? 'mt-9 grid max-w-xl grid-cols-2 border-t border-white/15'
              : 'mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/15 pt-4'
          }
        >
          {service.items.map((item, index) => (
            <m.li
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE, delay: 0.06 + index * 0.03 } }}
              className={
                isDesktop
                  ? 'flex items-baseline gap-3 border-b border-white/15 py-3.5 pr-4 text-sm font-semibold text-white/90'
                  : 'inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white/85'
              }
            >
              {isDesktop ? (
                <span className="cf-numeral w-5 text-xs text-cf-on-dark/75">{String.fromCharCode(97 + index)}.</span>
              ) : (
                <span aria-hidden="true" className="h-px w-3 bg-cf-on-dark/60" />
              )}
              {item}
            </m.li>
          ))}
        </ul>
      </m.div>
    </AnimatePresence>
  );
}

/* Fallback para telas baixas: lista estática completa, sem sticky. */
function StaticList({ services, total, cta }) {
  return (
    <div>
      <ol className="border-t border-white/15">
        {services.map((service) => (
          <li key={service.number} id={service.id} className="scroll-mt-24 border-b border-white/15 py-7">
            <p className="cf-numeral text-sm text-cf-on-dark">
              {service.number}/{String(total).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{service.title}</h3>
            <p className="mt-3 leading-7 text-cf-on-dark">{service.description}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-white/80">{service.items.join(' · ')}</p>
          </li>
        ))}
      </ol>
      {cta && <div className="mt-8">{cta}</div>}
    </div>
  );
}

export default function ServiceIndex({ services, cta, className = '' }) {
  const total = services.length;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef(0);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const tallEnough = useMediaQuery('(min-height: 560px)');
  const step = isDesktop ? STEP.desktop : STEP.mobile;
  const headerPx = isDesktop ? HEADER.desktop : HEADER.mobile;

  // 0 → 1 enquanto o palco está preso: começa quando o trilho encosta no header
  // e termina quando o fim do trilho chega ao fim da tela (palco se solta).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: [`start ${headerPx}px`, 'end end'],
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Único ponto que muda o serviço ativo: a posição do scroll.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(value * total)));
    if (next === activeRef.current) return;
    setDirection(next > activeRef.current ? 1 : -1);
    activeRef.current = next;
    setActive(next);
  });

  // Toque/clique em um item: rola até a etapa dele (não troca o estado direto).
  const scrollToStep = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;
      const top = track.getBoundingClientRect().top + window.scrollY - headerPx;
      const range = track.offsetHeight - (window.innerHeight - headerPx);
      const target = top + ((index + 0.5) / total) * range;
      window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
    },
    [total, reduce, headerPx],
  );

  if (!tallEnough) {
    return (
      <div className={className}>
        <StaticList services={services} total={total} cta={cta} />
      </div>
    );
  }

  const service = services[active];

  return (
    <>
    {/* Leitores de tela recebem a lista completa de uma vez (o palco visual
        mostra um serviço por vez, conforme a rolagem). */}
    <ol className="sr-only">
      {services.map((item) => (
        <li key={item.number}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.items.join(', ')}</p>
        </li>
      ))}
    </ol>
    <div
      ref={trackRef}
      className={`relative ${className}`}
      // altura = palco (tela − header) + uma etapa de rolagem por serviço
      style={{ height: `calc(100svh - ${headerPx}px + ${total * step}svh)` }}
    >
      {/* âncoras de cada serviço (mantém links como /servicos#abertura) */}
      {services.map((item, index) =>
        item.id ? (
          <span
            key={item.id}
            id={item.id}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 h-px w-px"
            // meio da etapa; o scroll-margin compensa o header → cai no serviço certo
            style={{ top: `${(index + 0.5) * step}svh`, scrollMarginTop: `${headerPx}px` }}
          />
        ) : null,
      )}

      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)]">
        {isDesktop ? (
          /* ---------------- DESKTOP ---------------- */
          <div className="grid h-full grid-cols-12 items-center gap-10 py-10">
            <nav className="relative col-span-5 self-center" aria-label="Serviços">
              {/* trilho de progresso */}
              <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/15" />
              <m.span
                aria-hidden="true"
                style={{ scaleY: scrollYProgress }}
                className="absolute bottom-0 left-0 top-0 w-px origin-top bg-cf-blue"
              />

              <ol className="pl-8">
                {services.map((item, index) => {
                  const isActive = index === active;

                  return (
                    <li key={item.number}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(index)}
                        aria-current={isActive ? 'step' : undefined}
                        className={`group flex w-full items-baseline gap-5 py-3 text-left transition-colors duration-500 ease-cf ${
                          isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                        }`}
                      >
                        <span className="cf-numeral w-8 shrink-0 text-sm">{item.number}</span>
                        <span className="relative text-2xl font-black tracking-[-0.03em] xl:text-[1.75rem]">
                          {item.title}
                          {/* feedback de hover: só a linha, nunca o estado */}
                          <span
                            aria-hidden="true"
                            className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-cf ${
                              isActive ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="relative col-span-7 border-l border-white/15 pl-12 xl:pl-16">
              <div aria-hidden="true">
                <ServiceDetail service={service} total={total} direction={direction} size="desktop" />
              </div>
              {cta && <div className="mt-10">{cta}</div>}
            </div>
          </div>
        ) : (
          /* ---------------- MOBILE ---------------- */
          <div className="flex h-full flex-col pb-6 pt-5">
            <nav aria-label="Serviços">
              <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
                {services.map((item, index) => {
                  const isActive = index === active;

                  return (
                    <li key={item.number}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(index)}
                        aria-current={isActive ? 'step' : undefined}
                        aria-label={`${item.number} — ${item.title}`}
                        className="block w-full pb-2 pt-3 text-left"
                      >
                        <span className="relative block h-[2px] overflow-hidden bg-white/20">
                          <StepFill progress={scrollYProgress} index={index} total={total} />
                        </span>
                        <span
                          className={`cf-numeral mt-2.5 block text-xs transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-cf-on-dark/75'
                          }`}
                        >
                          {item.number}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <m.p
              style={{ opacity: hintOpacity }}
              aria-hidden="true"
              className="cf-label mt-1 flex items-center justify-end gap-2 text-cf-on-dark"
            >
              Role para percorrer <ArrowDown className="h-3.5 w-3.5" />
            </m.p>

            {/* conteúdo centralizado na altura disponível — sem vazio no meio */}
            <div className="relative flex flex-1 flex-col justify-center py-4" aria-hidden="true">
              <ServiceDetail service={service} total={total} direction={direction} size="mobile" />
            </div>

            {/* pista do próximo serviço: deixa claro que há mais conteúdo ao rolar */}
            <div className="flex items-end justify-between gap-4 pr-20">
              <div className="min-w-0">
                {services[active + 1] && (
                  <p className="mb-3 truncate text-xs text-cf-on-dark/70">
                    <span className="cf-label mr-2 text-cf-on-dark/75">A seguir</span>
                    {services[active + 1].title}
                  </p>
                )}
                {cta}
              </div>
            </div>
          </div>
        )}

        {isDesktop && (
          <m.p
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
            className="cf-label absolute bottom-8 left-8 flex items-center gap-2 text-cf-on-dark"
          >
            <ArrowDown className="h-3.5 w-3.5" /> Role para percorrer os serviços
          </m.p>
        )}
      </div>
    </div>
    </>
  );
}
