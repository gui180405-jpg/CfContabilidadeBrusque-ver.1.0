import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import Reveal from '../components/common/Reveal';
import { site } from '../content/siteContent';

/*
============================================================
PÁGINA CONTATO
============================================================
Celular com mensagens limpo, sem overlays por cima do conteúdo.
============================================================
*/

const whatsappHref =
  site?.whatsappUrl ||
  site?.whatsappLink ||
  site?.contact?.whatsappUrl ||
  site?.contact?.whatsapp ||
  '/diagnostico';

const contactEmail =
  site?.email ||
  site?.contact?.email ||
  'contato@cfcontabilidadebrusque.com';

const phoneLabel =
  site?.phone ||
  site?.contact?.phone ||
  'Fale com a CF';

const messages = [
  {
    from: 'client',
    text: 'Olá! Quero entender melhor a parte contábil da minha empresa.',
    time: '09:41',
  },
  {
    from: 'cf',
    text: 'Claro! Podemos analisar sua situação e indicar os próximos passos.',
    time: '09:42',
  },
  {
    from: 'client',
    text: 'Preciso de mais organização com prazos, impostos e documentos.',
    time: '09:41',
  },
  {
    from: 'cf',
    text: 'Perfeito. Vamos te orientar com clareza e segurança.',
    time: '09:43',
  },
];

const contactCards = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Envie uma mensagem para iniciar o atendimento.',
  },
  {
    icon: Mail,
    title: 'E-mail',
    description: contactEmail,
  },
  {
    icon: MapPin,
    title: 'Localização',
    description: 'Brusque, Santa Catarina',
  },
  {
    icon: Clock,
    title: 'Atendimento',
    description: 'Orientação para empresas que buscam mais organização.',
  },
];

function ChatPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="absolute -inset-5 rounded-[3rem] bg-sky-300/16 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.6rem] border-[7px] border-slate-950 bg-slate-950 shadow-2xl shadow-slate-900/28"
      >
        <div className="absolute left-1/2 top-0 z-20 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-950" />

        <div className="overflow-hidden rounded-[2rem] bg-[#eef7f2]">
          <div className="bg-[#075E54] px-5 pb-4 pt-7 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/85 bg-[#173D5A]">
                {site?.chatLogo ? (
                  <img
                    src={site.chatLogo}
                    alt="CF Contabilidade"
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="text-lg font-extrabold">CF</span>
                )}

                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#075E54] bg-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">
                  CF Contabilidade Brusque
                </p>
                <p className="text-xs font-semibold text-emerald-100">
                  online agora
                </p>
              </div>

              <Phone className="h-5 w-5 text-emerald-100" />
            </div>
          </div>

          <div className="relative min-h-[410px] px-4 py-5">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#0f172a_0,transparent_22%),radial-gradient(circle_at_80%_40%,#0f172a_0,transparent_18%),radial-gradient(circle_at_40%_80%,#0f172a_0,transparent_20%)]" />
            </div>

            <div className="relative z-10 space-y-4">
              {messages.map((message, index) => {
                const isClient = message.from === 'client';

                return (
                  <motion.div
                    key={`${message.from}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: index * 0.08 }}
                    className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                        isClient
                          ? 'rounded-tr-sm bg-[#DCF8C6] text-slate-800 shadow-emerald-900/8'
                          : 'rounded-tl-sm bg-white text-slate-800 shadow-slate-900/8'
                      }`}
                    >
                      {!isClient && (
                        <div className="mb-1 flex items-center gap-2 text-xs font-extrabold text-[#173D5A]">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#173D5A] text-[10px] text-white">
                            CF
                          </span>
                          CF
                        </div>
                      )}

                      <p>{message.text}</p>

                      <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-500">
                        {message.time}
                        {isClient && <CheckCircle2 className="h-3 w-3 text-sky-500" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#eef7f2] px-4 pb-5">
            <a
              href={whatsappHref}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5"
            >
              <span className="flex-1 text-sm font-extrabold text-[#173D5A]">
                Enviar mensagem
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/18">
                <Send className="h-5 w-5" />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ContactPage({ onStartQuiz }) {
  return (
    <main className="bg-[#E8F0F6]">
      <section className="relative overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-sky-400/14 blur-3xl" />
        <div className="absolute right-0 top-20 h-[30rem] w-[30rem] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F4F8FB] via-[#F4F8FB]/70 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.86fr]">
          <Reveal>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#CBDDE8] bg-white/76 px-4 py-2 text-sm font-bold text-[#173D5A] shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#0077B6]" />
                Contato CF Contabilidade
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] md:text-5xl lg:text-[4rem]">
                Converse com a CF e entenda o próximo passo da sua empresa.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] md:text-xl">
                Envie uma mensagem para organizar dúvidas sobre abertura, rotina
                contábil, impostos, documentos, folha ou regularização.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  className="inline-flex items-center justify-center rounded-xl bg-[#0077B6] px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-sky-900/18 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0369A1] md:text-base"
                >
                  Falar com a CF
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                <PrimaryButton onClick={onStartQuiz}>
                  Fazer diagnóstico
                  <ShieldCheck className="ml-2 h-5 w-5" />
                </PrimaryButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['orientação inicial', 'clareza sobre prazos', 'rotina mais organizada'].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/62 px-3 py-2 text-sm font-bold text-[#475569] shadow-sm backdrop-blur"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0077B6]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <ChatPhone />
        </div>
      </section>

      <section className="bg-[#F4F8FB] px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.title} delay={index * 0.05}>
                <div className="h-full rounded-[1.5rem] border border-white/80 bg-white/78 p-5 shadow-xl shadow-slate-900/7 backdrop-blur">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="font-extrabold text-[#0F172A]">
                    {card.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
