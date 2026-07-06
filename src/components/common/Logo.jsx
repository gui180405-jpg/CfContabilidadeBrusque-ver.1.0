import { motion } from 'framer-motion';

/*
============================================================
COMPONENTE: LOGO
============================================================
Este componente exibe a logo oficial da CF.

Como usar:
- variant="light" usa /logo-cf-branca.png para fundos escuros.
- variant="dark" usa /logo-cf-azul.png para fundos claros.

Animação:
- Ao passar o mouse, a logo amplia levemente.
- Ao tirar o mouse, ela volta suavemente.
- O efeito é discreto para não parecer amador.

Arquivos esperados na pasta public/:
- /logo-cf-branca.png
- /logo-cf-azul.png
============================================================
*/

export default function Logo({ variant = 'light', className = '' }) {
  const logoSrc = variant === 'dark' ? '/logo-cf-azul.png' : '/logo-cf-branca.png';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={logoSrc}
        alt="CF Contabilidade Brusque"
        className="h-10 w-auto select-none md:h-12"
        draggable="false"
      />
    </motion.div>
  );
}
