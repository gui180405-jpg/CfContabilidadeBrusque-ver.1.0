import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import LocationSection from '../components/landing/LocationSection';
import FAQSection from '../components/landing/FAQSection';
import { site } from '../content/siteContent';

const chatMessages = [
  {
    side: 'client',
    text: 'Olá! Quero entender melhor a parte contábil da minha empresa.',
    delay: 0.75,
  },
  {
    side: 'cf',
    text: 'Claro! Podemos analisar sua situação e indicar os próximos passos.',
    delay: 1.15,
  },
  {
    side: 'client',
    text: 'Preciso de mais organização com prazos, impostos e documentos.',
    delay: 1.55,
  },
  {
    side: 'cf',
    text: 'Perfeito. Vamos te orientar com clareza e segurança.',
    delay: 1.95,
  },
];

function PhoneChatMockup({ whatsappUrl }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 90, rotate: -2, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[360px]"
    >
      <div className="absolute -inset-10 rounded-full bg-sky-500/18 blur-3xl" />
      <div className="absolute -right-8 top-12 h-28 w-28 rounded-full bg-emerald-400/18 blur-2xl" />
      <div className="absolute -left-8 bottom-16 h-24 w-24 rounded-full bg-sky-300/18 blur-2xl" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-[2.4rem] border-[10px] border-slate-950 bg-slate-950 shadow-2xl shadow-slate-900/24"
      >
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />

        <div className="overflow-hidden rounded-[1.75rem] bg-[#e8f5ec]">
          <div className="bg-[#075e54] px-4 pb-4 pt-7 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14">
                <MessageCircle className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">
                  CF Contabilidade Brusque
                </p>
                <p className="text-xs text-emerald-100">
                  online agora
                </p>
              </div>

              <Phone className="h-5 w-5 text-emerald-100" />
            </div>
          </div>

          <div className="relative min-h-[410px] px-4 py-5">
            <div className="absolute inset-0 opacity-[0.18] cf-subtle-grid" />

            <div className="relative space-y-3">
              {chatMessages.map((message) => {
                const isCf = message.side === 'cf';

                return (
                  <motion.div
                    key={message.text}
                    initial={{
                      opacity: 0,
                      y: 18,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: message.delay,
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`flex ${isCf ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                        isCf
                          ? 'rounded-tl-md bg-white text-slate-800'
                          : 'rounded-tr-md bg-[#dcf8c6] text-slate-850'
                      }`}
                    >
                      {message.text}

                      <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-500">
                        09:{isCf ? '42' : '41'}
                        {!isCf && <CheckCheck className="h-3.5 w-3.5 text-sky-600" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.35, duration: 0.45 }}
              className="absolute inset-x-4 bottom-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:text-emerald-700"
              >
                <span>Enviar mensagem</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.55, duration: 0.5 }}
        className="absolute -right-5 bottom-20 hidden rounded-2xl border border-white/70 bg-white/88 p-4 shadow-2xl shadow-slate-900/12 backdrop-blur md:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-800">
              Atendimento
            </p>
            <p className="text-sm font-extrabold text-slate-950">
              rápido e orientado
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactHero({ onStartQuiz }) {
  const whatsappUrl = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-55" />
      <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-sky-500/16 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e8f0f6] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/10 bg-white/78 px-4 py-2 text-sm font-bold text-sky-900 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Contato
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Fale com a CF Contabilidade Brusque.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            Entre em contato pelo WhatsApp, telefone, e-mail ou visite nosso escritório em Brusque-SC.
            Nossa equipe pode te orientar com clareza sobre a rotina contábil da sua empresa.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton href={whatsappUrl} external>
              Falar no WhatsApp
            </PrimaryButton>

            <button
              type="button"
              onClick={onStartQuiz}
              className="rounded-xl border border-slate-300 bg-white/84 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
            >
              Fazer diagnóstico
            </button>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {['Atendimento próximo', 'Orientação clara', 'Rotina organizada'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <PhoneChatMockup whatsappUrl={whatsappUrl} />
      </div>
    </section>
  );
}

export default function ContactPage({ onStartQuiz }) {
  return (
    <>
      <ContactHero onStartQuiz={onStartQuiz} />
      <LocationSection />
      <FAQSection />
    </>
  );
}
