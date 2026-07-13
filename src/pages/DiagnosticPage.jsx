import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Eye,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import QuizSection from '../components/landing/QuizSection';
import { site } from '../content/siteContent';

const highlights = [
  '4 perguntas rápidas',
  'Informações organizadas',
  'Envio direto pelo WhatsApp',
];

const consultivePoints = [
  'Entendimento do momento atual da empresa',
  'Organização das principais dúvidas e informações',
  'Orientação inicial mais objetiva para o próximo passo',
];

function DiagnosticSupportSection() {
  const whatsappUrl = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 py-12 md:px-8 md:py-16">
      <div className="absolute inset-0 cf-subtle-grid opacity-35" />
      <div className="absolute left-0 top-10 h-80 w-80 rounded-full bg-sky-400/12 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/55 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/76 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <ClipboardCheck className="h-4 w-4" />
            Atendimento consultivo
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
            Você não precisa chegar na conversa sem saber por onde começar.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-700 md:text-xl">
            O diagnóstico ajuda a organizar o contexto da empresa antes do primeiro contato.
            Assim, a CF consegue entender melhor sua realidade e orientar com mais clareza.
          </p>

          <div className="mt-7 space-y-3">
            {consultivePoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-800" />
                <p className="font-semibold leading-relaxed text-slate-700">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#diagnostico"
              className="inline-flex items-center justify-center rounded-xl bg-sky-800 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-sky-900/18 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-700 md:text-base"
            >
              Começar diagnóstico
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/82 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
            >
              Falar direto com a CF
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.88, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-sky-900/8 blur-2xl transition duration-700 group-hover:bg-sky-900/14" />
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sky-300/18 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-2xl shadow-slate-900/12 backdrop-blur transition duration-700 group-hover:-translate-y-1 group-hover:scale-[1.018] group-hover:shadow-slate-900/18">
            <div className="relative overflow-hidden rounded-[1.55rem]">
              <motion.img
                src="/cf-diagnostico-consultivo.webp"
                alt="Atendimento consultivo da CF Contabilidade analisando documentos de uma empresa"
                className="h-[520px] w-full object-cover object-center transition duration-[1200ms] ease-out group-hover:scale-110 md:h-[620px]"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1.04 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/54 via-slate-950/4 to-white/8" />

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/18 bg-slate-950/70 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-300/16 text-sky-200">
                    <Eye className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
                      Análise com contexto
                    </p>
                    <p className="mt-1 text-base font-semibold leading-relaxed text-white/92">
                      Antes da orientação, vem o entendimento da realidade da empresa.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 18, y: -8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="absolute -right-3 top-12 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm font-bold text-slate-700 shadow-xl shadow-slate-900/10 backdrop-blur md:flex md:items-center md:gap-2"
          >
            <Sparkles className="h-4 w-4 text-sky-700" />
            Orientação mais clara
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
          </motion.div>
        </div>
      </section>

      <DiagnosticSupportSection />
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
