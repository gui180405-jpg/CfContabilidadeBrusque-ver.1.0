import { useCallback, useState } from 'react';
import { m } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
  MessageCircle,
  Play,
} from 'lucide-react';
import { site } from '../content/siteContent';
import PhotoImage from '../components/common/PhotoImage';
import VideoDialog from '../components/common/VideoDialog';
import PrimaryButton from '../components/common/PrimaryButton';
import Reveal from '../components/common/Reveal';
import SectionHeader from '../components/common/SectionHeader';
import StatRow from '../components/editorial/StatRow';
import ServiceIndex from '../components/editorial/ServiceIndex';
import StatementScroll from '../components/editorial/StatementScroll';
import ProcessTimeline from '../components/editorial/ProcessTimeline';
import {
  CountUp,
  Eyebrow,
  MaskText,
  ParallaxImage,
  RevealLine,
  Stagger,
  StaggerItem,
} from '../components/motion/primitives';
import { EASE, VIEWPORT, variants } from '../components/motion/motionConfig';

/*
============================================================
HOME — NARRATIVA
============================================================
1. Hero ............ quem é a CF + provas rápidas
2. Introdução ...... a pergunta que o empresário reconhece
3. Serviços ........ o que mantém a empresa em ordem (+ números)
4. Explicação ...... como a CF trabalha (método)
5. Autoridade ...... as pessoas e a história
6. CTA ............. diagnóstico
7. Endereço ........ proximidade física
============================================================
*/

const serviceLines = [
  {
    number: '01',
    title: 'Fiscal',
    description: 'Impostos, obrigações e planejamento para que a rotina fiscal deixe de ser uma surpresa.',
    items: ['Apuração de impostos', 'Notas fiscais', 'Obrigações fiscais'],
  },
  {
    number: '02',
    title: 'Contábil',
    description: 'Números organizados para entender o que acontece na empresa e decidir com mais clareza.',
    items: ['Conciliações', 'Demonstrativos', 'Análise contábil'],
  },
  {
    number: '03',
    title: 'Trabalhista',
    description: 'Folha, admissões, férias, rescisões e encargos acompanhados sem improviso.',
    items: ['Folha de pagamento', 'Admissões e férias', 'Rescisões'],
  },
  {
    number: '04',
    title: 'Societário',
    description: 'Abertura, alterações e regularizações para uma estrutura jurídica que acompanhe o negócio.',
    items: ['Abertura de empresa', 'Alterações', 'Regularizações'],
  },
];

const process = [
  { number: '01', title: 'Entendemos', text: 'Começamos pelo momento real da empresa: atividade, rotina, dificuldades e objetivos.' },
  { number: '02', title: 'Organizamos', text: 'Definimos documentos, responsabilidades, prazos e o que precisa ser colocado em ordem.' },
  { number: '03', title: 'Acompanhamos', text: 'Fiscal, contábil, pessoal e societário passam a fazer parte da gestão — não apenas da urgência.' },
  { number: '04', title: 'Orientamos', text: 'Com informação mais clara, você ganha contexto para decidir o próximo passo da empresa.' },
];

const introStatements = [
  'O saldo da conta não mostra sozinho o que realmente pertence à empresa.',
  'Imposto não deveria aparecer como surpresa no fim do mês.',
  'Crescer sem acompanhar números, folha e obrigações aumenta o risco da operação.',
];

/* ---------------------------------------------------------- */

function HeroSection({ onPlay }) {
  return (
    <section className="bg-cf-background px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-7">
          <Eyebrow mount>CF Contabilidade Brusque</Eyebrow>

          <MaskText
            as="h1"
            mount
            keepLines
            delay={0.12}
            className="mt-6 text-[clamp(2.3rem,11.2vw,2.75rem)] font-black leading-[0.95] tracking-[-0.05em] text-cf-navy sm:text-6xl md:mt-7 lg:text-[4.1rem] xl:text-[4.5rem]"
            lines={[
              'Empresas crescem.',
              <span key="b" className="text-cf-blue">A contabilidade precisa acompanhar.</span>,
            ]}
          />

          <Stagger mount delay={0.3} gap={0.08}>
            <StaggerItem as="p" className="mt-5 max-w-xl text-[1.0625rem] leading-7 text-cf-muted md:mt-7 md:text-xl md:leading-9">
              Há mais de 17 anos, a CF ajuda empresas a organizar números, impostos, pessoas e decisões com mais clareza.
            </StaggerItem>

            {/* Mobile: um CTA principal claro + link secundário leve. */}
            <StaggerItem variant="cta" className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-3 md:mt-9">
              <PrimaryButton href="/diagnostico" className="min-h-[52px]">
                Entender meu cenário <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <PrimaryButton variant="outline" href="/sobre" className="hidden sm:inline-flex">
                Conhecer a CF <ArrowUpRight className="h-4 w-4" />
              </PrimaryButton>
              <a href="/sobre" className="cf-link self-start text-cf-navy sm:hidden">
                Conhecer a CF <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </StaggerItem>
          </Stagger>

          <StatRow
            mount
            delay={0.6}
            className="mt-10 max-w-2xl md:mt-12"
            items={[
              { value: '17+', label: 'anos de experiência' },
              { value: 'Brusque', label: 'presença local' },
              { value: 'CRC', label: site.crc },
            ]}
          />
        </div>

        <div className="lg:col-span-5">
          <m.button
            type="button"
            onClick={onPlay}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="group relative block aspect-[5/4] w-full overflow-hidden bg-cf-soft text-left sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[600px]"
            aria-label="Assistir apresentação da Rose Michei"
          >
            <m.div
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE, delay: 0.25 } },
              }}
              className="absolute inset-0"
            >
              <m.div
                variants={{
                  hidden: { scale: 1.12 },
                  visible: { scale: 1, transition: { duration: 1.8, ease: EASE, delay: 0.25 } },
                  hover: { scale: 1.03, transition: { duration: 1.2, ease: EASE } },
                }}
                className="absolute inset-0"
              >
                <PhotoImage
                  src={site.photos.homeHero}
                  fallback={site.founderImage}
                  alt="Rose Michei trabalhando no escritório da CF Contabilidade Brusque"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_22%] lg:object-center"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </m.div>
              <div className="absolute inset-0 bg-gradient-to-t from-cf-navy/80 via-cf-navy/10 to-transparent" />
            </m.div>

            <m.span
              variants={{ hidden: { x: '-100%' }, visible: { x: 0, transition: { duration: 0.7, ease: EASE, delay: 1.1 } } }}
              className="cf-label absolute left-0 top-0 bg-cf-blue px-5 py-3 text-white"
            >
              Desde 2009
            </m.span>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
              <m.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 1.2 } } }}>
                <p className="cf-label text-cf-on-dark">CEO • CF Contabilidade Brusque</p>
                <span className="mt-2 block text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">Rose Michei</span>
              </m.div>

              <m.span
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 1.35 } } }}
                className="flex h-14 shrink-0 items-center overflow-hidden bg-white text-cf-navy"
              >
                <span className="grid max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-[max-width,padding] duration-500 ease-cf group-hover:max-w-[12rem] group-hover:pl-5 group-focus-visible:max-w-[12rem] group-focus-visible:pl-5">
                  Assistir apresentação
                </span>
                <span className="flex h-14 w-14 items-center justify-center">
                  <Play className="ml-0.5 h-5 w-5" />
                </span>
              </m.span>
            </div>
          </m.button>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Eyebrow>Estrutura antes da urgência</Eyebrow>
            <MaskText
              as="h2"
              className="mt-6 cf-title-lg text-cf-navy"
              lines={['Sua empresa cresceu.', 'Sua estrutura acompanhou?']}
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <StatementScroll statements={introStatements} />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-cf-navy px-5 py-16 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          theme="dark"
          layout="split"
          eyebrow="O que mantém uma empresa em ordem"
          lines={['Contabilidade não começa', 'quando a guia vence.']}
          description="Fiscal, contábil, trabalhista e societário precisam conversar entre si para que a empresa tenha uma rotina mais previsível e decisões mais claras."
        />

        <ServiceIndex
          className="mt-10 md:mt-20"
          services={serviceLines}
          cta={
            <a href="/servicos" className="cf-link text-white">
              Ver todos os serviços <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          }
        />

        <StatRow
          tone="dark"
          size="lg"
          className="mt-14 md:mt-28"
          items={[
            { value: '4', label: 'áreas integradas' },
            { value: '17+', label: 'anos de experiência' },
            { value: 'Brusque', label: 'atendimento próximo' },
          ]}
        />
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-cf-background px-5 py-16 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          layout="split"
          eyebrow="Como trabalhamos"
          lines={['Menos improviso.', 'Mais contexto.']}
          description="A rotina contábil precisa acompanhar a empresa durante o mês — não aparecer apenas quando alguma coisa já virou urgência."
        />

        <ParallaxImage
          src={site.photos.homeProcess}
          fallback={site.receptionImage}
          // foco mais baixo: mostra os monitores/teclado além dos rostos
          imgClassName="object-cover object-[50%_85%]"
          sizes="(min-width: 1280px) 1216px, 100vw"
          alt="Equipe da CF trabalhando durante a rotina do escritório"
          intensity={7}
          className="mt-14 aspect-[4/3] w-full bg-cf-soft sm:aspect-[16/9] md:mt-20 lg:aspect-[21/9]"
        />

        <ProcessTimeline steps={process} className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}

function PeopleSection() {
  return (
    <section className="overflow-hidden bg-cf-soft px-5 py-16 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <ParallaxImage
            src={site.photos.homeTeam}
            fallback={site.teamImage}
            imgClassName="object-cover object-[50%_40%]"
            sizes="(min-width: 1024px) 58vw, 100vw"
            alt="Equipe da CF Contabilidade Brusque"
            className="aspect-[4/3] w-full bg-cf-border"
          />
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={variants.number}
            custom={0.3}
            className="absolute -bottom-6 left-4 bg-cf-blue px-5 py-4 text-white md:-bottom-10 md:left-8 md:px-8 md:py-7"
          >
            <strong className="cf-numeral block text-4xl leading-none md:text-6xl">
              <CountUp value="17" />
              <span className="text-cf-on-dark">+</span>
            </strong>
            <span className="mt-2 block text-xs font-semibold md:text-sm">anos acompanhando empresas</span>
          </m.div>
        </div>

        <div className="pt-8 lg:col-span-5 lg:pt-20">
          <Eyebrow>Uma empresa feita de pessoas</Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-cf-navy md:text-5xl"
            lines={['Contabilidade também é uma relação de confiança.']}
          />

          <Stagger gap={0.12} delay={0.2}>
            <StaggerItem as="p" className="mt-8 text-lg leading-8 text-cf-muted">
              A CF nasceu em Brusque e cresceu acompanhando de perto a rotina de empresas, empresários e as mudanças da própria contabilidade. A tecnologia ajuda. A proximidade continua sendo parte do trabalho.
            </StaggerItem>

            <StaggerItem className="mt-10 flex items-stretch gap-5">
              <RevealLine axis="y" className="bg-cf-blue" delay={0.4} />
              <div>
                <p className="text-lg font-bold text-cf-navy">Rose Michei</p>
                <p className="mt-1 text-sm text-cf-muted">CEO — CF Contabilidade Brusque</p>
              </div>
            </StaggerItem>

            <StaggerItem variant="cta">
              <a href="/sobre" className="cf-link mt-10 text-cf-blue hover:text-cf-blue-dark">
                Conheça nossa história <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function DiagnosticCta() {
  return (
    <section className="cf-defer bg-cf-blue px-5 py-16 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="white">4 perguntas • menos de 2 minutos</Eyebrow>
        <MaskText
          as="h2"
          className="mt-7 max-w-5xl cf-title-xl text-white"
          lines={['Como está a contabilidade', 'da sua empresa hoje?']}
        />

        <div className="mt-12 grid gap-10 border-t border-white/25 pt-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              Conte um pouco do seu momento. A ideia é iniciar a conversa com contexto, sem formulário interminável e sem promessa pronta.
            </p>
          </Reveal>
          <Reveal variant="cta" delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
            <PrimaryButton variant="light" href="/diagnostico" className="w-full sm:w-auto">
              Fazer análise inicial <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LocationSection({ whatsappHref }) {
  const addressLines = site.address.split(' — ');

  return (
    <section className="bg-cf-background px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <ParallaxImage
          src={site.photos.homeOffice}
          fallback={site.officeImage}
          alt="Rose Michei na recepção do escritório da CF Contabilidade Brusque"
          imgClassName="object-cover object-[40%_50%]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/3] w-full bg-cf-soft lg:col-span-7 lg:aspect-[5/4]"
        />

        <div className="lg:col-span-5 lg:pl-6">
          <Eyebrow>
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5" /> Brusque • Santa Catarina
            </span>
          </Eyebrow>
          <MaskText
            as="h2"
            className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-cf-navy md:text-5xl"
            lines={['Contabilidade próxima também tem endereço.']}
          />

          <Stagger as="address" gap={0.1} delay={0.25} className="mt-9 border-t border-cf-border not-italic">
            {addressLines.map((line) => (
              <StaggerItem key={line} className="border-b border-cf-border py-3.5 text-base font-semibold text-cf-navy">
                {line}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="cta" delay={0.4} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={whatsappHref} external>
              <MessageCircle className="h-4 w-4" /> Falar com a CF <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
            <PrimaryButton variant="outline" href="/contato">
              <MapPin className="h-4 w-4" /> Ver contato
            </PrimaryButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const closeVideo = useCallback(() => setShowVideo(false), []);
  const whatsappHref = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <>
      <HeroSection onPlay={() => setShowVideo(true)} />
      <IntroSection />
      <ServicesSection />
      <ProcessSection />
      <PeopleSection />
      <DiagnosticCta />
      <LocationSection whatsappHref={whatsappHref} />
      <VideoDialog open={showVideo} onClose={closeVideo} />
    </>
  );
}
