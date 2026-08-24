import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import Reveal from '../common/Reveal';

/*
============================================================
SERVIÇOS — MAPA DA ROTINA CONTÁBIL
============================================================

Conceito final:
A CF organiza a rotina contábil, fiscal, trabalhista e societária
das empresas para que elas tenham mais clareza, previsibilidade
e segurança para crescer.

Direção visual:
- sem órbita;
- sem sistema solar;
- sem ícones soltos;
- fundo azul profundo;
- bloco institucional forte;
- áreas organizadas com leitura clara;
- motion suave e útil.
============================================================
*/

const serviceAreas = [
  {
    id: 'abertura',
    icon: Building2,
    label: 'Abertura',
    eyebrow: 'começando ou ajustando',
    title: 'Abertura e regularização de empresa',
    description:
      'A CF orienta a estrutura inicial da empresa, ajudando a organizar CNPJ, enquadramento, alterações e cadastros para começar com mais segurança.',
    items: [
      'abertura de CNPJ',
      'alterações contratuais',
      'enquadramento inicial',
      'organização cadastral',
    ],
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    label: 'Rotina mensal',
    eyebrow: 'dia a dia contábil',
    title: 'Rotina contábil mensal',
    description:
      'Acompanhamento dos documentos, prazos, relatórios e informações que sustentam a rotina da empresa ao longo do mês.',
    items: [
      'organização de documentos',
      'acompanhamento mensal',
      'relatórios e informações',
      'previsibilidade da rotina',
    ],
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    label: 'Impostos',
    eyebrow: 'fiscal e tributário',
    title: 'Fiscal, impostos e notas',
    description:
      'Acompanhamento de guias, apurações, notas fiscais, Simples Nacional e obrigações fiscais para trazer mais clareza sobre o que está sendo pago.',
    items: [
      'guias e apurações',
      'notas fiscais',
      'Simples Nacional',
      'obrigações fiscais',
    ],
  },
  {
    id: 'trabalhista',
    icon: BriefcaseBusiness,
    label: 'Equipe',
    eyebrow: 'departamento pessoal',
    title: 'Departamento pessoal e trabalhista',
    description:
      'Organização das rotinas de folha, admissões, desligamentos e obrigações trabalhistas para empresas com equipe ou em fase de contratação.',
    items: [
      'folha de pagamento',
      'admissões',
      'desligamentos',
      'obrigações trabalhistas',
    ],
  },
  {
    id: 'regularizacao',
    icon: ShieldAlert,
    label: 'Pendências',
    eyebrow: 'ajustes e regularidade',
    title: 'Regularização e pendências',
    description:
      'Apoio para organizar atrasos, pendências fiscais, CNPJ irregular, ajustes cadastrais e próximos passos para voltar à rotina com mais segurança.',
    items: [
      'pendências fiscais',
      'CNPJ irregular',
      'ajustes cadastrais',
      'orientação sobre próximos passos',
    ],
  },
];

const routinePoints = [
  'documentos em ordem',
  'prazos acompanhados',
  'impostos com clareza',
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeArea = serviceAreas[activeIndex];
  const ActiveIcon = activeArea.icon;

  const handleNextArea = () => {
    setActiveIndex((current) => (current + 1) % serviceAreas.length);
  };

  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-[#0F2F46] px-5 py-20 text-white md:px-8 md:py-24"
    >
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-400/14 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#0077B6]/14 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(14,165,233,0.1),transparent_26%)]" />

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
              A contabilidade conecta documentos, impostos, prazos, equipe e
              regularização para que a empresa tenha mais clareza no dia a dia.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/14 bg-white/8 p-6 shadow-2xl shadow-black/18 backdrop-blur-xl md:p-8">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-300/12 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/8 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                  <FileText className="h-7 w-7" />
                </div>

                <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-sky-200">
                  mapa de acompanhamento
                </p>

                <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  Rotina contábil organizada
                </h3>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-sky-100/80">
                  A CF organiza a rotina contábil, fiscal, trabalhista e
                  societária das empresas para que elas tenham mais clareza,
                  previsibilidade e segurança para crescer.
                </p>

                <div className="mt-8 grid gap-3">
                  {routinePoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-bold text-sky-50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-300/16 text-sky-200">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      {point}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <div className="rounded-[1.4rem] border border-sky-200/14 bg-[#173D5A]/70 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                        <Sparkles className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-extrabold text-white">
                          Não é só cumprir obrigação.
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-sky-100/72">
                          É acompanhar o que sustenta a empresa antes que a
                          rotina vire urgência.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid h-full gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {serviceAreas.map((area, index) => {
                  const Icon = area.icon;
                  const isActive = index === activeIndex;

                  return (
                    <motion.button
                      key={area.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                      className={`group rounded-[1.5rem] border p-5 text-left shadow-xl backdrop-blur transition duration-300 ${
                        isActive
                          ? 'border-sky-200/70 bg-white text-[#0F172A] shadow-sky-950/24'
                          : 'border-white/12 bg-white/8 text-white shadow-black/10 hover:border-sky-200/40 hover:bg-white/12'
                      }`}
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 ${
                            isActive
                              ? 'bg-[#0077B6] text-white'
                              : 'bg-white/10 text-sky-100 group-hover:bg-white/16'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>

                        <span
                          className={`text-xs font-extrabold ${
                            isActive ? 'text-[#0369A1]' : 'text-sky-200/80'
                          }`}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <p
                        className={`text-xs font-extrabold uppercase tracking-[0.18em] ${
                          isActive ? 'text-[#0369A1]' : 'text-sky-200/75'
                        }`}
                      >
                        {area.eyebrow}
                      </p>

                      <h3 className="mt-2 text-lg font-extrabold leading-tight">
                        {area.label}
                      </h3>
                    </motion.button>
                  );
                })}
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/14 bg-[#173D5A]/74 shadow-2xl shadow-black/18 backdrop-blur-xl">
                <div className="border-b border-white/10 p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                        detalhe da área
                      </p>
                      <p className="mt-2 text-sm font-bold text-sky-100/75">
                        Área {String(activeIndex + 1).padStart(2, '0')} de{' '}
                        {String(serviceAreas.length).padStart(2, '0')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {serviceAreas.map((area, index) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === activeIndex
                              ? 'w-8 bg-sky-300'
                              : 'w-2.5 bg-white/22 hover:bg-white/45'
                          }`}
                          aria-label={`Ir para ${area.title}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeArea.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                        <ActiveIcon className="h-7 w-7" />
                      </div>

                      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-200">
                        {activeArea.eyebrow}
                      </p>

                      <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                        {activeArea.title}
                      </h3>

                      <p className="mt-5 text-lg leading-relaxed text-sky-100/82">
                        {activeArea.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {activeArea.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-bold text-sky-50"
                          >
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleNextArea}
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
