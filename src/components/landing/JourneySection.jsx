import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  ClipboardCheck,
  FileQuestion,
  MessageCircle,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';

/*
============================================================
JORNADA DA EMPRESA
============================================================
Esta seção não nichou a CF.
Ela organiza o site a partir das dores reais do empresário.
============================================================
*/

const journeys = [
  {
    icon: Building2,
    title: 'Quero abrir ou regularizar minha empresa sem começar errado',
    description:
      'Para quem precisa estruturar CNPJ, enquadramento, documentos e primeiros passos com mais segurança.',
    action: 'Ver abertura e regularização',
    to: '/servicos#abertura',
  },
  {
    icon: ClipboardCheck,
    title: 'Minha rotina contábil está espalhada e eu preciso organizar',
    description:
      'Para empresas que vivem com documentos atrasados, prazos confusos, guias na correria e pouca previsibilidade.',
    action: 'Ver rotina contábil',
    to: '/servicos#rotina',
  },
  {
    icon: BadgeDollarSign,
    title: 'Pago impostos, mas não entendo se está tudo correto',
    description:
      'Para quem quer entender melhor regime tributário, guias, Simples Nacional, obrigações e pontos de atenção.',
    action: 'Ler sobre impostos',
    to: '/blog?jornada=impostos-e-enquadramento',
  },
  {
    icon: FileQuestion,
    title: 'Não sei exatamente qual é o problema, só sei que preciso de clareza',
    description:
      'Para quem prefere organizar o contexto primeiro e enviar as informações para uma orientação mais objetiva.',
    action: 'Fazer diagnóstico',
    type: 'diagnostic',
  },
];

export default function JourneySection({ navigate, onStartQuiz }) {
  function handleClick(journey) {
    if (journey.type === 'diagnostic') {
      onStartQuiz();
      return;
    }

    navigate(journey.to);
  }

  return (
    <section className="relative overflow-hidden bg-[#e8f0f6] px-5 py-18 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-sky-400/12 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/55 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Escolha o melhor caminho"
            title="Cada empresa chega até a contabilidade por um motivo diferente."
            description="O site da CF agora organiza a navegação por momento: abrir, organizar, entender impostos ou conversar com mais clareza."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {journeys.map((journey, index) => {
            const Icon = journey.icon;

            return (
              <motion.article
                key={journey.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group flex h-full flex-col rounded-[1.7rem] border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800 transition duration-300 group-hover:bg-sky-800 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-extrabold leading-tight text-slate-950">
                  {journey.title}
                </h3>

                <p className="mt-3 flex-1 leading-relaxed text-slate-600">
                  {journey.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleClick(journey)}
                  className="mt-6 inline-flex items-center text-left text-sm font-extrabold text-sky-800 transition duration-300 group-hover:text-sky-600"
                >
                  {journey.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-sky-900/10 bg-gradient-to-r from-[#173d5a] to-[#226281] p-6 text-white shadow-2xl shadow-slate-900/12 md:p-7">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-sky-100">
              <MessageCircle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
                Frase central da jornada
              </p>
              <p className="mt-1 text-lg font-extrabold md:text-xl">
                A CF ajuda empresas a transformar obrigações contábeis em uma rotina mais clara, organizada e segura.
              </p>
            </div>

            <button
              type="button"
              onClick={onStartQuiz}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-900 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
            >
              Fazer diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
