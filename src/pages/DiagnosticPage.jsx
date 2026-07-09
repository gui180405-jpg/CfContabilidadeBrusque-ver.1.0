import { motion } from 'framer-motion';
import {
  ArrowDown,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import QuizSection from '../components/landing/QuizSection';

const highlights = [
  '4 perguntas rápidas',
  'Informações organizadas',
  'Envio direto pelo WhatsApp',
];

export default function DiagnosticPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-8 pt-32 md:px-8 md:pb-10 md:pt-36">
        <div className="absolute inset-0 cf-subtle-grid opacity-45" />
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-sky-500/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#dfeaf2] via-[#dfeaf2]/88 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/76 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
              <ClipboardList className="h-4 w-4" />
              Diagnóstico contábil
            </div>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              Organize o contexto da sua empresa antes de falar com a CF.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
              Responda algumas perguntas rápidas. Ao final, suas respostas serão enviadas pelo WhatsApp para facilitar uma orientação inicial mais objetiva.
            </p>

            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/72 px-4 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-800" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-9 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-900/8 px-4 py-2 text-sm font-bold text-sky-900">
                Comece abaixo
                <ArrowDown className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <QuizSection />

      <section className="bg-[#dfeaf2] px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-4xl rounded-[1.7rem] border border-sky-900/10 bg-white/72 p-6 shadow-xl shadow-slate-900/6 backdrop-blur md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-950">
                  Sem compromisso
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  O diagnóstico serve para organizar o primeiro contato e facilitar uma orientação inicial.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-950">
                  Conversa mais objetiva
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  As respostas chegam organizadas no WhatsApp para a CF entender melhor o seu momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
