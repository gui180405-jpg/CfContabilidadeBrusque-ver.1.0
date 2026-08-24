import { motion } from 'framer-motion';
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
SERVIÇOS — EDITORIAL PREMIUM
============================================================

Conceito final:
Serviços não devem parecer dashboard, painel, ciclo ou app.
A página deve apresentar, com clareza e autoridade, as áreas que
a CF organiza na rotina empresarial.

Direção visual:
- bloco escuro premium;
- menos cards pequenos;
- menos interação;
- mais respiro;
- numeração editorial;
- leitura mais clara.
============================================================
*/

const services = [
  {
    id: 'abertura',
    icon: Building2,
    title: 'Abertura e regularização',
    description:
      'Estruturação inicial da empresa, CNPJ, enquadramento, alterações e organização cadastral para começar ou ajustar o negócio com mais segurança.',
    items: ['abertura de CNPJ', 'alterações contratuais', 'enquadramento inicial', 'organização cadastral'],
  },
  {
    id: 'rotina',
    icon: ClipboardCheck,
    title: 'Rotina contábil mensal',
    description:
      'Acompanhamento dos documentos, prazos, relatórios e informações que sustentam a rotina da empresa ao longo do mês.',
    items: ['organização de documentos', 'acompanhamento mensal', 'relatórios e informações', 'previsibilidade da rotina'],
  },
  {
    id: 'impostos',
    icon: BadgeDollarSign,
    title: 'Fiscal, impostos e notas',
    description:
      'Apuração de guias, acompanhamento de notas fiscais, Simples Nacional e obrigações fiscais para trazer mais clareza sobre o que está sendo pago.',
    items: ['guias e apurações', 'notas fiscais', 'Simples Nacional', 'obrigações fiscais'],
  },
  {
    id: 'trabalhista',
    icon: BriefcaseBusiness,
    title: 'Departamento pessoal e trabalhista',
    description:
      'Organização das rotinas de folha, admissões, desligamentos e obrigações trabalhistas para empresas com equipe ou em fase de contratação.',
    items: ['folha de pagamento', 'admissões', 'desligamentos', 'obrigações trabalhistas'],
  },
  {
    id: 'regularizacao',
    icon: ShieldAlert,
    title: 'Regularização e pendências',
    description:
      'Apoio para organizar atrasos, pendências fiscais, CNPJ irregular, ajustes cadastrais e próximos passos para voltar à rotina com mais segurança.',
    items: ['pendências fiscais', 'CNPJ irregular', 'ajustes cadastrais', 'orientação sobre próximos passos'],
  },
];

const pillars = [
  'documentos em ordem',
  'prazos acompanhados',
  'decisões com mais clareza',
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-[#0F2F46] px-5 py-20 text-white md:px-8 md:py-24">
      <div className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-sky-400/14 blur-3xl" />
      <div className="absolute -right-36 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#0077B6]/14 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.06),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(14,165,233,0.1),transparent_26%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-sky-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              Áreas atendidas
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              A CF organiza as áreas que sustentam a rotina da empresa.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-sky-100/82">
              Da abertura ao acompanhamento mensal, a contabilidade ajuda a manter
              documentos, prazos, impostos, equipe e pendências em ordem.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <aside className="rounded-[2rem] border border-white/14 bg-white/8 p-6 shadow-2xl shadow-black/18 backdrop-blur-xl md:p-8 lg:sticky lg:top-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                <FileText className="h-7 w-7" />
              </div>

              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-sky-200">
                rotina contábil organizada
              </p>

              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Clareza para acompanhar o que sustenta a empresa.
              </h3>

              <p className="mt-5 text-lg leading-relaxed text-sky-100/80">
                A CF organiza a rotina contábil, fiscal, trabalhista e societária
                para que sua empresa tenha mais previsibilidade e segurança para crescer.
              </p>

              <div className="mt-8 space-y-3">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 text-sm font-bold text-sky-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-300/16 text-sky-200">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {pillar}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.4rem] border border-sky-200/14 bg-[#173D5A]/70 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-white">
                      Não é só cumprir obrigação.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-sky-100/72">
                      É acompanhar a rotina antes que documentos, prazos e pendências
                      virem urgência.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/diagnostico"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#173D5A] shadow-xl shadow-black/12 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
              >
                Entender minha situação contábil
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </aside>
          </Reveal>

          <div className="space-y-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.id} delay={index * 0.04} as="article">
                  <motion.div
                    id={service.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.48 }}
                    className="scroll-mt-28 rounded-[1.7rem] border border-white/14 bg-white/[0.07] p-6 shadow-xl shadow-black/12 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200/34 hover:bg-white/[0.1] md:p-7"
                  >
                    <div className="grid gap-5 md:grid-cols-[auto_1fr]">
                      <div className="flex items-start gap-4 md:block">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#173D5A] shadow-xl shadow-black/12">
                          <Icon className="h-7 w-7" />
                        </div>

                        <span className="mt-4 hidden text-sm font-extrabold text-sky-200/70 md:block">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-3 md:hidden">
                          <span className="text-sm font-extrabold text-sky-200/70">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">
                          {service.title}
                        </h3>

                        <p className="mt-3 max-w-3xl text-base leading-relaxed text-sky-100/80 md:text-lg">
                          {service.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-sky-50"
                            >
                              {item}
                            </span>
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
    </section>
  );
}
