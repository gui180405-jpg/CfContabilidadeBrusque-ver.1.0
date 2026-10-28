import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion, useScroll } from 'framer-motion';

/*
============================================================
STATEMENT SCROLL — AFIRMAÇÕES LIDAS UMA DE CADA VEZ
============================================================
Lista de afirmações grandes. Conforme o visitante rola:
- uma linha vertical à esquerda "enche" com o progresso;
- a afirmação no centro da tela fica em destaque;
- as outras continuam presentes, só que em segundo plano.

Funciona igual no mobile (sem sticky, sem custo extra).
============================================================
*/

function Statement({ text, index, isActive, onActivate }) {
  const ref = useRef(null);
  const atCenter = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (atCenter) onActivate(index);
  }, [atCenter, index, onActivate]);

  return (
    <li
      ref={ref}
      className={`grid grid-cols-[3rem_1fr] gap-4 py-8 transition-[opacity,color] duration-500 ease-cf md:grid-cols-[5rem_1fr] md:py-12 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <span className={`cf-numeral pt-2 text-sm md:text-base ${isActive ? 'text-cf-blue' : 'text-cf-muted'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="max-w-2xl text-[1.6rem] font-semibold leading-[1.25] tracking-[-0.025em] text-cf-navy md:text-[2.25rem] md:leading-[1.2]">
        {text}
      </p>
    </li>
  );
}

export default function StatementScroll({ statements, className = '' }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* trilho + preenchimento */}
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-cf-border" />
      <m.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-cf-blue"
      />

      <ol className="pl-6 md:pl-10">
        {statements.map((text, index) => (
          <Statement key={text} text={text} index={index} isActive={reduce || active === index} onActivate={setActive} />
        ))}
      </ol>
    </div>
  );
}
