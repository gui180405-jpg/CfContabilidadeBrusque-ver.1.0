import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  MessageSquareText,
} from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';

/*
============================================================
CF OPERATING SYSTEM SECTION
============================================================
Ideia visual:
contabilidade como sistema de organização da empresa.
Não é software; é uma forma visual de mostrar método e rotina.
============================================================
*/

const modules = [
  {
    icon: Building2,
    title: 'CNPJ e cadastro',
    description: 'abertura, alterações e regularidade',
    tone: 'bg-cf-soft text-cf-blue',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fiscal e impostos',
    description: 'notas, guias e apurações',
    tone: 'bg-cf-soft text-cf-blue',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Equipe',
    description: 'folha, admissões e rotina trabalhista',
    tone: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: FileText,
    title: 'Documentos',
    description: 'informações organizadas para decidir',
    tone: 'bg-amber-50 text-amber-700',
  },
];

const timeline = [
  'Receber informações',
  'Conferir documentos',
  'Organizar obrigações',
  'Orientar próximos passos',
];

export default function CFOperatingSystemSection({ onStartQuiz, navigate }) {
  return (
    <section className="relative overflow-hidden bg-cf-background px-5 py-18 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-cf-blue/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cf-border bg-white px-4 py-2 text-sm font-bold text-cf-blue-dark shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cf-blue shadow-[0_0_14px_rgba(3,105,161,0.55)]" />
            novo jeito de apresentar
          </div>

          <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-cf-navy md:text-5xl">
            A CF como centro de organização da rotina empresarial.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cf-text">
            Em vez de mostrar apenas uma lista de serviços, a página passa a mostrar
            como cada área se conecta: empresa, impostos, equipe, documentos e decisões.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {['menos ruído', 'mais direção', 'mais confiança'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/80 bg-white p-4 shadow-lg shadow-cf-navy/5 backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-cf-blue" />
                <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.16em] text-cf-text">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton onClick={onStartQuiz}>
              Fazer diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>

            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center justify-center rounded-xl border border-cf-border bg-white px-6 py-3.5 text-sm font-bold text-cf-text shadow-lg shadow-cf-navy/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-cf-blue hover:text-cf-blue-dark md:text-base"
            >
              Ver conteúdos
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[570px]"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-cf-blue/10 blur-3xl" />

          <div className="absolute left-0 top-0 w-full max-w-[590px] rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-cf-navy/10 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cf-blue">
                  mapa da rotina
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-cf-navy">
                  Áreas que se conectam
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-cf-soft px-4 py-2 text-sm font-extrabold text-cf-blue">
                <BellRing className="h-4 w-4" />
                acompanhamento
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 + index * 0.08 }}
                    className="rounded-2xl border border-cf-border bg-cf-background p-4"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${module.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-extrabold text-cf-navy">
                      {module.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cf-muted">
                      {module.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="absolute -bottom-3 left-6 z-20 w-[320px] rounded-[1.8rem] border border-cf-border bg-cf-navy p-6 text-white shadow-2xl shadow-cf-navy/20 md:w-[360px]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cf-on-dark">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cf-on-dark">
                  trilha mensal
                </p>
                <p className="font-extrabold">do recebimento à orientação</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {timeline.map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-extrabold">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-cf-on-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-16 right-0 z-30 w-[270px] rounded-[1.7rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-cf-navy/10 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cf-soft text-cf-blue">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold text-cf-navy">
                  Conversa mais objetiva
                </p>
                <p className="mt-1 text-sm leading-relaxed text-cf-muted">
                  o diagnóstico chega com contexto, não só com uma dúvida solta.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
