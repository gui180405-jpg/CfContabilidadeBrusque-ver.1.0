import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
SERVIÇOS HERO — MAIS PROFUNDO E SMOOTH
============================================================
Objetivo:
- reduzir branco estourado;
- criar mais profundidade visual;
- manter página Serviços diferente da Home;
- movimento leve, institucional e satisfatório.
============================================================
*/

const trustPoints = [
  'rotina acompanhada',
  'prazos mais claros',
  'obrigações organizadas',
];

const methodSteps = [
  {
    icon: FileSearch,
    title: 'Diagnóstico',
    description: 'entender o momento da empresa',
  },
  {
    icon: ClipboardCheck,
    title: 'Organização',
    description: 'estruturar informações e obrigações',
  },
  {
    icon: ShieldCheck,
    title: 'Acompanhamento',
    description: 'dar mais segurança à rotina',
  },
];

const areaLinks = [
  { label: 'Abertura', href: '#abertura' },
  { label: 'Rotina mensal', href: '#rotina' },
  { label: 'Fiscal e tributário', href: '#impostos' },
  { label: 'Trabalhista', href: '#trabalhista' },
  { label: 'Regularização', href: '#regularizacao' },
];

export default function ServicesPageHero({ eyebrow, title, description, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-[#D7E7F2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute -left-36 top-10 h-[30rem] w-[30rem] rounded-full bg-[#0077B6]/14 blur-3xl" />
      <div className="absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-white/75 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F2F46] via-[#0F2F46]/35 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#173D5A]/12 bg-white/72 px-4 py-2 text-sm font-bold text-[#173D5A] shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#0077B6]" />
            {eyebrow}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#334155] md:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-bold text-[#475569] shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-[#0077B6]" />
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
              className="inline-flex items-center justify-center rounded-xl border border-[#173D5A]/12 bg-white/76 px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-[#0369A1] md:text-base"
            >
              Ver áreas atendidas
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-[1.7rem] border border-white/30 bg-[#173D5A]/92 text-white shadow-2xl shadow-slate-900/18 backdrop-blur"
        >
          <div className="grid md:grid-cols-3">
            {methodSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className={`p-5 md:p-6 ${
                    index < methodSteps.length - 1
                      ? 'border-b border-white/10 md:border-b-0 md:border-r'
                      : ''
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sky-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-extrabold text-sky-200/65">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-white">{step.title}</h2>

                  <p className="mt-2 text-sm leading-relaxed text-sky-100/75">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2 rounded-[1.5rem] border border-white/30 bg-white/62 p-3 shadow-sm backdrop-blur">
          {areaLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-white/72 px-4 py-2 text-sm font-bold text-[#173D5A] shadow-sm transition duration-300 hover:bg-sky-50 hover:text-[#0369A1]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
