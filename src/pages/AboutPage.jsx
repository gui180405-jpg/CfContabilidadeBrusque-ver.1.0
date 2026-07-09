import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  MessageCircle,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import FounderSection from '../components/landing/FounderSection';
import CTASection from '../components/landing/CTASection';
import { site } from '../content/siteContent';

const culturePoints = [
  'Rotina contábil acompanhada de perto',
  'Equipe integrada nas áreas fiscal, contábil e trabalhista',
  'Comunicação clara para reduzir dúvidas e atrasos',
];

const workPillars = [
  {
    icon: ClipboardCheck,
    title: 'Organização da rotina',
    description:
      'Acompanhamos documentos, prazos e obrigações para que a empresa não dependa apenas da urgência.',
  },
  {
    icon: Eye,
    title: 'Clareza nas informações',
    description:
      'Traduzimos a rotina contábil em orientações mais compreensíveis para apoiar melhores decisões.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança para crescer',
    description:
      'Com uma base contábil mais organizada, o empresário ganha previsibilidade para ajustar, regularizar ou expandir.',
  },
];

function TeamCultureSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef1f4] px-5 py-18 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(14,116,144,0.09),transparent_34%)]" />
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/80 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <UsersRound className="h-4 w-4" />
            A CF por dentro
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            Uma contabilidade que acontece na rotina, não só no vencimento.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-650 md:text-xl">
            Por trás de cada guia, folha, obrigação e orientação existe uma equipe
            acompanhando detalhes, conferindo informações e organizando o caminho para
            que a empresa tenha mais segurança no dia a dia.
          </p>

          <div className="mt-7 space-y-3">
            {culturePoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/78 p-4 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-800" />
                <p className="font-semibold leading-relaxed text-slate-750">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={() => window.location.assign('/diagnostico')}>
              Analisar minha empresa
              <ArrowRight className="ml-2 h-5 w-5" />
            </PrimaryButton>

            <a
              href="/servicos"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
            >
              Conhecer serviços
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.25rem] bg-sky-900/8 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <img
              src="/cf-equipe-escritorio.webp"
              alt="Equipe da CF Contabilidade trabalhando no escritório"
              className="h-[360px] w-full rounded-[1.55rem] object-cover object-center md:h-[500px]"
            />

            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/18 bg-slate-950/72 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-300/16 text-sky-200">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
                    Estrutura real
                  </p>
                  <p className="mt-1 text-base font-semibold leading-relaxed text-white/92">
                    Atendimento próximo, ambiente organizado e equipe presente para acompanhar a rotina da sua empresa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkPillarsSection() {
  return (
    <section className="relative bg-[#e7edf2] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 md:grid-cols-3">
          {workPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                  {pillar.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-sky-900/10 bg-gradient-to-r from-[#173d5a] to-[#226281] p-7 text-white shadow-2xl shadow-slate-900/12 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                Nosso jeito de trabalhar
              </p>
              <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                Contabilidade com presença, responsabilidade e acompanhamento.
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-slate-200">
                A CF une experiência, rotina bem definida e atendimento próximo para transformar obrigações contábeis em uma base mais segura para a gestão da empresa.
              </p>
            </div>

            <a
              href={`https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-900 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50 md:text-base"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com a CF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ onStartQuiz }) {
  return (
    <>
      <PageHero
        eyebrow="Sobre a CF"
        title="Contabilidade próxima, organizada e comprometida com a rotina da sua empresa."
        description="A CF Contabilidade Brusque atua com foco em clareza, responsabilidade e acompanhamento próximo para empresas que precisam manter obrigações em dia e tomar decisões com segurança."
        image={site.officeImage}
      >
        <PrimaryButton onClick={onStartQuiz}>Conversar sobre minha empresa</PrimaryButton>
      </PageHero>

      <TeamCultureSection />
      <WorkPillarsSection />
      <FounderSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
