import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  ClipboardCheck,
  FileQuestion,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';

const journeys = [
  {
    icon: Building2,
    title: 'Abrir ou regularizar empresa',
    description: 'CNPJ, enquadramento, alterações e primeiros passos.',
    href: '/servicos#abertura',
  },
  {
    icon: ClipboardCheck,
    title: 'Organizar rotina contábil',
    description: 'Documentos, prazos, guias e obrigações mensais.',
    href: '/servicos#rotina',
  },
  {
    icon: BadgeDollarSign,
    title: 'Entender impostos',
    description: 'Regime tributário, Simples Nacional, guias e obrigações.',
    href: '/blog?jornada=impostos-e-enquadramento',
  },
  {
    icon: FileQuestion,
    title: 'Começar pelo diagnóstico',
    description: 'Organize o contexto antes da conversa com a CF.',
    diagnostic: true,
  },
];

export default function JourneySection({ onStartQuiz }) {
  return (
    <section className="relative overflow-hidden bg-cf-background px-5 py-20 md:px-8 md:py-24">
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-cf-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Caminhos de atendimento"
            title="Escolha o ponto de partida da sua empresa."
            description="A navegação fica mais simples quando cada caminho leva a uma necessidade real."
          />
        </Reveal>

        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-xl shadow-cf-navy/10 backdrop-blur">
          {journeys.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === journeys.length - 1;

            const content = (
              <div className={`grid gap-4 p-5 transition duration-300 hover:bg-cf-background md:grid-cols-[auto_1fr_auto] md:items-center md:p-6 ${!isLast ? 'border-b border-cf-border' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cf-soft text-cf-blue">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-cf-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-cf-muted">
                    {item.description}
                  </p>
                </div>

                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cf-background text-cf-blue">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            );

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                {item.diagnostic ? (
                  <button type="button" onClick={onStartQuiz} className="block w-full text-left">
                    {content}
                  </button>
                ) : (
                  <a href={item.href} className="block">
                    {content}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
