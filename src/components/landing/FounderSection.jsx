import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, MessageSquareHeart, Play, ShieldCheck, TrendingUp, X } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { site } from '../../content/siteContent';

/*
============================================================
FOUNDER SECTION — ROSE + VÍDEO
============================================================
Esta seção recupera a lógica do primeiro site:
- foto da Rose clicável;
- ao clicar, abre o vídeo em modal;
- mantém visual institucional, escuro e elegante.
============================================================
*/

const trustPoints = [
  { icon: Award, title: '17+ anos', text: 'experiência na área contábil' },
  { icon: ShieldCheck, title: 'CRC ativo', text: 'credibilidade profissional' },
  { icon: MessageSquareHeart, title: 'Atendimento próximo', text: 'suporte claro e humanizado' },
  { icon: TrendingUp, title: 'Visão estratégica', text: 'organização para decisões melhores' },
];

export default function FounderSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="sobre" className="relative overflow-hidden bg-slate-950 px-5 py-20 md:px-8 md:py-24">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.10),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Quem está à frente"
            title="Conheça a contadora por trás da CF"
            description="A confiança também nasce quando você sabe quem conduz a orientação contábil da sua empresa."
            theme="dark"
          />
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col items-center lg:items-start">
            <motion.button
              type="button"
              onClick={() => setShowVideo(true)}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="group relative w-full max-w-[360px] rounded-[2rem] border border-white/10 bg-white/8 p-3 text-left shadow-2xl shadow-black/30 backdrop-blur focus:outline-none focus:ring-4 focus:ring-sky-400/30"
              aria-label="Assistir apresentação da Rose Michei"
            >
              <div className="absolute -inset-4 rounded-[2.4rem] bg-sky-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
                <img
                  src={site.founderImage}
                  alt="Rose Michei, contadora e fundadora da CF Contabilidade Brusque"
                  className="h-[470px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Assistir apresentação</p>
                    <p className="mt-1 text-lg font-extrabold text-white">Clique na foto</p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-sky-800 shadow-xl transition duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 right-6 rounded-full bg-sky-700 px-4 py-2 text-xs font-bold text-white shadow-xl shadow-sky-950/30">
                CEO & Fundadora
              </div>
            </motion.button>

            <p className="mt-8 flex items-center gap-2 text-sm text-slate-400">
              <Play className="h-3.5 w-3.5" />
              Clique na foto para assistir ao vídeo
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-300">Rose Michei</p>
            <h3 className="mt-4 text-3xl font-extrabold text-white md:text-5xl">
              Experiência, clareza e proximidade na rotina contábil.
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Com mais de <span className="font-semibold text-white">17 anos de experiência</span> na área contábil, Rose Michei lidera a CF Contabilidade Brusque com foco em organização, orientação responsável e suporte próximo para empresas que querem crescer com segurança.
            </p>
            <blockquote className="mt-8 border-l-4 border-sky-500 pl-5 text-lg italic leading-relaxed text-slate-300">
              “A contabilidade vai muito além dos números. Ela precisa ajudar o empresário a tomar decisões com mais clareza.”
            </blockquote>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <motion.div
                  key={point.title}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="rounded-2xl border border-white/10 bg-white/7 p-5 shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:border-sky-400/40 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-white">{point.title}</h4>
                  <p className="mt-1 text-sm text-slate-400">{point.text}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/50"
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
