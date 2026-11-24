import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Phone, Play, Plus } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import Reveal from '../common/Reveal';
import { Eyebrow, MaskText, ParallaxImage, RevealLine, Stagger, StaggerItem } from '../motion/primitives';
import { VIEWPORT, stagger, variants } from '../motion/motionConfig';
import { site } from '../../content/siteContent';
import { trackEvent } from '../../lib/analytics';

/*
============================================================
SEÇÕES DAS PÁGINAS POR SEGMENTO
============================================================
Blocos reaproveitáveis para páginas de segmento (imobiliárias,
troca de contador e, no futuro, comércio e prestadores).
Seguem o mesmo sistema visual do site: tipografia editorial,
linhas finas, numeração leve, azul CF só nos destaques.
============================================================
*/

const pad = (n) => String(n).padStart(2, '0');

/** Topo da página: título, subtítulo, texto de apoio, WhatsApp e foto real. */
export function SectorHero({ hero, whatsapp, secondary }) {
  return (
    <section className="relative bg-cf-background px-5 pb-12 pt-28 md:px-8 md:pb-24 md:pt-40" data-track-area="topo-pagina">
      <div className="mx-auto grid max-w-7xl gap-10 md:gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow mount>{hero.eyebrow}</Eyebrow>
          <MaskText as="h1" mount delay={0.15} lines={[hero.title]} className="mt-6 max-w-5xl cf-title-xl text-cf-black md:mt-7" />

          <Stagger mount delay={0.5} gap={0.08}>
            <StaggerItem as="p" className="mt-6 max-w-2xl text-xl font-bold leading-8 text-cf-navy md:mt-8 md:text-2xl md:leading-9">
              {hero.subtitle}
            </StaggerItem>
            {hero.text.map((paragraph) => (
              <StaggerItem key={paragraph} as="p" className="mt-4 max-w-2xl text-base leading-7 text-cf-muted md:text-lg md:leading-8">
                {paragraph}
              </StaggerItem>
            ))}
            <StaggerItem variant="cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9">
              <PrimaryButton href={whatsapp} external>
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {hero.cta}
              </PrimaryButton>
              {secondary && (
                <PrimaryButton href={secondary.href} variant="outline">
                  {secondary.label}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              )}
            </StaggerItem>
            {hero.note && (
              <StaggerItem as="p" className="mt-4 text-sm leading-6 text-cf-muted">
                {hero.note}
              </StaggerItem>
            )}
          </Stagger>
        </div>

        <div className="lg:col-span-5">
          <ParallaxImage
            mount
            src={hero.image}
            fallback={hero.imageFallback}
            alt={hero.imageAlt}
            imgClassName={`object-cover ${hero.imagePosition || 'object-center'}`}
            sizes="(min-width: 1024px) 40vw, 100vw"
            loading="eager"
            className="aspect-[4/3] w-full bg-cf-soft sm:aspect-[16/11] lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}

/** Lista numerada de situações/desafios em que o visitante se reconhece. */
export function RecognitionList({ id, eyebrow, title, intro, items, closing }) {
  return (
    <section id={id} className="bg-cf-soft px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskText as="h2" lines={[title]} className="mt-6 cf-title-lg text-cf-black" />
          {intro && (
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-lg leading-8 text-cf-muted">{intro}</p>
            </Reveal>
          )}
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.08, 0.1)}
          className="border-t border-cf-border lg:col-span-6 lg:col-start-7"
        >
          {items.map((item, index) => {
            const isObject = typeof item === 'object';
            return (
              <m.li key={isObject ? item.title : item} variants={variants.up} className="flex gap-5 border-b border-cf-border py-5 md:gap-7 md:py-6">
                <span className="cf-numeral pt-1 text-sm text-cf-blue">{pad(index + 1)}</span>
                <div>
                  <p className="text-lg font-extrabold leading-7 text-cf-black">{isObject ? item.title : item}</p>
                  {isObject && item.text && <p className="mt-1 leading-7 text-cf-muted">{item.text}</p>}
                </div>
              </m.li>
            );
          })}
        </m.ol>

        {closing && (
          <Reveal className="lg:col-span-12">
            <p className="mt-4 max-w-4xl border-l-2 border-cf-blue pl-5 text-xl font-bold leading-8 text-cf-navy md:mt-8 md:pl-7 md:text-2xl md:leading-10">
              {closing}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * Serviços em linhas editoriais: número, área e o que inclui.
 * Opcionais: `intro` (texto sob o título), `item.text` (o desafio do setor,
 * mostrado sob o nome da área), `pointsLabel` (rótulo acima da lista) e
 * `extras` ({ title, items }) — linha final com serviços complementares.
 */
export function ServiceRows({ id, eyebrow, title, intro, items, whatsapp, pointsLabel, extras, tone = 'background' }) {
  const bg = tone === 'soft' ? 'bg-cf-soft' : 'bg-cf-background';
  return (
    <section id={id} className={`${bg} px-5 py-16 md:px-8 md:py-28`} data-track-area="servicos-segmento">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <MaskText as="h2" lines={[title]} className="mt-6 cf-title-lg text-cf-black" />
            {intro && (
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-cf-muted">{intro}</p>
              </Reveal>
            )}
          </div>
          {whatsapp && (
            <Reveal variant="cta" delay={0.2} className="lg:col-span-4 lg:justify-self-end">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="cf-link text-cf-blue">
                Tirar dúvidas pelo WhatsApp
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </Reveal>
          )}
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.08, 0.15)}
          className="mt-12 border-t border-cf-navy md:mt-16"
        >
          {items.map((item, index) => (
            <m.article
              key={item.title}
              variants={variants.up}
              className="grid gap-4 border-b border-cf-border py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <span className="cf-numeral text-3xl leading-none text-cf-blue md:col-span-1 md:text-4xl">{pad(index + 1)}</span>
              <div className="md:col-span-5 lg:col-span-4">
                <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] text-cf-black md:text-2xl">{item.title}</h3>
                {item.text && <p className="mt-3 leading-7 text-cf-muted">{item.text}</p>}
              </div>
              <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
                {pointsLabel && <p className={`cf-label mb-3 text-cf-blue ${index > 0 ? 'md:hidden' : ''}`}>{pointsLabel}</p>}
                <ul className="grid gap-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-cf-text">
                      <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 bg-cf-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </m.article>
          ))}
        </m.div>

        {extras && (
          <Reveal className="mt-10 grid gap-4 md:mt-12 md:grid-cols-12 md:gap-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cf-navy md:col-span-4 md:pt-2.5 lg:col-span-5">{extras.title}</p>
            <ul className="flex flex-wrap gap-2 md:col-span-8 lg:col-span-6 lg:col-start-7">
              {extras.items.map((extra) => (
                <li key={extra} className="border border-cf-border bg-cf-background px-3.5 py-2 text-sm font-bold text-cf-navy">
                  {extra}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const STEP_COLUMNS = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' };

/** Etapas em linha (desktop) ou coluna (celular). Aceita 3 a 5 etapas. */
export function StepsRow({ id, eyebrow, title, intro, items, note, children }) {
  return (
    <section id={id} className="bg-cf-background px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <MaskText as="h2" lines={[title]} className="mt-6 max-w-4xl cf-title-lg text-cf-black" />
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cf-muted">{intro}</p>
          </Reveal>
        )}

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.12, 0.15)}
          className={`relative mt-12 grid gap-0 md:mt-16 ${STEP_COLUMNS[items.length] || STEP_COLUMNS[5]} lg:gap-8`}
        >
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-cf-border lg:block" />
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-cf-border lg:hidden" />
          {items.map((step, index) => (
            <m.li key={step.title} variants={variants.up} className="relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12">
              <span aria-hidden="true" className="absolute left-0 top-0 block h-[15px] w-[15px] border-2 border-cf-blue bg-cf-background" />
              <span className="cf-numeral block text-[2.4rem] leading-none text-cf-black md:text-5xl">{pad(index + 1)}</span>
              <h3 className="mt-4 text-lg font-extrabold leading-snug text-cf-black">{step.title}</h3>
              <p className="mt-2 leading-7 text-cf-muted">{step.text}</p>
            </m.li>
          ))}
        </m.ol>

        {children && (
          <Reveal variant="cta" className="mt-12 flex flex-col gap-3 sm:flex-row md:mt-14">
            {children}
          </Reveal>
        )}

        {note && (
          <Reveal>
            <p className="mt-12 max-w-3xl text-sm leading-6 text-cf-muted">{note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * Bloco de texto com foto real ao lado (diferencial / quebra de objeção).
 * `media` (opcional) substitui a foto por outro elemento, como um vídeo.
 */
export function StatementWithPhoto({ id, trackArea, eyebrow, title, text, image, imageFallback, imageAlt, media, topics, children, reverse = false }) {
  return (
    <section id={id} data-track-area={trackArea} className="bg-cf-soft px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskText as="h2" lines={[title]} className="mt-6 cf-title-lg text-cf-black" />
          <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger(0.1, 0.2)}>
            {text.map((paragraph) => (
              <m.p key={paragraph} variants={variants.up} className="mt-6 max-w-xl text-lg leading-8 text-cf-muted">
                {paragraph}
              </m.p>
            ))}
            {topics && (
              <m.ul variants={variants.up} className="mt-8 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li key={topic} className="border border-cf-border bg-cf-background px-3.5 py-2 text-sm font-bold text-cf-navy">
                    {topic}
                  </li>
                ))}
              </m.ul>
            )}
            {children && (
              <m.div variants={variants.cta} className="mt-9 flex flex-col gap-3 sm:flex-row">
                {children}
              </m.div>
            )}
          </m.div>
        </div>

        {media && <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:col-start-8'}`}>{media}</div>}

        {!media && image && (
          <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:col-start-8'}`}>
            <ParallaxImage
              src={image}
              fallback={imageFallback}
              alt={imageAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              intensity={6}
              className="aspect-[4/3] w-full bg-cf-background lg:aspect-[4/5]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/** Chamada final em azul-marinho com WhatsApp em destaque e telefone. */
export function FinalCall({ title, text, cta, whatsapp }) {
  return (
    <section className="bg-cf-navy px-5 py-16 md:px-8 md:py-32" data-track-area="chamada-final">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="light">Próximo passo</Eyebrow>
        <MaskText as="h2" lines={[title]} className="mt-7 max-w-5xl cf-title-lg text-cf-offwhite" />
        <RevealLine className="mt-12 bg-cf-offwhite/20" delay={0.2} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.3} className="lg:col-span-6">
            <p className="max-w-2xl text-lg leading-8 text-cf-on-dark">{text}</p>
          </Reveal>
          <Reveal variant="cta" delay={0.45} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <PrimaryButton variant="light" href={whatsapp} external>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {cta}
            </PrimaryButton>
            <PrimaryButton variant="outline-light" href={`tel:+${site.phoneWhats}`}>
              <Phone aria-hidden="true" className="h-4 w-4" />
              {site.phoneHuman}
            </PrimaryButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   v22 — BLOCOS ACRESCENTADOS PARA A PÁGINA DE IMOBILIÁRIAS
   ============================================================ */

/** Faixa curta de credenciais logo abaixo do topo. */
export function CredentialStrip({ items }) {
  return (
    <section aria-label="Credenciais da CF Contabilidade" className="bg-cf-background px-5 pb-14 md:px-8 md:pb-20">
      <m.dl
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={stagger(0.08)}
        className={`mx-auto grid max-w-7xl gap-px border-y border-cf-border bg-cf-border ${items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}
      >
        {items.map((item) => (
          <m.div key={item.value} variants={variants.up} className="flex flex-col-reverse gap-1 bg-cf-background py-5 sm:px-6 lg:py-7">
            <dt className="text-sm leading-6 text-cf-muted">{item.label}</dt>
            <dd className="text-lg font-extrabold tracking-[-0.02em] text-cf-navy md:text-xl">{item.value}</dd>
          </m.div>
        ))}
      </m.dl>
    </section>
  );
}

/** Cartões numerados em fundo azul-marinho (ex.: reforma tributária). */
export function InsightCards({ id, eyebrow, title, intro, items, support, note, cta, whatsapp }) {
  return (
    <section id={id} className="bg-cf-navy px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <MaskText as="h2" lines={[title]} className="mt-6 cf-title-lg text-cf-offwhite" />
          </div>
          {intro && (
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-lg leading-8 text-cf-on-dark">{intro}</p>
            </Reveal>
          )}
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.1, 0.15)}
          className="mt-12 grid gap-px border border-cf-offwhite/15 bg-cf-offwhite/15 md:mt-16 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, index) => (
            <m.li key={item.title} variants={variants.up} className="bg-cf-navy p-6 md:p-8">
              <span className="cf-numeral text-sm text-cf-offwhite/60">{pad(index + 1)}</span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug text-cf-offwhite">{item.title}</h3>
              <p className="mt-3 leading-7 text-cf-on-dark">{item.text}</p>
            </m.li>
          ))}
        </m.ol>

        {support && (
          <Reveal className="mt-10 grid gap-4 border-b border-cf-offwhite/15 pb-10 md:mt-12 md:grid-cols-12 md:gap-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cf-offwhite md:col-span-4">{support.title}</p>
            <ul className="grid gap-3 md:col-span-8 md:grid-cols-3 md:gap-6">
              {support.items.map((point) => (
                <li key={point} className="flex gap-3 leading-7 text-cf-on-dark">
                  <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 bg-cf-offwhite" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <div className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-12 lg:items-center">
          {note && (
            <Reveal className="lg:col-span-7">
              <p className="max-w-2xl text-sm leading-6 text-cf-on-dark/80">{note}</p>
            </Reveal>
          )}
          {cta && whatsapp && (
            <Reveal variant="cta" delay={0.15} className="lg:col-span-5 lg:justify-self-end">
              <PrimaryButton variant="light" href={whatsapp} external>
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {cta}
              </PrimaryButton>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Vídeo vertical hospedado no próprio site (sem YouTube, sem cookies).
 * Só baixa o arquivo quando a pessoa aperta o play (preload="none").
 * Registra "video_play" no dataLayer para a medição.
 */
export function PortraitVideo({ src, poster, label, caption }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <figure className="mx-auto w-full max-w-sm">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-cf-navy">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          controls={started}
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => {
            setStarted(true);
            trackEvent('video_play', { video_title: label });
          }}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-cf-navy/80 via-cf-navy/10 to-transparent p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cf-offwhite"
          >
            <span className="inline-flex items-center gap-3 text-sm font-bold text-cf-offwhite">
              <span className="flex h-12 w-12 items-center justify-center bg-cf-offwhite text-cf-navy transition-transform duration-300 ease-cf group-hover:scale-105">
                <Play aria-hidden="true" className="h-5 w-5 translate-x-0.5 fill-current" />
              </span>
              Assistir à palestra
            </span>
            <span className="sr-only">{label}</span>
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-6 text-cf-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Perguntas frequentes (abre e fecha), com link opcional na resposta. */
export function FaqList({ id, eyebrow, title, items }) {
  const [open, setOpen] = useState(0);
  return (
    <section id={id} className="bg-cf-background px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskText as="h2" lines={[title]} className="mt-6 cf-title-lg text-cf-black" />
        </div>
        <Reveal className="border-t border-cf-border lg:col-span-6 lg:col-start-7">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${id}-resposta-${index}`;
            return (
              <div key={item.q} className="border-b border-cf-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left text-lg font-extrabold leading-7 text-cf-black focus:outline-none focus-visible:ring-2 focus-visible:ring-cf-blue md:py-6"
                  >
                    {item.q}
                    <Plus aria-hidden="true" className={`mt-1 h-5 w-5 shrink-0 text-cf-blue transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div id={panelId} role="region" hidden={!isOpen} className="pb-6 pr-10">
                  <p className="leading-7 text-cf-muted">{item.a}</p>
                  {item.link && (
                    <a href={item.link.href} className="cf-link mt-3 text-cf-blue">
                      {item.link.label}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Fechamento em azul-marinho: oferta (ex.: diagnóstico) em passos curtos,
 * WhatsApp + telefone e respostas rápidas às objeções mais comuns.
 */
export function ClosingSteps({ id, eyebrow = 'Próximo passo', title, intro, items, cta, whatsapp, objections }) {
  return (
    <section id={id} className="bg-cf-navy px-5 py-16 md:px-8 md:py-28" data-track-area="chamada-final">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <MaskText as="h2" lines={[title]} className="mt-7 cf-title-lg text-cf-offwhite" />
          </div>
          {intro && (
            <Reveal delay={0.2} className="lg:col-span-5">
              <p className="text-lg leading-8 text-cf-on-dark">{intro}</p>
            </Reveal>
          )}
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1, 0.15)}
          className={`mt-12 grid gap-8 border-t border-cf-offwhite/20 pt-10 sm:grid-cols-2 md:mt-14 ${STEP_COLUMNS[items.length] || STEP_COLUMNS[4]}`}
        >
          {items.map((step, index) => (
            <m.li key={step.title} variants={variants.up}>
              <span className="cf-numeral block text-4xl leading-none text-cf-offwhite">{pad(index + 1)}</span>
              <h3 className="mt-4 text-lg font-extrabold leading-snug text-cf-offwhite">{step.title}</h3>
              <p className="mt-2 leading-7 text-cf-on-dark">{step.text}</p>
            </m.li>
          ))}
        </m.ol>

        <RevealLine className="mt-12 bg-cf-offwhite/20" delay={0.1} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal variant="cta" className="flex flex-col gap-3 sm:flex-row lg:col-span-6">
            <PrimaryButton variant="light" href={whatsapp} external>
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {cta}
            </PrimaryButton>
            <PrimaryButton variant="outline-light" href={`tel:+${site.phoneWhats}`}>
              <Phone aria-hidden="true" className="h-4 w-4" />
              {site.phoneHuman}
            </PrimaryButton>
          </Reveal>
          {objections && (
            <Reveal delay={0.15} className="lg:col-span-6">
              <ul className="grid gap-3 text-sm leading-6 text-cf-on-dark lg:justify-items-end lg:text-right">
                {objections.map((item) => (
                  <li key={item.text}>
                    {item.text}{' '}
                    {item.link && (
                      <a href={item.link.href} className="font-bold text-cf-offwhite underline decoration-cf-offwhite/40 underline-offset-4 hover:decoration-cf-offwhite">
                        {item.link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
