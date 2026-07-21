import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  RefreshCcw,
  ShieldAlert,
} from 'lucide-react';
import Reveal from '../common/Reveal';

/*
============================================================
SERVIÇOS — CICLO CONTÁBIL
============================================================
Conceito:
A contabilidade não é uma escada linear. É uma rotina que gira:
documentos, impostos, prazos, equipe, regularização e acompanhamento.

Objetivo visual:
- mais profundidade;
- menos branco;
- sem "appzinho";
- mais institucional;
- ciclo interativo com conteúdo claro.
============================================================
*/

const cycleItems = [
  {
    id: 'abertura',
    icon: Building2,
    short: 'Abertura',
    eyebrow: 'começando ou ajustando',
    title: 'Abertura e regularização',
    description:
      'CNPJ, enquadramento, alterações e organização cadastral para começar ou ajustar a empresa com mais segurança.',
    bullets: [
      'abertura de CNPJ',
      'alterações contratuais',
      'enquadramento inicial',
      'organização cadastral',
    ],
    position: 'left-[50%] top-[0%] -translate-x-1/2',
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    short: 'Rotina mensal',
    eyebrow: 'dia a dia contábil',
    title: 'Rotina contábil mensal',
    description:
      'Documentos, prazos, relatórios e acompanhamento da movimentação para reduzir correria e decisões no escuro.',
    bullets: [
      'organização de documentos',
      'acompanhamento mensal',
      'relatórios e informações',
      'previsibilidade da rotina',
    ],
    position: 'right-[0%] top-[31%] -translate-y-1/2',
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    short: 'Impostos',
    eyebrow: 'fiscal e tributário',
    title: 'Fiscal, impostos e notas',
    description:
      'Guias, notas fiscais, Simples Nacional e obrigações fiscais acompanhadas com mais clareza.',
    bullets: [
      'guias e apurações',
      'notas fiscais',
      'Simples Nacional',
      'obrigações fiscais',
    ],
    position: 'right-[12%] bottom-[0%]',
  },
  {
    id: 'trabalhista',
    icon: BriefcaseBusiness,
    short: 'Equipe',
    eyebrow: 'departamento pessoal',
    title: 'Departamento pessoal e trabalhista',
    description:
      'Folha, admissões, desligamentos e obrigações trabalhistas para empresas com equipe ou em fase de contratação.',
    bullets: [
      'folha de pagamento',
      'admissões',
      'desligamentos',
      'obrigações trabalhistas',
    ],
    position: 'left-[12%] bottom-[0%]',
  },
  {
    id: 'regularizacao',
    icon: ShieldAlert,
    short: 'Pendências',
    eyebrow: 'ajustes e regularidade',
    title: 'Pendências e regularização',
    description:
      'Acompanhamento de atrasos, CNPJ irregular, ajustes cadastrais e próximos passos para voltar à organização.',
    bullets: [
      'pendências fiscais',
      'CNPJ irregular',
      'ajustes cadastrais',
      'orientação sobre próximos passos',
    ],
    position: 'left-[0%] top-[31%] -translate-y-1/2',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cycleItems[activeIndex];

  const progressLabel = useMemo(() => {
    return `${String(activeIndex + 1).padStart(2, '0')} de ${String(cycleItems.length).padStart(2, '0')}`;
  }, [activeIndex]);

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % cycleItems.length);
  };

  return (
    <section id="servicos" className="relative overflow-hidden bg-[#0F2F46] px-5 py-20 text-white md:px-8 md:py-24">
      <div className="absolute -left-32 top-8 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#0077B6]/18 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-sky-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Áreas atendidas
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              O que a CF organiza na rotina da sua empresa
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-sky-100/82">
              A contabilidade conecta documentos, impostos, prazos, equipe e regularização
              para que a empresa tenha mais clareza no dia a dia.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[580px]">
              <div className="absolute inset-[11%] rounded-full border border-sky-200/15" />
              <div className="absolute inset-[20%] rounded-full border border-sky-200/10" />
              <motion.div
                className="absolute inset-[11%] rounded-full border border-sky-300/22"
                animate={{ rotate: 360 }}
                transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
              />

              <div className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/16 bg-white/10 p-6 text-center shadow-2xl shadow-black/18 backdrop-blur-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/14">
                  <RefreshCcw className="h-7 w-7" />
                </div>

                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-200">
                  ciclo contábil
                </p>

                <h3 className="mt-2 text-xl font-extrabold leading-tight text-white md:text-2xl">
                  Rotina contábil organizada
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-sky-100/76">
                  Acompanhamento para reduzir correria, atrasos e decisões sem clareza.
                </p>
              </div>

              {cycleItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`absolute z-20 ${item.position} group max-w-[148px] focus:outline-none`}
                    aria-label={`Selecionar ${item.title}`}
                  >
                    <motion.div
                      animate={{
                        y: isActive ? -4 : 0,
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                      className={`rounded-2xl border p-3 text-left shadow-xl backdrop-blur transition duration-300 ${
                        isActive
                          ? 'border-sky-200/80 bg-white text-[#0F172A] shadow-sky-950/22'
                          : 'border-white/14 bg-white/10 text-sky-100 shadow-black/12 hover:border-sky-200/45 hover:bg-white/16'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300 ${
                            isActive
                              ? 'bg-[#0077B6] text-white'
                              : 'bg-white/10 text-sky-100 group-hover:bg-white/16'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>

                        <span className="text-sm font-extrabold leading-tight">
                          {item.short}
                        </span>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/14 bg-[#173D5A]/70 shadow-2xl shadow-black/18 backdrop-blur-xl">
              <div className="border-b border-white/10 p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                      acompanhamento contábil
                    </p>
                    <p className="mt-2 text-sm font-bold text-sky-100/75">
                      Área {progressLabel}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {cycleItems.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? 'w-8 bg-sky-300'
                            : 'w-2.5 bg-white/22 hover:bg-white/45'
                        }`}
                        aria-label={`Ir para ${item.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                      {(() => {
                        const ActiveIcon = active.icon;
                        return <ActiveIcon className="h-7 w-7" />;
                      })()}
                    </div>

                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-200">
                      {active.eyebrow}
                    </p>

                    <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                      {active.title}
                    </h3>

                    <p className="mt-5 text-lg leading-relaxed text-sky-100/82">
                      {active.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {active.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-bold text-sky-50"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" />
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#173D5A] shadow-xl shadow-black/12 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
                  >
                    Ver outra área
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <a
                    href="/diagnostico"
                    className="inline-flex items-center justify-center rounded-xl border border-white/16 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/14"
                  >
                    Entender minha situação contábil
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 rounded-[1.6rem] border border-white/12 bg-white/8 p-5 text-center shadow-xl shadow-black/10 backdrop-blur md:p-6">
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-sky-100/82">
              A empresa pode precisar de uma dessas áreas em momentos diferentes.
              Por isso, a CF trabalha com orientação, rotina e acompanhamento, sem tratar a contabilidade apenas como uma obrigação de última hora.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
