import { m } from 'framer-motion';
import { Eyebrow, MaskText, ParallaxImage, Stagger, StaggerItem } from '../motion/primitives';
import { variants } from '../motion/motionConfig';

/*
============================================================
PAGE HERO / TOPO DE PÁGINA INTERNA — EDITORIAL
============================================================
Composição assimétrica: título grande à esquerda, imagem (ou
outro elemento em `aside`) à direita. Sem imagem, o título
ocupa a largura com o texto deslocado à direita.

Entrada ao montar (não depende de scroll):
label → título linha a linha → texto → ações → pontos → imagem.

Props:
- eyebrow, title | lines, description
- image (url) | imageSrc + imageFallback + imageAlt
- aside: conteúdo próprio no lugar da imagem (ex.: celular do Contato)
- points: lista curta de microinformações
- tone: 'light' | 'dark'
- children: ações (botões)
============================================================
*/

export default function PageHero({
  eyebrow,
  title,
  lines,
  description,
  image,
  imageSrc,
  imageFallback,
  imageAlt = 'Imagem institucional da CF Contabilidade Brusque',
  imageClassName = 'object-cover object-center',
  aside,
  points,
  tone = 'light',
  children,
  bottom,
}) {
  const isDark = tone === 'dark';
  const src = imageSrc || image;
  const hasAside = Boolean(src || aside);

  return (
    <section className={`relative px-5 pb-12 pt-28 md:px-8 md:pb-24 md:pt-40 ${isDark ? 'bg-cf-navy' : 'bg-cf-background'}`}>
      <div className={`mx-auto grid max-w-7xl gap-10 md:gap-12 ${hasAside ? 'lg:grid-cols-12 lg:items-end lg:gap-10' : ''}`}>
        <div className={hasAside ? 'lg:col-span-7' : ''}>
          {eyebrow && (
            <Eyebrow mount tone={isDark ? 'light' : 'blue'}>
              {eyebrow}
            </Eyebrow>
          )}

          <MaskText
            as="h1"
            mount
            delay={0.15}
            lines={lines || [title]}
            className={`mt-6 cf-title-xl md:mt-7 ${hasAside ? 'max-w-5xl' : 'max-w-6xl'} ${isDark ? 'text-white' : 'text-cf-navy'}`}
          />

          {hasAside ? (
            <Stagger mount delay={0.55} gap={0.08}>
              {description && (
                <StaggerItem as="p" className={`mt-6 max-w-2xl text-lg leading-8 md:mt-8 md:text-xl md:leading-9 ${isDark ? 'text-cf-on-dark' : 'text-cf-muted'}`}>
                  {description}
                </StaggerItem>
              )}

              {children && (
                <StaggerItem variant="cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9">
                  {children}
                </StaggerItem>
              )}

              {points?.length > 0 && (
                <StaggerItem as="ul" variant="fade" className={`mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t pt-5 md:mt-10 ${isDark ? 'border-white/15' : 'border-cf-border'}`}>
                  {points.map((point) => (
                    <li key={point} className={`inline-flex items-center gap-2.5 text-sm font-semibold ${isDark ? 'text-cf-on-dark' : 'text-cf-muted'}`}>
                      <span aria-hidden="true" className="h-1.5 w-1.5 bg-cf-blue" />
                      {point}
                    </li>
                  ))}
                </StaggerItem>
              )}
            </Stagger>
          ) : (
            /* Sem imagem: texto à esquerda, pontos à direita — sem vazio na composição. */
            <Stagger
              mount
              delay={0.55}
              gap={0.08}
              className={`mt-8 grid gap-8 border-t pt-8 md:mt-12 md:pt-10 lg:grid-cols-12 lg:gap-10 ${isDark ? 'border-white/15' : 'border-cf-border'}`}
            >
              <div className="lg:col-span-7">
                {description && (
                  <StaggerItem as="p" className={`max-w-2xl text-lg leading-8 md:text-xl md:leading-9 ${isDark ? 'text-cf-on-dark' : 'text-cf-muted'}`}>
                    {description}
                  </StaggerItem>
                )}

                {children && (
                  <StaggerItem variant="cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9">
                    {children}
                  </StaggerItem>
                )}
              </div>

              {points?.length > 0 && (
                <StaggerItem as="ul" variant="fade" className="lg:col-span-4 lg:col-start-9">
                  {points.map((point, index) => (
                    <li
                      key={point}
                      className={`flex items-baseline gap-4 border-b py-3 text-sm font-semibold first:pt-0 last:border-b-0 md:text-base ${
                        isDark ? 'border-white/15 text-cf-on-dark' : 'border-cf-border text-cf-navy'
                      }`}
                    >
                      <span className={`cf-numeral text-xs ${isDark ? 'text-cf-on-dark/75' : 'text-cf-blue'}`}>{String(index + 1).padStart(2, '0')}</span>
                      {point}
                    </li>
                  ))}
                </StaggerItem>
              )}
            </Stagger>
          )}
        </div>

        {src && (
          <div className="lg:col-span-5">
            <ParallaxImage
              mount
              src={src}
              fallback={imageFallback}
              alt={imageAlt}
              imgClassName={imageClassName}
              sizes="(min-width: 1024px) 40vw, 100vw"
              loading="eager"
              className="aspect-[4/3] w-full bg-cf-soft sm:aspect-[16/11] lg:aspect-[4/5]"
            />
          </div>
        )}

        {!src && aside && (
          <m.div initial="hidden" animate="visible" variants={variants.up} custom={0.35} className="lg:col-span-5">
            {aside}
          </m.div>
        )}
      </div>

      {bottom && <div className="mx-auto mt-12 max-w-7xl md:mt-24">{bottom}</div>}
    </section>
  );
}
