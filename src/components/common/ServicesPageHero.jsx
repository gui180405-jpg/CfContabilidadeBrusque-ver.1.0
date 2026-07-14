import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
HERO — PÁGINA DE SERVIÇOS
============================================================
Objetivo desta versão:
- menos informação no topo;
- imagem limpa, sem card pesado em cima;
- serviços apresentados como áreas organizadas, não como blocos competindo;
- hero com mais respiro e confiança.
============================================================
*/

const serviceAreas = [
  {
    icon: FileText,
    title: 'Fiscal e tributário',
    description: 'Notas, guias, apurações, prazos e obrigações fiscais.',
  },
  {
    icon: ClipboardCheck,
    title: 'Contábil e societário',
    description: 'Abertura, regularização, alterações e acompanhamento mensal.',
  },
  {
    icon: ShieldCheck,
    title: 'Trabalhista',
    description: 'Folha, admissões, rotinas de pessoal e obrigações relacionadas.',
  },
];

const trustPoints = [
  'Rotina acompanhada',
  'Prazos organizados',
  'Orientação clara',
];

export default function ServicesPageHero({ eyebrow, title, description, image, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-40" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-500/12 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#dfeaf2] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
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

          <div className="mt-7 flex flex-wrap gap-3">
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
              Ver serviços
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-sky-900/8 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <img
              src={image}
              alt="Estrutura da CF Contabilidade Brusque"
              className="h-[340px] w-full rounded-[1.55rem] object-cover object-center md:h-[500px]"
            />
          </div>

          <div className="pointer-events-none absolute -bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/80 bg-white/86 p-5 shadow-2xl shadow-slate-900/12 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                <Landmark className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">
                  Estrutura e rotina
                </p>
                <p className="mt-1 text-base font-semibold leading-relaxed text-slate-800">
                  Serviços organizados por área para apoiar o dia a dia da empresa.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl">
        <div className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-xl shadow-slate-900/6 backdrop-blur md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.14 + index * 0.08 }}
                  className="flex gap-4 rounded-[1.35rem] border border-slate-200/70 bg-[#f7fbfe] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-950">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {area.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
