import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import { site } from '../content/siteContent';
import {
  Eyebrow,
  MaskText,
  ParallaxImage,
  Stagger,
  StaggerItem,
} from '../components/motion/primitives';
import { VIEWPORT, stagger, variants } from '../components/motion/motionConfig';

/*
============================================================
PÁGINA CONTATO
============================================================
- topo editorial com o "celular" da conversa ao lado;
- canais de contato como um índice de linhas (sem cards);
- endereço com foto da fachada.

Correção: os botões de WhatsApp agora abrem o WhatsApp de fato
(antes caíam em /diagnostico porque procuravam site.whatsappUrl,
que não existe no siteContent).
============================================================
*/

const whatsappHref = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

const contactEmail = site.email;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'R. Felipe Schmidt, 172, Brusque, SC',
)}`;

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
    time: '09:43',
  },
  {
    from: 'cf',
    text: 'Perfeito. Vamos te orientar com clareza e segurança.',
    time: '09:44',
  },
];

const contactCards = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Envie uma mensagem para iniciar o atendimento.',
    href: whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    title: 'E-mail',
    description: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    icon: Phone,
    title: 'Telefone',
    description: site.phoneHuman,
    href: `tel:+${site.phoneWhats}`,
  },
  {
    icon: MapPin,
    title: 'Localização',
    description: 'R. Felipe Schmidt, 172 — Brusque, SC (abrir no mapa)',
    href: mapsHref,
    external: true,
  },
  {
    icon: Clock,
    title: 'Atendimento',
    description: 'Orientação para empresas que buscam mais organização.',
  },
];

/*
------------------------------------------------------------
CONVERSA CF — representação editorial (não é uma réplica de app)
------------------------------------------------------------
- Moldura fina, sombra quase imperceptível, sem notch/ícones de sistema.
- Cliente: balão leve em off-white. CF: sem balão, texto com uma linha
  azul à esquerda (identidade da marca) — a hierarquia vem daí.
- Motion: quando o componente entra na tela, a conversa acontece uma vez:
  mensagem → "digitando…" → resposta → mensagem → "digitando…" → resposta.
  Todas as mensagens usam o MESMO movimento (opacidade + 8px + escala 0,99).
- Só repete se o componente sair totalmente da tela e entrar de novo.
- O espaço de cada mensagem já está reservado: nada "empurra" o layout.
- Mobile: vira um painel plano (sem aparelho), mais baixo e legível.
- prefers-reduced-motion: conversa completa, sem sequência.
------------------------------------------------------------
*/

// Linha do tempo da conversa (ms após entrar na tela).
const CHAT_TIMELINE = [
  { at: 450, show: 0 }, // cliente
  { at: 1250, typing: 1 }, // CF digitando
  { at: 2350, show: 1 }, // CF responde
  { at: 3150, show: 2 }, // cliente
  { at: 3950, typing: 3 }, // CF digitando
  { at: 5050, show: 3 }, // CF responde
];

const MESSAGE_MOTION = {
  hidden: { opacity: 0, y: 8, scale: 0.99 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function useConversation(ref) {
  const reduce = useReducedMotion();
  const entered = useInView(ref, { amount: 0.45 });
  const present = useInView(ref, { amount: 0 });
  const [visible, setVisible] = useState(-1); // índice da última mensagem exibida
  const [typing, setTyping] = useState(null);
  const played = useRef(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  // Desmontou → limpa tudo.
  useEffect(() => clearTimers, []);

  // Saiu totalmente da tela → pode tocar de novo na próxima entrada real.
  useEffect(() => {
    if (!present && played.current && !reduce) {
      clearTimers();
      played.current = false;
      setVisible(-1);
      setTyping(null);
    }
  }, [present, reduce]);

  useEffect(() => {
    if (reduce) {
      clearTimers();
      setVisible(messages.length - 1);
      setTyping(null);
      return;
    }
    if (!entered || played.current) return;

    // Uma vez iniciada, a conversa termina mesmo se a pessoa rolar um pouco.
    played.current = true;
    timers.current = CHAT_TIMELINE.map((step) =>
      window.setTimeout(() => {
        if (step.typing !== undefined) setTyping(step.typing);
        if (step.show !== undefined) {
          setTyping(null);
          setVisible(step.show);
        }
      }, step.at),
    );
  }, [entered, reduce]);

  return { visible, typing };
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="CF digitando">
      {[0, 1, 2].map((dot) => (
        <m.span
          key={dot}
          className="block h-1.5 w-1.5 rounded-full bg-cf-blue/70"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: dot * 0.15 }}
        />
      ))}
    </span>
  );
}

function ChatMessage({ message, shown, typing, firstFromCF }) {
  const isClient = message.from === 'client';

  if (isClient) {
    return (
      <m.div initial="hidden" animate={shown ? 'shown' : 'hidden'} variants={MESSAGE_MOTION} className="flex justify-end">
        <p className="max-w-[82%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 sm:bg-cf-soft text-[0.875rem] leading-6 text-cf-navy">
          {message.text}
        </p>
      </m.div>
    );
  }

  return (
    <div className="relative">
      {/* espaço reservado: o texto já ocupa o lugar, invisível, enquanto "digita" */}
      <m.div
        initial="hidden"
        animate={shown ? 'shown' : 'hidden'}
        variants={MESSAGE_MOTION}
        className="max-w-[88%] border-l-2 border-cf-blue pl-3.5"
      >
        {firstFromCF && <p className="cf-label mb-1.5 text-[0.625rem] text-cf-blue">CF Contabilidade</p>}
        <p className="text-[0.875rem] font-medium leading-6 text-cf-navy">{message.text}</p>
      </m.div>

      <m.div
        aria-hidden={!typing}
        initial={false}
        animate={{ opacity: typing ? 1 : 0, transition: { duration: 0.25 } }}
        className="pointer-events-none absolute left-0 top-0 border-l-2 border-cf-blue/30 pl-3.5"
      >
        {/* os pontinhos só existem enquanto a CF "digita" — sem loop escondido */}
        {typing && <TypingDots />}
      </m.div>
    </div>
  );
}

function ChatPhone() {
  const ref = useRef(null);
  const { visible, typing } = useConversation(ref);
  const firstCF = messages.findIndex((message) => message.from === 'cf');

  return (
    <div ref={ref} className="relative mx-auto w-full sm:max-w-[340px]">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative border-y border-cf-border sm:rounded-[2.25rem] sm:bg-white sm:border sm:border-cf-navy/10 sm:p-2 sm:shadow-[0_40px_80px_-48px_rgba(19,31,57,0.35)]"
      >
        <div className="sm:overflow-hidden sm:rounded-[1.75rem] sm:bg-white">
          {/* referência mínima de aparelho (só tablet/desktop) */}
          <span aria-hidden="true" className="mx-auto mt-2 hidden h-1 w-12 rounded-full bg-cf-navy/10 sm:block" />

          {/* cabeçalho: só o essencial */}
          <div className="flex items-center gap-3 px-1 py-4 sm:px-5 sm:pb-4 sm:pt-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cf-navy">
              <img src={site.chatLogo} alt="" className="h-5 w-5 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.8125rem] font-bold leading-tight text-cf-navy">CF Contabilidade Brusque</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.6875rem] leading-none text-cf-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cf-blue" />
                atendimento pelo WhatsApp
              </p>
            </div>
          </div>

          <span aria-hidden="true" className="block h-px bg-cf-border sm:mx-5" />

          {/* conversa */}
          {/* conversa ilustrativa: escondida dos leitores de tela (não é uma conversa real) */}
          <p className="sr-only">Exemplo ilustrativo de conversa com a CF pelo WhatsApp.</p>
          <div className="space-y-5 px-1 py-6 sm:px-5 sm:py-7" aria-hidden="true">
            {messages.map((message, index) => (
              <ChatMessage
                key={`${message.from}-${index}`}
                message={message}
                shown={index <= visible}
                typing={typing === index}
                firstFromCF={index === firstCF}
              />
            ))}
          </div>

          {/* saída real: continua no WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-t border-cf-border px-1 py-4 text-sm font-bold text-cf-navy transition-colors duration-300 hover:text-cf-blue sm:px-5"
          >
            Enviar mensagem
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-cf group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </m.div>
    </div>
  );
}

function ContactIndex() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Canais</Eyebrow>
            <MaskText
              as="h2"
              className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-cf-navy md:text-5xl"
              lines={['Fale com a CF', 'do jeito que preferir.']}
            />
          </div>

          <m.ul
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.08)}
            className="border-t border-cf-border lg:col-span-8"
          >
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              const Tag = card.href ? 'a' : 'div';
              const linkProps = card.href
                ? {
                    href: card.href,
                    target: card.external ? '_blank' : undefined,
                    rel: card.external ? 'noopener noreferrer' : undefined,
                  }
                : {};

              return (
                <m.li key={card.title} variants={variants.up} className="border-b border-cf-border">
                  <Tag
                    {...linkProps}
                    className={`group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3.5rem_12rem_1fr_auto] md:py-8 ${
                      card.href ? 'cursor-pointer' : ''
                    }`}
                  >
                    <span className="cf-numeral text-sm text-cf-muted">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="flex items-center gap-3 text-xl font-black tracking-[-0.025em] text-cf-navy md:text-2xl">
                      <Icon className="h-5 w-5 text-cf-blue transition-transform duration-500 ease-cf group-hover:-translate-y-0.5" />
                      {card.title}
                    </h3>
                    <p className="col-span-2 col-start-2 text-base leading-7 text-cf-muted md:col-span-1 md:col-start-auto">
                      {card.description}
                    </p>
                    {card.href ? (
                      <ArrowUpRight className="row-start-1 col-start-3 h-5 w-5 text-cf-navy transition-transform duration-300 ease-cf group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:col-start-4" />
                    ) : (
                      <span className="hidden md:block" />
                    )}
                  </Tag>
                </m.li>
              );
            })}
          </m.ul>
        </div>
      </div>
    </section>
  );
}

function AddressSection() {
  const addressLines = site.address.split(' — ');

  return (
    <section className="bg-cf-background px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <ParallaxImage
          src={site.photos.contactFacade}
          fallback={site.officeImage}
          imgClassName="object-cover object-[40%_50%]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          alt="Rose Michei na recepção do escritório da CF Contabilidade Brusque"
          className="aspect-[16/10] w-full bg-cf-soft lg:col-span-7"
        />
        <div className="lg:col-span-5 lg:pl-6">
          <Eyebrow>Onde estamos</Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-cf-navy md:text-5xl"
            lines={['Atendimento próximo também tem endereço.']}
          />
          <Stagger as="address" gap={0.1} delay={0.25} className="mt-9 border-t border-cf-border not-italic">
            {addressLines.map((line) => (
              <StaggerItem key={line} className="border-b border-cf-border py-3.5 text-base font-semibold text-cf-navy">
                {line}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-cf-background">
      <PageHero
        eyebrow="Contato CF Contabilidade"
        title="Converse com a CF e entenda o próximo passo da sua empresa."
        description="Envie uma mensagem para organizar dúvidas sobre abertura, rotina contábil, impostos, documentos, folha ou regularização."
        points={['orientação inicial', 'clareza sobre prazos', 'rotina mais organizada']}
        aside={<ChatPhone />}
      >
        <PrimaryButton href={whatsappHref} external>
          Falar com a CF
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>

        <PrimaryButton variant="outline" href="/diagnostico">
          Fazer diagnóstico
          <ShieldCheck className="h-4 w-4" />
        </PrimaryButton>
      </PageHero>

      <ContactIndex />
      <AddressSection />
    </div>
  );
}
