import { motion } from 'framer-motion';

/*
============================================================
PAGE HERO / TOPO DE PÁGINA INTERNA
============================================================
Topo limpo para páginas internas, com profundidade e movimento
sutil para manter a identidade do site.
============================================================
*/

export default function PageHero({ eyebrow, title, description, image, children }) {
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-55" />
      <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-sky-500/16 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e8f0f6] to-transparent" />

      <div className={`relative z-10 mx-auto grid max-w-7xl items-center gap-10 ${hasImage ? 'lg:grid-cols-[1fr_0.85fr]' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={hasImage ? 'text-left' : 'mx-auto max-w-4xl text-center'}
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className={`mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl ${hasImage ? '' : 'mx-auto'}`}>
            {description}
          </p>
          {children && <div className={`mt-8 flex flex-col gap-4 sm:flex-row ${hasImage ? '' : 'items-center justify-center'}`}>{children}</div>}
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 170, damping: 18 }}
            className="cf-depth-card rounded-[1.7rem] border border-white/70 bg-white/88 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur"
          >
            <img
              src={image}
              alt="Imagem institucional da CF Contabilidade Brusque"
              className="h-[320px] w-full rounded-[1.25rem] object-cover object-center md:h-[380px]"
              loading="eager"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
