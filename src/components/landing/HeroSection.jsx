import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Sparkles, X } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import { homeHero, site } from '../../content/siteContent';

const trustItems = [
  'Rotina contábil acompanhada',
  'Orientação clara',
  'Mais segurança para decidir',
];

const metrics = [
  { value: '17+', label: 'anos de experiência' },
  { value: 'CF', label: 'atendimento próximo' },
  { value: 'Brusque', label: 'contabilidade local' },
];

export default function HeroSection({ onStartQuiz, navigate }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#E8F0F6] px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F4F8FB] via-[#F4F8FB]/75 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#CBDDE8] bg-white/75 px-4 py-2 text-sm font-bold text-[#173D5A] shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0077B6] opacity-35" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0077B6]" />
            </span>
            {homeHero.eyebrow || 'Contabilidade em Brusque-SC'}
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] md:text-5xl lg:text-[4.15rem]">
            Contabilidade clara para empresas que querem crescer com segurança.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] md:text-xl">
            A CF organiza a rotina contábil, fiscal, trabalhista e societária para que sua empresa tenha mais previsibilidade, menos correria e mais confiança nas decisões.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onStartQuiz}>
              Analisar minha situação contábil
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>

            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="inline-flex items-center justify-center rounded-xl border border-[#CBDDE8] bg-white/78 px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-[#0369A1] md:text-base"
            >
              Conhecer serviços
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
                className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/60 px-3 py-2 text-sm font-semibold text-[#475569] shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0077B6]" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-white/60 blur-2xl" />

          <motion.button
            type="button"
            onClick={() => setShowVideo(true)}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/90 bg-white/82 p-3 text-left shadow-2xl shadow-slate-900/12 backdrop-blur focus:outline-none focus:ring-4 focus:ring-sky-200"
            aria-label="Assistir apresentação da Rose Michei"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
              <img
                src={site.founderImage}
                alt="Rose Michei, contadora e fundadora da CF Contabilidade Brusque"
                className="h-[500px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                loading="eager"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/10 to-transparent" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2.5 text-xs font-bold text-white shadow-2xl shadow-black/20 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-sky-200" />
                Quem está à frente da CF
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
                    Contadora responsável
                  </p>
                  <h2 className="mt-1 text-3xl font-extrabold text-white">
                    Rose Michei
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    CF Contabilidade Brusque
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#0369A1] shadow-2xl transition duration-300">
                  <Play className="ml-1 h-7 w-7" />
                </div>
              </div>
            </div>
          </motion.button>

          <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.value}
                className="rounded-2xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-slate-900/6 backdrop-blur"
              >
                <p className="text-xl font-extrabold text-[#0F172A]">{metric.value}</p>
                <p className="mt-1 text-xs leading-snug text-[#64748B]">{metric.label}</p>
              </div>
            ))}
          </div>
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
