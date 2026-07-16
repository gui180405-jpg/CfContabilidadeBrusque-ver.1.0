import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  FileText,
  MessageCircle,
  Play,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import { homeHero, site } from '../../content/siteContent';

/*
============================================================
HERO SECTION — NOVO AR
============================================================
Inspiração de sites de produto:
- interface viva;
- painel visual;
- mockup de conversa;
- card da Rose menor, sem dominar todo o topo.
============================================================
*/

const heroTrust = [
  { value: '17+', label: 'anos de experiência' },
  { value: 'CF', label: 'rotina acompanhada' },
  { value: 'SC', label: 'atendimento próximo' },
];

const dashboardItems = [
  {
    icon: ReceiptText,
    title: 'Impostos',
    status: 'apurados com atenção',
  },
  {
    icon: CalendarCheck2,
    title: 'Prazos',
    status: 'rotina organizada',
  },
  {
    icon: FileText,
    title: 'Documentos',
    status: 'informações conferidas',
  },
];

const chatMessages = [
  'Tenho dúvidas sobre impostos e documentos.',
  'Vamos organizar o contexto da empresa primeiro.',
  'Quero mais clareza para decidir.',
];

export default function HeroSection({ onStartQuiz, navigate }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#102f47] px-5 pb-24 pt-32 text-white md:px-8 md:pb-28 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(125,211,252,0.20),transparent_32%),radial-gradient(circle_at_84%_22%,rgba(255,255,255,0.12),transparent_28%)]" />
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.055]" />
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-sky-300/16 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-700/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#eef1f4] via-[#eef1f4]/55 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sky-200/18 bg-white/8 px-4 py-2 text-sm font-bold text-sky-100 shadow-lg shadow-black/10 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-200" />
            </span>
            {homeHero.eyebrow}
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[4.55rem]">
            Contabilidade clara para transformar obrigações em rotina.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            A CF ajuda empresas a organizar impostos, documentos, prazos e decisões para que a contabilidade deixe de ser lembrada apenas na urgência.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onStartQuiz}>
              {homeHero.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>
            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="inline-flex items-center justify-center rounded-xl border border-white/14 bg-white/8 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/12 md:text-base"
            >
              Ver como a CF organiza
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {homeHero.highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 + index * 0.08 }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-sky-200" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[590px]"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-sky-300/10 blur-3xl" />

          <div className="absolute left-0 top-2 w-full max-w-[560px] rounded-[2rem] border border-white/14 bg-white/10 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-5">
            <div className="rounded-[1.55rem] border border-white/10 bg-[#e8f0f6] p-5 text-slate-950 shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-700">
                    painel CF
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold">
                    Rotina contábil em foco
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#173d5a] text-sky-100">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {dashboardItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.28 + index * 0.1 }}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-950">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.status}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-2 right-0 z-20 w-[272px] rounded-[2.1rem] border border-slate-950/20 bg-slate-950 p-3 shadow-2xl shadow-black/30 md:w-[310px]">
            <div className="overflow-hidden rounded-[1.65rem] bg-[#e8f0f6]">
              <div className="flex items-center gap-3 bg-[#173d5a] px-4 py-4 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold">CF no WhatsApp</p>
                  <p className="text-xs text-sky-200">orientação inicial</p>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.46 + index * 0.13 }}
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      index === 1
                        ? 'ml-auto bg-[#173d5a] text-white'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    {message}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => setShowVideo(true)}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="absolute bottom-28 left-2 z-30 flex w-[290px] items-center gap-4 rounded-[1.6rem] border border-white/16 bg-white/12 p-4 text-left shadow-2xl shadow-black/20 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-sky-200/30"
            aria-label="Assistir apresentação da Rose Michei"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
              <img
                src={site.founderImage}
                alt="Rose Michei"
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-slate-950/10" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                <Sparkles className="h-3.5 w-3.5" />
                quem orienta
              </p>
              <h2 className="mt-1 truncate text-lg font-extrabold text-white">
                Rose Michei
              </h2>
              <p className="text-xs text-slate-300">
                toque para ver apresentação
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sky-800 shadow-xl">
              <Play className="ml-0.5 h-5 w-5" />
            </div>
          </motion.button>

          <div className="absolute right-8 top-[300px] hidden w-[240px] rounded-[1.5rem] border border-white/14 bg-white/10 p-5 text-white shadow-2xl shadow-black/18 backdrop-blur-xl md:block">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-200/14 text-sky-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-sky-200">
              segurança
            </p>
            <p className="mt-2 font-extrabold leading-snug">
              Da informação solta para uma rotina acompanhada.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-7xl">
        <div className="grid gap-3 rounded-[1.6rem] border border-white/12 bg-white/8 p-4 shadow-2xl shadow-black/10 backdrop-blur md:grid-cols-3">
          {heroTrust.map((metric) => (
            <div key={metric.value} className="rounded-2xl bg-white/8 p-4">
              <p className="text-2xl font-extrabold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
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
