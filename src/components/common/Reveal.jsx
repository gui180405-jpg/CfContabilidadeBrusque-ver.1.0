import { m } from 'framer-motion';
import { VIEWPORT, variants } from '../motion/motionConfig';

/*
============================================================
REVEAL — ENTRADA PADRÃO DO SITE
============================================================
Mantém a API antiga (children, className, delay, as) e ganha
`variant` para escolher o comportamento do sistema de motion:
'up' (padrão) | 'fade' | 'number' | 'image' | 'cta'.
============================================================
*/

export default function Reveal({ children, className = '', delay = 0, as = 'div', variant = 'up', mount = false }) {
  const Tag = m[as] || m.div;
  const trigger = mount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <Tag
      initial="hidden"
      {...trigger}
      variants={variants[variant] || variants.up}
      custom={delay}
      className={className}
    >
      {children}
    </Tag>
  );
}
