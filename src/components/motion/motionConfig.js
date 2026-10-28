/*
============================================================
SISTEMA DE MOVIMENTO — CF CONTABILIDADE
============================================================
Um único lugar para ritmo, curvas e variantes.

Princípio: cada tipo de elemento tem um comportamento próprio,
mas todos compartilham a mesma curva e a mesma família de durações.

- Título  → sobe por uma máscara (linha a linha)
- Linha   → cresce da esquerda (scaleX 0 → 1)
- Número  → sobe com uma escala mínima
- Imagem  → abre por recorte + escala 0.98 → 1 (sem "pular")
- Lista   → entra em sequência (stagger)
- Hover   → deslocamentos de 2–4px, nunca mais

Tudo respeita prefers-reduced-motion via <MotionConfig reducedMotion="user">
(em MotionRoot) e via useReducedMotion nos componentes com scroll.
============================================================
*/

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  image: 1.1,
};

// Quando um bloco "conta" que entrou na tela.
export const VIEWPORT = { once: true, amount: 0.25 };
export const VIEWPORT_EARLY = { once: true, amount: 0.12 };

export const variants = {
  up: {
    hidden: { opacity: 0, y: 18 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE, delay } }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({ opacity: 1, transition: { duration: DURATION.base, ease: EASE, delay } }),
  },
  // Linha de título saindo de trás de uma máscara
  mask: {
    hidden: { y: '105%', opacity: 0 },
    visible: (delay = 0) => ({
      y: '0%',
      opacity: 1,
      transition: { duration: DURATION.slow, ease: EASE, delay, opacity: { duration: DURATION.base, delay } },
    }),
  },
  line: {
    hidden: { scaleX: 0 },
    visible: (delay = 0) => ({ scaleX: 1, transition: { duration: DURATION.slow, ease: EASE_IN_OUT, delay } }),
  },
  lineY: {
    hidden: { scaleY: 0 },
    visible: (delay = 0) => ({ scaleY: 1, transition: { duration: DURATION.slow, ease: EASE_IN_OUT, delay } }),
  },
  number: {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.slow, ease: EASE, delay } }),
  },
  image: {
    hidden: { opacity: 0, scale: 0.98, clipPath: 'inset(8% 0% 0% 0%)' },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: DURATION.image, ease: EASE, delay },
    }),
  },
  cta: {
    hidden: { opacity: 0, y: 10 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE, delay } }),
  },
};

export function stagger(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
