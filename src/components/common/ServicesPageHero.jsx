import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
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
Versão sem imagem:
- remove a foto do escritório do topo;
- organiza os serviços em blocos claros;
- reduz ruído visual;
- passa estrutura, método e confiança.
============================================================
*/

const trustPoints = [
  'Rotina acompanhada de perto',
  'Prazos e obrigações organizados',
  'Orientação clara para o empresário',
];

const serviceAreas = [
  {
    icon: Building2,
    title: 'Abertura e regularização',
    description:
      'Apoio para abrir, ajustar ou regularizar a empresa com documentação e enquadramento mais organizados.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fiscal e tributário',
    description:
      'Acompanhamento de notas, guias, apurações, impostos e obrigações fiscais da rotina mensal.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Trabalhista',
    description:
      'Suporte para folha de pagamento, admissões, desligamentos e obrigações relacionadas à equipe.',
  },
  {
    icon: FileText,
    title: 'Contábil e societário',
    description:
      'Organização das informações contábeis, alterações contratuais e acompanhamento da vida da empresa.',
  },
];

const processSteps = [
  'Entendemos o momento da empresa',
  'Organizamos as informações principais',
  'Indicamos o caminho contábil mais seguro',
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
              Ver serviços
            </a>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/80 bg-white/74 p-6 shadow-xl shadow-slate-900/7 backdrop-blur md:p-7"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
              <Landmark className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">
              Uma rotina contábil não precisa parecer confusa.
            </h2>

            <p className="mt-4 leading-relaxed text-slate-600">
              Quando cada área tem acompanhamento, prazos definidos e informações bem organizadas,
              a empresa ganha previsibilidade para agir antes que os problemas apareçam.
            </p>

            <div className="mt-6 space-y-3">
              {processSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-[#f7fbfe] p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-800 text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="font-bold text-slate-700">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {serviceAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 + index * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[1.6rem] border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:border-sky-200 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950">
                    {area.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-6 rounded-[1.5rem] border border-sky-900/10 bg-gradient-to-r from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7"
        >
          <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
              <ClipboardCheck className="h-6 w-6" />
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
