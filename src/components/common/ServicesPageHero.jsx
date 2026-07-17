import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

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
    <section className="relative overflow-hidden bg-[#E8F0F6] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CBDDE8] bg-white/76 px-4 py-2 text-sm font-bold text-[#173D5A] shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#0077B6]" />
            {eyebrow}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569] md:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/72 px-4 py-2 text-sm font-bold text-[#475569] shadow-sm backdrop-blur"
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
              className="inline-flex items-center justify-center rounded-xl border border-[#CBDDE8] bg-white/82 px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-[#0369A1] md:text-base"
            >
              Ver áreas atendidas
            </a>
          </div>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/72 shadow-lg shadow-slate-900/5 backdrop-blur">
          <div className="grid md:grid-cols-3">
            {methodSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 + index * 0.08 }}
                  className={`p-5 md:p-6 ${index < methodSteps.length - 1 ? 'border-b border-slate-200/70 md:border-b-0 md:border-r' : ''}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-[#0369A1]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-extrabold text-[#173D5A]/35">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-[#0F172A]">
                    {step.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 rounded-[1.5rem] border border-white/80 bg-white/65 p-3 shadow-sm backdrop-blur">
          {areaLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-[#F4F8FB] px-4 py-2 text-sm font-bold text-[#173D5A] transition duration-300 hover:bg-sky-50 hover:text-[#0369A1]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
