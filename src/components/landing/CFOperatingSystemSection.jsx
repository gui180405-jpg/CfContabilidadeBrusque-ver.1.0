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
    tone: 'bg-sky-50 text-sky-800',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fiscal e impostos',
    description: 'notas, guias e apurações',
    tone: 'bg-emerald-50 text-emerald-700',
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
    <section className="relative overflow-hidden bg-[#eef1f4] px-5 py-18 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/76 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sky-700 shadow-[0_0_14px_rgba(3,105,161,0.55)]" />
            novo jeito de apresentar
          </div>

          <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
            A CF como centro de organização da rotina empresarial.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-650">
            Em vez de mostrar apenas uma lista de serviços, a página passa a mostrar
            como cada área se conecta: empresa, impostos, equipe, documentos e decisões.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {['menos ruído', 'mais direção', 'mais confiança'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-sky-800" />
                <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-700">
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
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/82 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
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
          <div className="absolute inset-0 rounded-[3rem] bg-sky-900/8 blur-3xl" />

          <div className="absolute left-0 top-0 w-full max-w-[590px] rounded-[2rem] border border-white/80 bg-white/78 p-5 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                  mapa da rotina
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-950">
                  Áreas que se conectam
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-extrabold text-sky-800">
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
                    className="rounded-2xl border border-slate-200/70 bg-[#f7fbfe] p-4"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${module.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-extrabold text-slate-950">
                      {module.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {module.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="absolute -bottom-3 left-6 z-20 w-[320px] rounded-[1.8rem] border border-sky-900/10 bg-gradient-to-br from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/18 md:w-[360px]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
                  trilha mensal
                </p>
                <p className="font-extrabold">do recebimento à orientação</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {timeline.map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/14 text-xs font-extrabold">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-16 right-0 z-30 w-[270px] rounded-[1.7rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-950">
                  Conversa mais objetiva
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
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
