import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';

/*
============================================================
SERVIÇOS — JORNADA DE ACOMPANHAMENTO CONTÁBIL
============================================================
Conceito:
- não é gamificação;
- não é app;
- é uma linha de acompanhamento contábil;
- o botão “Próxima etapa” serve para guiar a leitura com suavidade.
============================================================
*/

const serviceStages = [
  {
    id: 'abertura',
    icon: Building2,
    eyebrow: 'Começando ou ajustando',
    title: 'Abertura e regularização de empresa',
    description:
      'A CF entende o momento da empresa e orienta os primeiros passos com documentação, enquadramento e organização cadastral.',
    shortDescription:
      'CNPJ, alterações, enquadramento e organização cadastral.',
    items: ['Abertura de CNPJ', 'Alterações contratuais', 'Enquadramento inicial', 'Organização cadastral'],
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    eyebrow: 'Dia a dia contábil',
    title: 'Rotina contábil mensal',
    description:
      'A rotina mensal ajuda a manter documentos, prazos e informações em ordem, reduzindo correria e decisões no escuro.',
    shortDescription:
      'Documentos, prazos, relatórios e acompanhamento mensal.',
    items: ['Organização de documentos', 'Acompanhamento mensal', 'Relatórios e informações', 'Previsibilidade da rotina'],
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    eyebrow: 'Fiscal e tributário',
    title: 'Impostos, notas e obrigações fiscais',
    description:
      'Acompanhamento fiscal para entender guias, notas, apurações e obrigações que fazem parte da rotina da empresa.',
    shortDescription:
      'Guias, notas fiscais, Simples Nacional e obrigações fiscais.',
    items: ['Guias e apurações', 'Notas fiscais', 'Simples Nacional', 'Obrigações fiscais'],
  },
  {
    id: 'trabalhista',
    icon: BriefcaseBusiness,
    eyebrow: 'Equipe e folha',
    title: 'Departamento pessoal e trabalhista',
    description:
      'Apoio para empresas com equipe, admissões, desligamentos, folha de pagamento e obrigações trabalhistas.',
    shortDescription:
      'Folha, admissões, desligamentos e obrigações trabalhistas.',
    items: ['Folha de pagamento', 'Admissões', 'Desligamentos', 'Obrigações trabalhistas'],
  },
  {
    id: 'regularizacao',
    icon: ShieldAlert,
    eyebrow: 'Pendências e ajustes',
    title: 'Regularização e pendências',
    description:
      'Quando existem atrasos, dúvidas cadastrais ou pendências, a CF ajuda a organizar o cenário e indicar os próximos passos.',
    shortDescription:
      'Pendências fiscais, CNPJ irregular, ajustes e próximos passos.',
    items: ['Pendências fiscais', 'CNPJ irregular', 'Ajustes cadastrais', 'Orientação sobre próximos passos'],
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef([]);

  const activeStage = serviceStages[activeIndex];
  const ActiveIcon = activeStage.icon;
  const progress = ((activeIndex + 1) / serviceStages.length) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveIndex(Number(visibleEntry.target.dataset.index));
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.6],
      }
    );

    stageRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const goToStage = (index) => {
    const safeIndex = Math.max(0, Math.min(index, serviceStages.length - 1));
    stageRefs.current[safeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveIndex(safeIndex);
  };

  const handleNext = () => {
    if (activeIndex < serviceStages.length - 1) {
      goToStage(activeIndex + 1);
      return;
    }

    window.location.href = '/diagnostico';
  };

  return (
    <section id="servicos" className="relative overflow-hidden bg-[#F4F8FB] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-sky-300/12 blur-3xl" />
      <div className="absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-white/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Acompanhamento contábil"
            title="Como a CF acompanha a rotina da sua empresa"
            description="Da abertura à rotina mensal, a CF ajuda a organizar prazos, documentos, impostos e pendências para que sua empresa tenha mais clareza no dia a dia."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal as="aside">
            <div className="rounded-[1.8rem] border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/7 backdrop-blur md:p-7 lg:sticky lg:top-28">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0369A1]">
                  <FileSearch className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-[#F4F8FB] px-3 py-1 text-xs font-extrabold text-[#173D5A]">
                  {String(activeIndex + 1).padStart(2, '0')} de {String(serviceStages.length).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0369A1]">
                etapa atual
              </p>

              <div className="mt-3 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#173D5A] to-[#0369A1] text-white shadow-lg shadow-sky-900/18">
                  <ActiveIcon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold leading-tight text-[#0F172A]">
                    {activeStage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {activeStage.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#64748B]">
                  <span>Progresso da leitura</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#E8F0F6]">
                  <motion.div
                    className="h-full rounded-full bg-[#0077B6]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-5 gap-2" aria-label="Etapas da seção de serviços">
                {serviceStages.map((stage, index) => {
                  const isActive = activeIndex === index;
                  const isDone = index < activeIndex;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => goToStage(index)}
                      className={`h-9 rounded-full text-xs font-extrabold transition duration-300 ${
                        isActive
                          ? 'bg-[#173D5A] text-white shadow-lg shadow-sky-900/15'
                          : isDone
                            ? 'bg-sky-50 text-[#0369A1]'
                            : 'bg-[#F4F8FB] text-[#64748B] hover:bg-sky-50 hover:text-[#0369A1]'
                      }`}
                      aria-label={`Ir para ${stage.title}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#0077B6] px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-sky-900/18 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0369A1]"
              >
                {activeIndex < serviceStages.length - 1 ? 'Próxima etapa' : 'Fazer diagnóstico'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <div className="mt-5 rounded-2xl bg-[#F4F8FB] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0077B6]" />
                  <p className="text-sm leading-relaxed text-[#475569]">
                    A ideia é entender o momento da empresa e organizar o próximo passo com clareza.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-7 top-4 hidden h-[calc(100%-2rem)] w-px bg-[#CBDDE8] md:block" />

            <div className="space-y-5">
              {serviceStages.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeIndex === index;

                return (
                  <Reveal key={service.id} delay={index * 0.04} as="article">
                    <motion.div
                      id={service.id}
                      ref={(element) => {
                        stageRefs.current[index] = element;
                      }}
                      data-index={index}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative scroll-mt-28 rounded-[1.7rem] border p-6 transition duration-300 md:p-7 ${
                        isActive
                          ? 'border-sky-200 bg-white shadow-2xl shadow-slate-900/10'
                          : 'border-white/80 bg-white/70 shadow-lg shadow-slate-900/5'
                      }`}
                    >
                      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#173D5A] to-[#0369A1] text-white shadow-lg shadow-sky-900/18">
                          <Icon className="h-7 w-7" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0369A1]">
                              {service.eyebrow}
                            </p>
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-extrabold text-[#173D5A]">
                              etapa {index + 1}
                            </span>
                          </div>

                          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#0F172A]">
                            {service.title}
                          </h3>

                          <p className="mt-3 leading-relaxed text-[#475569]">
                            {service.description}
                          </p>

                          <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {service.items.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2 rounded-xl bg-[#F4F8FB] px-3 py-2 text-sm font-bold text-[#475569]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0077B6]" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal>
          <div className="mt-8 rounded-[1.6rem] border border-sky-900/10 bg-gradient-to-r from-[#173D5A] to-[#0F2F46] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                  próximo passo
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">
                  Entenda onde sua empresa está antes de decidir o que precisa ajustar.
                </h3>
              </div>

              <a
                href="/diagnostico"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#173D5A] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
              >
                Fazer diagnóstico
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
