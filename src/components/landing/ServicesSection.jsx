import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  RefreshCcw,
  ShieldAlert,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';

/*
============================================================
SERVIÇOS — TRILHA COM PRÓXIMA ETAPA
============================================================
Função:
- transformar a seção em uma jornada guiada;
- reduzir sensação de lista estática;
- conduzir o olhar com etapa ativa e botão Próxima etapa.
============================================================
*/

const serviceJourneys = [
  {
    id: 'abertura',
    icon: Building2,
    eyebrow: 'Começando ou ajustando',
    title: 'Abertura e regularização de empresa',
    description:
      'Para abrir, ajustar ou regularizar o CNPJ com documentação e enquadramento mais organizados.',
    items: ['Abertura de CNPJ', 'Alterações contratuais', 'Enquadramento inicial', 'Organização cadastral'],
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    eyebrow: 'Dia a dia contábil',
    title: 'Rotina contábil mensal',
    description:
      'Para manter documentos, prazos e obrigações em ordem sem depender da correria.',
    items: ['Organização de documentos', 'Acompanhamento mensal', 'Relatórios e informações', 'Previsibilidade da rotina'],
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    eyebrow: 'Fiscal e tributário',
    title: 'Impostos, notas e obrigações fiscais',
    description:
      'Para acompanhar o que está sendo pago, quando deve ser pago e quais cuidados exigem atenção.',
    items: ['Guias e apurações', 'Notas fiscais', 'Simples Nacional', 'Obrigações fiscais'],
  },
  {
    id: 'trabalhista',
    icon: BriefcaseBusiness,
    eyebrow: 'Equipe e folha',
    title: 'Departamento pessoal e trabalhista',
    description:
      'Para empresas com funcionários ou em fase de contratação que precisam de segurança nas rotinas de pessoal.',
    items: ['Folha de pagamento', 'Admissões', 'Desligamentos', 'Obrigações trabalhistas'],
  },
  {
    id: 'regularizacao',
    icon: ShieldAlert,
    eyebrow: 'Pendências e ajustes',
    title: 'Regularização e acompanhamento de pendências',
    description:
      'Para organizar atrasos, dúvidas cadastrais, documentos pendentes ou riscos que precisam de atenção.',
    items: ['Pendências fiscais', 'CNPJ irregular', 'Ajustes cadastrais', 'Orientação sobre próximos passos'],
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const activeStep = serviceJourneys[activeIndex];
  const progress = ((activeIndex + 1) / serviceJourneys.length) * 100;

  function goToStep(index) {
    const safeIndex = Math.max(0, Math.min(index, serviceJourneys.length - 1));
    setActiveIndex(safeIndex);

    const target = stepRefs.current[safeIndex];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function goNextStep() {
    if (activeIndex < serviceJourneys.length - 1) {
      goToStep(activeIndex + 1);
      return;
    }

    const target = document.getElementById('proximo-passo-servicos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  const ActiveIcon = activeStep.icon;
  const isLastStep = activeIndex === serviceJourneys.length - 1;

  return (
    <section id="servicos" className="relative overflow-hidden bg-[#F4F8FB] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-sky-300/12 blur-3xl" />
      <div className="absolute -left-28 bottom-20 h-80 w-80 rounded-full bg-white/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Áreas atendidas"
            title="Como a CF acompanha a rotina da sua empresa"
            description="A contabilidade entra em diferentes momentos: abertura, rotina mensal, impostos, equipe e regularização. Avance pelas etapas para entender a sequência."
          />
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal as="aside">
            <div className="rounded-[1.8rem] border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/7 backdrop-blur md:p-7 lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0369A1]">
                  <ActiveIcon className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-[#E8F0F6] px-3 py-1 text-xs font-extrabold text-[#173D5A]">
                  {activeIndex + 1} de {serviceJourneys.length}
                </span>
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#0369A1]">
                etapa atual
              </p>

              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#0F172A]">
                {activeStep.title}
              </h3>

              <p className="mt-4 leading-relaxed text-[#475569]">
                {activeStep.description}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#64748B]">
                  <span>Progresso da rotina</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8F0F6]">
                  <motion.div
                    className="h-full rounded-full bg-[#0077B6]"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {serviceJourneys.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goToStep(index)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition duration-300 ${
                      activeIndex === index
                        ? 'bg-[#173D5A] text-white shadow-lg shadow-slate-900/12'
                        : 'bg-[#F4F8FB] text-[#475569] hover:bg-sky-50 hover:text-[#0369A1]'
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                      activeIndex === index ? 'bg-white text-[#173D5A]' : 'bg-white text-[#0369A1]'
                    }`}>
                      {index + 1}
                    </span>
                    {step.title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goNextStep}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#0077B6] px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-sky-900/14 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0369A1]"
              >
                {isLastStep ? 'Ir para o próximo passo' : 'Próxima etapa'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </Reveal>

          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/78 shadow-xl shadow-slate-900/7 backdrop-blur">
            <div className="absolute left-[34px] top-8 hidden h-[calc(100%-4rem)] w-px bg-[#CBDDE8] md:block" />
            <motion.div
              className="absolute left-[34px] top-8 hidden w-px bg-[#0077B6] md:block"
              initial={false}
              animate={{ height: `calc((100% - 4rem) * ${activeIndex / Math.max(serviceJourneys.length - 1, 1)})` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            {serviceJourneys.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeIndex === index;
              const isLast = index === serviceJourneys.length - 1;

              return (
                <motion.article
                  key={service.id}
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  id={service.id}
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ amount: 0.55, margin: '-20% 0px -20% 0px' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className={`relative scroll-mt-28 p-6 transition duration-300 md:p-7 ${!isLast ? 'border-b border-slate-200/70' : ''} ${
                    isActive ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                    <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#173D5A] to-[#0369A1] shadow-sky-900/18'
                        : 'bg-[#173D5A]/75 shadow-slate-900/10'
                    }`}>
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0369A1]">
                          {service.eyebrow}
                        </p>
                        <span className={`rounded-full px-3 py-1 text-xs font-extrabold transition duration-300 ${
                          isActive ? 'bg-[#E8F0F6] text-[#173D5A]' : 'bg-slate-100 text-[#64748B]'
                        }`}>
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
                </motion.article>
              );
            })}
          </div>
        </div>

        <Reveal>
          <div id="proximo-passo-servicos" className="mt-8 rounded-[1.6rem] border border-sky-900/10 bg-gradient-to-r from-[#173D5A] to-[#0F2F46] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                  próximo passo
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">
                  Entenda onde sua empresa está antes de decidir o que precisa ajustar.
                </h3>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
                <RefreshCcw className="h-6 w-6" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
