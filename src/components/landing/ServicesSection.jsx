import { motion } from 'framer-motion';
import {
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
SERVIÇOS — ORGANIZADOS POR MOMENTO
============================================================
Esta seção substitui a lista genérica por uma jornada.
Cada bloco tem um id para links diretos:
- /servicos#abertura
- /servicos#rotina
- /servicos#impostos
- /servicos#trabalhista
- /servicos#regularizacao
============================================================
*/

const serviceJourneys = [
  {
    id: 'abertura',
    icon: Building2,
    eyebrow: 'Começando ou ajustando',
    title: 'Abertura e regularização de empresa',
    description:
      'Para quem quer abrir, ajustar ou estruturar o CNPJ com mais segurança desde o início.',
    items: ['Abertura de CNPJ', 'Alterações contratuais', 'Enquadramento inicial', 'Organização cadastral'],
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    eyebrow: 'Dia a dia contábil',
    title: 'Rotina contábil mensal',
    description:
      'Para empresas que precisam manter documentos, prazos e obrigações em ordem sem depender da correria.',
    items: ['Organização de documentos', 'Acompanhamento mensal', 'Relatórios e informações', 'Previsibilidade da rotina'],
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    eyebrow: 'Fiscal e tributário',
    title: 'Impostos, notas e obrigações fiscais',
    description:
      'Para entender melhor o que está sendo pago, quando deve ser pago e quais cuidados fiscais precisam de atenção.',
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
      'Para empresas que acumulam atrasos, dúvidas cadastrais, documentos pendentes ou riscos que precisam ser organizados.',
    items: ['Pendências fiscais', 'CNPJ irregular', 'Ajustes cadastrais', 'Orientação sobre próximos passos'],
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-[#e8f0f6] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />
      <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-sky-300/22 blur-3xl" />
      <div className="absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-white/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Áreas atendidas"
            title="O que a CF organiza na prática"
            description="Em vez de uma lista solta de serviços, a página mostra onde a contabilidade entra na rotina da empresa."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal as="aside">
            <div className="sticky top-28 rounded-[1.8rem] border border-white/80 bg-white/78 p-6 shadow-xl shadow-slate-900/7 backdrop-blur md:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <FileText className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold leading-tight text-slate-950">
                Serviço contábil bom não aparece só quando existe problema.
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                Ele organiza a empresa antes da urgência: documentos, prazos, impostos,
                equipe, regularidade e decisões que afetam o crescimento.
              </p>

              <div className="mt-6 space-y-3">
                {['clareza para decidir', 'rotina com acompanhamento', 'menos risco de surpresa'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f7fbfe] p-4 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-800" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            {serviceJourneys.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.id} delay={index * 0.04} as="article">
                  <motion.div
                    id={service.id}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="scroll-mt-28 rounded-[1.7rem] border border-white/80 bg-white/84 p-6 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:border-sky-200 md:p-7"
                  >
                    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-800 to-sky-600 text-white shadow-lg shadow-sky-900/20">
                        <Icon className="h-7 w-7" />
                      </div>

                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-700">
                          {service.eyebrow}
                        </p>

                        <h3 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">
                          {service.title}
                        </h3>

                        <p className="mt-3 leading-relaxed text-slate-600">
                          {service.description}
                        </p>

                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          {service.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 rounded-xl bg-[#f7fbfe] px-3 py-2 text-sm font-bold text-slate-700"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-700" />
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

            <Reveal>
              <div className="rounded-[1.6rem] border border-sky-900/10 bg-gradient-to-r from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                      O ponto central
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold">
                      A contabilidade precisa acompanhar a rotina, não apenas apagar incêndio.
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
                    <RefreshCcw className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
