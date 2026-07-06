import { motion } from 'framer-motion';

/*
============================================================
REVEAL — ANIMAÇÃO PADRÃO DO SITE
============================================================
Componente pequeno para manter o site com movimento suave,
evitando animações exageradas em cada arquivo.

Use para fazer blocos entrarem com leveza quando aparecem na tela.
============================================================
*/

const variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={variants}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
