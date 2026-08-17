import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import Reveal from '../common/Reveal';

/*
============================================================
SERVIÇOS — CICLO CONTÁBIL PREMIUM
============================================================
Conceito:
A contabilidade não é uma escada linear. É um ciclo de organização:
documentos, prazos, impostos, equipe, pendências e acompanhamento.

Objetivo visual:
- fundo mais profundo;
- ícones flutuantes premium;
- motion sutil, respirando;
- card explicativo claro;
- sem parecer dashboard pesado.
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
    position: 'left-1/2 top-0 -translate-x-1/2',
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
    position: 'right-0 top-[32%] -translate-y-1/2',
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
    position: 'right-[10%] bottom-0',
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
    position: 'left-[10%] bottom-0',
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
    position: 'left-0 top-[32%] -translate-y-1/2',
  },
];

const floatingDetails = [
  {
    icon: FileText,
    className: 'left-[15%] top-[17%]',
    delay: 0,
    motion: { y: [-5, 7, -5], x: [0, 3, 0], rotate: [-1.5, 1.5, -1.5] },
  },
  {
    icon: CalendarCheck,
    className: 'right-[14%] top-[17%]',
    delay: 0.45,
    motion: { y: [6, -6, 6], x: [0, -3, 0], rotate: [1, -1, 1] },
  },
  {
    icon: ShieldCheck,
    className: 'left-[18%] bottom-[16%]',
    delay: 0.9,
    motion: { y: [-4, 6, -4], x: [-2, 2, -2], rotate: [0, 2, 0] },
  },
  {
    icon: CheckCircle2,
    className: 'right-[18%] bottom-[16%]',
    delay: 1.15,
    motion: { y: [5, -5, 5], x: [2, -2, 2], rotate: [2, 0, 2] },
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cycleItems[activeIndex];
  const ActiveIcon = active.icon;

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
            <div className="relative mx-auto aspect-square w-full max-w-[590px]">
              <div className="absolute inset-0 rounded-full bg-sky-300/8 blur-3xl" />
              <div className="absolute inset-[8%] rounded-full border border-sky-100/18" />
              <div className="absolute inset-[18%] rounded-full border border-sky-100/10" />
              <motion.div
                className="absolute inset-[8%] rounded-full border border-sky-300/22"
                animate={{ opacity: [0.42, 0.85, 0.42], scale: [1, 1.018, 1] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/18 bg-white/12 p-6 text-center shadow-2xl shadow-black/22 backdrop-blur-md"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              >
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
              </motion.div>

              <div className="pointer-events-none absolute inset-0 hidden md:block">
                {floatingDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`absolute ${detail.className} z-[8] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-sky-100/75 shadow-lg shadow-black/10 backdrop-blur-md`}
                      animate={detail.motion}
                      transition={{
                        duration: 4.2 + index * 0.45,
                        delay: detail.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  );
                })}
              </div>

              <div className="hidden md:block">
                {cycleItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      id={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`absolute z-20 ${item.position} group max-w-[150px] scroll-mt-28 focus:outline-none`}
                      aria-label={`Selecionar ${item.title}`}
                    >
                      <motion.div
                        animate={{
                          y: isActive ? -5 : 0,
                          scale: isActive ? 1.04 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                        className={`rounded-2xl border p-3 text-left shadow-xl backdrop-blur transition duration-300 ${
                          isActive
                            ? 'border-sky-200/85 bg-white text-[#0F172A] shadow-sky-950/26'
                            : 'border-white/14 bg-white/10 text-sky-100/82 shadow-black/12 hover:border-sky-200/45 hover:bg-white/16'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300 ${
                              isActive
                                ? 'bg-[#0077B6] text-white shadow-lg shadow-sky-900/25'
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

              <div className="grid gap-3 md:hidden">
                {cycleItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition duration-300 ${
                        isActive
                          ? 'border-sky-200 bg-white text-[#0F172A]'
                          : 'border-white/14 bg-white/8 text-sky-100'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isActive ? 'bg-[#0077B6] text-white' : 'bg-white/10 text-sky-100'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-extrabold">{item.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/16 bg-[#123A55]/82 shadow-2xl shadow-black/22 backdrop-blur-xl">
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
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                      <ActiveIcon className="h-7 w-7" />
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
                    className="inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/14"
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
