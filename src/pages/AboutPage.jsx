import { m } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Eye,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import FounderSection from '../components/landing/FounderSection';
import CTASection from '../components/landing/CTASection';
import PillarIndex from '../components/editorial/PillarIndex';
import { site } from '../content/siteContent';
import {
  Eyebrow,
  MaskText,
  ParallaxImage,
  Stagger,
  StaggerItem,
} from '../components/motion/primitives';
import { EASE, VIEWPORT, stagger, variants } from '../components/motion/motionConfig';

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

/* Foto da equipe com legenda "Estrutura real" encostada no canto. */
function TeamImage() {
  return (
    <div className="relative">
      <ParallaxImage
        mount
        src={site.photos.aboutTeam}
        fallback="/cf-equipe-escritorio.webp"
        imgClassName="object-cover object-[50%_20%] lg:object-[50%_35%]"
        sizes="(min-width: 1024px) 40vw, 100vw"
        alt="Equipe da CF Contabilidade reunida na recepção do escritório"
        loading="eager"
        className="aspect-[4/3] w-full bg-cf-soft sm:aspect-[16/11] lg:aspect-[4/5]"
      />
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 1 } }}
        className="relative -mt-16 ml-6 bg-cf-navy p-6 text-white sm:absolute sm:-bottom-10 sm:-left-10 sm:ml-0 sm:mt-0 sm:max-w-sm"
      >
        <p className="cf-label flex items-center gap-2 text-cf-on-dark">
          <Building2 className="h-3.5 w-3.5" />
          Estrutura real
        </p>
        <p className="mt-3 text-base font-semibold leading-7 text-white/90">
          Atendimento próximo, ambiente organizado e equipe presente para acompanhar a rotina da sua empresa.
        </p>
      </m.div>
    </div>
  );
}

function CulturePoints() {
  return (
    <m.ol
      initial="hidden"
      animate="visible"
      variants={stagger(0.12, 1.1)}
      className="grid border-t border-cf-border md:grid-cols-3"
    >
      {culturePoints.map((point, index) => (
        <m.li
          key={point}
          variants={variants.up}
          className="flex gap-5 border-b border-cf-border py-6 md:border-b-0 md:py-8 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8"
        >
          <span className="cf-numeral pt-1 text-sm text-cf-blue">{String(index + 1).padStart(2, '0')}</span>
          <p className="text-lg font-semibold leading-7 tracking-[-0.01em] text-cf-navy">{point}</p>
        </m.li>
      ))}
    </m.ol>
  );
}

function InteractionSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <ParallaxImage
          src={site.photos.aboutInteraction}
          fallback={site.teamImage}
          sizes="(min-width: 1024px) 58vw, 100vw"
          alt="Equipe da CF Contabilidade em reunião, trocando informações sobre a rotina dos clientes"
          className="aspect-[3/2] w-full bg-cf-soft lg:col-span-7"
        />
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-4">
          <Eyebrow>Trabalho em equipe</Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-3xl font-black leading-[1.06] tracking-[-0.035em] text-cf-navy md:text-4xl"
            lines={['A proximidade também aparece na forma de trabalhar.']}
          />
          <Stagger delay={0.25}>
            <StaggerItem as="p" className="mt-6 leading-7 text-cf-muted">
              Troca de informações, conferência e conversa fazem parte de uma rotina contábil que precisa acompanhar o negócio de perto.
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function WorkPillarsSection() {
  const whatsappHref = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <section className="bg-cf-soft px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <PillarIndex items={workPillars} indicatorId="cf-about-pillars" />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.12)}
          className="mt-14 grid gap-10 border-t border-cf-navy pt-10 md:mt-28 md:pt-16 lg:grid-cols-12 lg:gap-10"
        >
          <m.p variants={variants.fade} className="cf-label text-cf-blue lg:col-span-3">
            Nosso jeito de trabalhar
          </m.p>
          <div className="lg:col-span-9">
            <MaskText
              as="h2"
              className="cf-title-lg max-w-4xl text-cf-navy"
              lines={['Contabilidade com presença, responsabilidade e acompanhamento.']}
            />
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <m.p variants={variants.up} className="max-w-2xl text-lg leading-8 text-cf-muted">
                A CF une experiência, rotina bem definida e atendimento próximo para transformar obrigações contábeis em uma base mais segura para a gestão da empresa.
              </m.p>
              <m.div variants={variants.cta}>
                <PrimaryButton href={whatsappHref} external>
                  <MessageCircle className="h-4 w-4" />
                  Falar com a CF
                </PrimaryButton>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A CF por dentro"
        title="Uma contabilidade que acontece na rotina, não só no vencimento."
        description="Por trás de cada guia, folha, obrigação e orientação existe uma equipe acompanhando detalhes, conferindo informações e organizando o caminho para que a empresa tenha mais segurança no dia a dia."
        aside={<TeamImage />}
        bottom={<CulturePoints />}
      >
        <PrimaryButton href="/diagnostico">
          Analisar minha empresa
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <PrimaryButton
          variant="outline"
          href="/servicos"
        >
          Conhecer serviços
        </PrimaryButton>
      </PageHero>

      <InteractionSection />
      <WorkPillarsSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
