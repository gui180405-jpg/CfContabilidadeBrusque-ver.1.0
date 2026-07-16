import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Landmark,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
HERO SERVIÇOS — NOVO AR
============================================================
Com painel visual de método, sem depender de foto ruim.
============================================================
*/

const trustPoints = [
  'menos improviso na rotina',
  'mais clareza sobre obrigações',
  'decisões com mais segurança',
];

const methodSteps = [
  {
    icon: FileSearch,
    title: 'Diagnóstico',
    description: 'entender o momento',
  },
  {
    icon: ClipboardCheck,
    title: 'Organização',
    description: 'estruturar informações',
  },
  {
    icon: ShieldCheck,
    title: 'Acompanhamento',
    description: 'evitar surpresas',
  },
];

export default function ServicesPageHero({ eyebrow, title, description, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-40" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-500/12 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-white/45 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/76 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sky-700 shadow-[0_0_14px_rgba(3,105,161,0.55)]" />
            {eyebrow}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/72 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-sky-800" />
                {point}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton onClick={onStartQuiz}>
              Analisar minha situação contábil
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>

            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/82 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
            >
              Ver áreas atendidas
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[500px]"
        >
          <div className="absolute inset-0 rounded-[2.6rem] bg-sky-900/8 blur-2xl" />

          <div className="absolute right-0 top-0 w-full max-w-[470px] rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                  método CF
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                  Como a rotina ganha forma
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <Landmark className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {methodSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-[#f7fbfe] p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-800 text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-800 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-950">{step.title}</p>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-[280px] rounded-[1.8rem] border border-sky-900/10 bg-gradient-to-br from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/16">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
              <CalendarCheck2 className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              menos urgência
            </p>
            <h3 className="mt-2 text-2xl font-extrabold leading-tight">
              Prazos, guias e documentos com mais previsibilidade.
            </h3>
          </div>

          <div className="absolute bottom-0 right-6 w-[250px] rounded-[1.6rem] border border-white/80 bg-white/86 p-5 shadow-xl shadow-slate-900/10 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-950">Próximo passo</p>
                <p className="text-sm text-slate-500">diagnóstico contábil</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
