import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Sparkles, X } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import { homeHero, site } from '../../content/siteContent';

/*
============================================================
HERO SECTION — INSTITUCIONAL COM ROSE EM DESTAQUE
============================================================
Abertura mais elegante:
- texto claro e direto;
- card da Rose como rosto da CF;
- ao clicar na foto, abre o vídeo de apresentação;
- mantém profundidade, sombra e movimento suave.
============================================================
*/

const heroTrust = [
  { value: '17+', label: 'anos de experiência' },
  { value: 'CRC', label: 'atuação profissional' },
  { value: 'CF', label: 'atendimento próximo' },
];

export default function HeroSection({ onStartQuiz, navigate }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#d6e5ef] via-[#e7f0f6] to-[#bfd4e3] px-5 pb-24 pt-32 md:px-8 md:pb-28 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-35" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-500/16 blur-3xl" />
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-sky-900/14 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fafc] via-white/80 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.98fr_1.02fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-sky-800 shadow-lg shadow-sky-900/5 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-700" />
            </span>
            {homeHero.eyebrow}
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-5xl lg:text-[4.25rem]">
            {homeHero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
            {homeHero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onStartQuiz}>
              {homeHero.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>
            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/78 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-sky-800 hover:shadow-xl md:text-base"
            >
              {homeHero.secondaryCta}
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {homeHero.highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 + index * 0.08 }}
                className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/62 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-sky-700" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-sky-300/25 via-white/40 to-sky-900/10 blur-2xl" />

          <motion.button
            type="button"
            onClick={() => setShowVideo(true)}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="cf-depth-card group relative w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-3 text-left shadow-2xl shadow-slate-900/14 backdrop-blur focus:outline-none focus:ring-4 focus:ring-sky-200"
            aria-label="Assistir apresentação da Rose Michei"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
              <img
                src={site.founderImage}
                alt="Rose Michei, contadora e fundadora da CF Contabilidade Brusque"
                className="h-[520px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/78 px-4 py-2.5 text-xs font-bold text-white shadow-2xl shadow-black/20 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-sky-200" />
                Quem está à frente da CF
              </div>
              <div className="absolute inset-x-6 bottom-24 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">Contadora responsável</p>
                  <h2 className="mt-1 text-3xl font-extrabold text-white">Rose Michei</h2>
                  <p className="mt-1 text-sm font-medium text-slate-200">Fundadora da CF Contabilidade Brusque</p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-sky-800 shadow-2xl transition duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7" />
                </div>
              </div>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            className="absolute -bottom-10 left-5 right-5 rounded-2xl border border-white/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {heroTrust.map((metric) => (
                <div key={metric.value} className="min-w-0">
                  <p className="truncate text-lg font-extrabold text-slate-950">{metric.value}</p>
                  <p className="mt-1 text-xs font-medium leading-snug text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
                aria-label="Fechar vídeo"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe
                src={site.founderVideoEmbed}
                className="h-full w-full"
                title="Apresentação Rose Michei"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
