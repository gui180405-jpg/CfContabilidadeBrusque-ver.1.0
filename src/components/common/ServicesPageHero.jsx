import { motion } from 'framer-motion';
import { BadgeDollarSign, BriefcaseBusiness, Building2, ShieldCheck } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

/*
============================================================
HERO ESPECÍFICO DA PÁGINA DE SERVIÇOS
============================================================
Objetivo:
- deixar a página de Serviços mais institucional;
- usar a foto da recepção como fundo;
- aplicar camada azul/escura;
- dar profundidade e aparência profissional.
============================================================
*/

const highlights = [
  {
    icon: Building2,
    title: 'Abertura e regularização',
    text: 'CNPJ, alterações e estruturação inicial com mais segurança.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fiscal e tributário',
    text: 'Rotina de impostos, notas, prazos e acompanhamento.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Trabalhista',
    text: 'Folha, admissões, obrigações e suporte para a operação.',
  },
  {
    icon: ShieldCheck,
    title: 'Contábil com previsibilidade',
    text: 'Mais organização para decisões com clareza e menos improviso.',
  },
];

export default function ServicesPageHero({ eyebrow, title, description, image, onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Ambiente institucional da CF Contabilidade Brusque"
          className="h-full w-full object-cover object-center opacity-24 md:opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.90)_38%,rgba(7,20,41,0.84)_68%,rgba(8,47,73,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(56,189,248,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute inset-0 cf-subtle-grid opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 shadow-xl shadow-black/10 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.85)]" />
            {eyebrow}
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton onClick={onStartQuiz}>Analisar minha situação contábil</PrimaryButton>

            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 shadow-xl shadow-black/10 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-white/10 md:text-base"
            >
              Ver serviços detalhados
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-4 lg:grid-cols-2 xl:max-w-5xl"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/10 backdrop-blur-md transition duration-300 hover:border-sky-300/25 hover:bg-white/[0.08]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/14 text-sky-300 ring-1 ring-sky-300/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
