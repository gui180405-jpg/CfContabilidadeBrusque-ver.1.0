import { m } from 'framer-motion';
import { ArrowDown, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import QuizSection from '../components/landing/QuizSection';
import { site } from '../content/siteContent';
import { Eyebrow, MaskText, ParallaxImage } from '../components/motion/primitives';
import { VIEWPORT, stagger, variants } from '../components/motion/motionConfig';

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

const notes = [
  {
    icon: ShieldCheck,
    title: 'Sem compromisso',
    text: 'O diagnóstico serve para organizar o primeiro contato e facilitar uma orientação inicial.',
  },
  {
    icon: MessageCircle,
    title: 'Conversa mais objetiva',
    text: 'As respostas chegam organizadas no WhatsApp para a CF entender melhor o seu momento.',
  },
];

function DiagnosticSupportSection() {
  const whatsappUrl = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <Eyebrow>Atendimento consultivo</Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-cf-navy md:text-5xl"
            lines={['Você não precisa chegar na conversa sem saber por onde começar.']}
          />

          <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger(0.1, 0.2)}>
            <m.p variants={variants.up} className="mt-7 text-lg leading-8 text-cf-muted">
              O diagnóstico ajuda a organizar o contexto da empresa antes do primeiro contato.
              Assim, a CF consegue entender melhor sua realidade e orientar com mais clareza.
            </m.p>

            <m.ol variants={stagger(0.1)} className="mt-10 border-t border-cf-border">
              {consultivePoints.map((point, index) => (
                <m.li key={point} variants={variants.up} className="flex gap-5 border-b border-cf-border py-5">
                  <span className="cf-numeral pt-0.5 text-sm text-cf-blue">{String(index + 1).padStart(2, '0')}</span>
                  <p className="font-semibold leading-7 text-cf-navy">{point}</p>
                </m.li>
              ))}
            </m.ol>

            <m.div variants={variants.cta} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#diagnostico">
                Começar diagnóstico
                <ArrowDown className="h-4 w-4" />
              </PrimaryButton>
              <PrimaryButton href={whatsappUrl} external variant="outline">
                Falar direto com a CF
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </m.div>
          </m.div>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <ParallaxImage
            src="/fotos/emilly-atendimento.jpg"
            fallback="/cf-diagnostico-consultivo.webp"
            imgClassName="object-cover object-[50%_12%] sm:object-[50%_28%] lg:object-[50%_35%]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="Emilly, da equipe da CF Contabilidade, analisando informações no computador"
            intensity={6}
            className="aspect-square w-full bg-cf-soft sm:aspect-[4/5] lg:aspect-[3/4]"
          />
          <m.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="cf-label absolute bottom-0 left-0 bg-cf-navy px-5 py-3 text-white"
          >
            Orientação mais clara
          </m.p>
        </div>
      </div>
    </section>
  );
}

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnóstico contábil"
        title="Organize o contexto da sua empresa antes de falar com a CF."
        description="Responda algumas perguntas rápidas. Ao final, suas respostas serão enviadas pelo WhatsApp para facilitar uma orientação inicial mais objetiva."
        points={highlights}
      />

      <DiagnosticSupportSection />
      <QuizSection />

      <section className="bg-cf-background px-5 pb-16 md:px-8 md:pb-32">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.12)}
          className="mx-auto grid max-w-4xl border-t border-cf-border md:grid-cols-2"
        >
          {notes.map((note, index) => (
            <m.div
              key={note.title}
              variants={variants.up}
              className={`flex gap-4 border-b border-cf-border py-8 md:border-b-0 ${index === 1 ? 'md:border-l md:pl-8' : 'md:pr-8'}`}
            >
              <note.icon className="mt-0.5 h-5 w-5 shrink-0 text-cf-blue" />
              <div>
                <h2 className="font-extrabold text-cf-navy">{note.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-cf-muted">{note.text}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </section>
    </>
  );
}
