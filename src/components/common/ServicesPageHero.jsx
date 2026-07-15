import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
HERO — PÁGINA DE SERVIÇOS
============================================================
Sem imagem ruim.
Com método, clareza e leitura mais comercial.
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
    title: 'Entender o momento',
    description:
      'Antes de falar em guia ou documento, é preciso entender como a empresa está hoje.',
  },
  {
    icon: ClipboardCheck,
    title: 'Organizar a rotina',
    description:
      'Depois, a CF estrutura prazos, informações e áreas que precisam de acompanhamento.',
  },
  {
    icon: ShieldCheck,
    title: 'Acompanhar com segurança',
    description:
      'Com a rotina mais clara, o empresário deixa de depender apenas da urgência.',
  },
];

export default function ServicesPageHero({ eyebrow, title, description, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-40" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-500/12 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#dfeaf2] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/76 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sky-700 shadow-[0_0_14px_rgba(3,105,161,0.55)]" />
            {eyebrow}
          </div>

          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-extrabold leading-[1.04] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            {description}
          </p>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
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

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
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

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {methodSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.07 }}
                className="rounded-[1.6rem] border border-white/80 bg-white/78 p-6 shadow-xl shadow-slate-900/7 backdrop-blur"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-extrabold text-sky-900/35">
                    0{index + 1}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-950">
                  {step.title}
                </h2>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-6 rounded-[1.5rem] border border-sky-900/10 bg-gradient-to-r from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7"
        >
          <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
              <Landmark className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                Próximo passo
              </p>
              <p className="mt-1 text-lg font-extrabold md:text-xl">
                Organize o contexto da sua empresa antes de conversar com a CF.
              </p>
            </div>

            <button
              type="button"
              onClick={onStartQuiz}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-900 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
            >
              Fazer diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
