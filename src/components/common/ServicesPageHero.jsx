import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
HERO ESPECÍFICO DA PÁGINA DE SERVIÇOS
============================================================
Versão clara e institucional:
- remove o fundo escuro pesado;
- tira a foto de fundo competindo com o texto;
- usa imagem em card lateral;
- mantém sensação profissional, limpa e confiável.
============================================================
*/

const highlights = [
  'Abertura e regularização',
  'Rotina fiscal e tributária',
  'Departamento pessoal',
  'Contabilidade mensal',
];

const serviceCards = [
  {
    icon: Building2,
    title: 'Empresas em abertura',
    text: 'Apoio para começar com estrutura e documentação organizada.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Impostos e obrigações',
    text: 'Acompanhamento de prazos, notas, guias e entregas fiscais.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Rotina trabalhista',
    text: 'Folha, admissões, obrigações e suporte para a operação.',
  },
  {
    icon: ShieldCheck,
    title: 'Gestão com segurança',
    text: 'Informações contábeis mais claras para decisões melhores.',
  },
];

export default function ServicesPageHero({ eyebrow, title, description, image, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-45" />
      <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-sky-500/14 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-200/22 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#dfeaf2] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.98fr_1.02fr]">
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

          <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/72 px-4 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-800" />
                {item}
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
              Ver serviços detalhados
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-sky-900/8 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <div className="relative overflow-hidden rounded-[1.55rem]">
              <img
                src={image}
                alt="Estrutura da CF Contabilidade Brusque"
                className="h-[360px] w-full object-cover object-center md:h-[500px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-slate-950/4 to-white/12" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/52 px-4 py-2 text-sm font-bold text-white shadow-xl shadow-black/20 backdrop-blur-md">
                <FileCheck2 className="h-4 w-4 text-sky-200" />
                Rotina acompanhada
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/18 bg-white/88 p-5 shadow-2xl shadow-slate-900/14 backdrop-blur-md">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-800">
                  Da obrigação ao acompanhamento
                </p>
                <p className="mt-1 text-base font-semibold leading-relaxed text-slate-800">
                  Serviços pensados para organizar a operação contábil da empresa com mais clareza.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {serviceCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 + index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-2xl border border-white/80 bg-white/82 p-5 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:border-sky-200"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
