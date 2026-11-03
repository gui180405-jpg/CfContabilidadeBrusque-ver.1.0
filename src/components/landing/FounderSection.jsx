import { useCallback, useState } from 'react';
import { m } from 'framer-motion';
import { Award, MessageSquareHeart, Play, ShieldCheck, TrendingUp } from 'lucide-react';
import { Eyebrow, MaskText, Stagger, StaggerItem } from '../motion/primitives';
import { EASE, VIEWPORT, stagger, variants } from '../motion/motionConfig';
import { site } from '../../content/siteContent';
import PhotoImage from '../common/PhotoImage';
import VideoDialog from '../common/VideoDialog';

/*
============================================================
FOUNDER SECTION — ROSE + VÍDEO
============================================================
- foto da Rose clicável (abre o vídeo em modal);
- composição editorial: retrato grande, citação em destaque,
  provas de confiança em uma grade de linhas (sem cards).
============================================================
*/

const trustPoints = [
  { icon: Award, title: '17+ anos', text: 'experiência na área contábil' },
  { icon: ShieldCheck, title: 'CRC ativo', text: 'credibilidade profissional' },
  { icon: MessageSquareHeart, title: 'Atendimento próximo', text: 'suporte claro e humanizado' },
  { icon: TrendingUp, title: 'Visão estratégica', text: 'organização para decisões melhores' },
];

export default function FounderSection() {
  const [showVideo, setShowVideo] = useState(false);
  const closeVideo = useCallback(() => setShowVideo(false), []);

  return (
    <section id="sobre" className="bg-cf-soft px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Quem está à frente</Eyebrow>
            <MaskText
              as="h2"
              className="mt-6 cf-title-lg text-cf-black"
              lines={['Conheça a contadora', 'por trás da CF']}
            />
          </div>
          <Stagger className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <StaggerItem as="p" className="text-base leading-7 text-cf-muted md:text-lg md:leading-8">
              A confiança também nasce quando você sabe quem conduz a orientação contábil da sua empresa.
            </StaggerItem>
          </Stagger>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <m.button
              type="button"
              onClick={() => setShowVideo(true)}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={variants.image}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-cf-soft text-left"
              aria-label="Assistir apresentação da Rose Michei"
            >
              <m.div
                className="absolute inset-0"
                variants={{ hover: { scale: 1.03, transition: { duration: 1.2, ease: EASE } } }}
              >
                <PhotoImage
                  src={site.founderImage}
                  alt="Rose Michei, contadora e fundadora da CF Contabilidade Brusque"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                  decoding="async"
                />
              </m.div>
              <div className="absolute inset-0 bg-gradient-to-t from-cf-navy/75 via-transparent to-transparent" />

              <span className="cf-label absolute right-0 top-0 bg-cf-blue px-4 py-2.5 text-cf-offwhite">CEO & Fundadora</span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="cf-label text-cf-on-dark">Assistir apresentação</p>
                  <p className="mt-1 text-lg font-extrabold text-cf-offwhite">Clique na foto</p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-cf-offwhite text-cf-black transition-colors duration-300 group-hover:bg-cf-blue group-hover:text-cf-offwhite">
                  <Play className="ml-0.5 h-5 w-5" />
                </span>
              </div>
            </m.button>

            <p className="mt-5 flex items-center gap-2 text-sm text-cf-muted">
              <Play className="h-3.5 w-3.5" />
              Clique na foto para assistir ao vídeo
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Stagger gap={0.12}>
              <StaggerItem as="p" className="cf-label text-cf-blue">Rose Michei</StaggerItem>
              <StaggerItem as="h3" className="mt-5 text-3xl font-black leading-[1.08] tracking-[-0.035em] text-cf-black md:text-[2.6rem]">
                Experiência, clareza e proximidade na rotina contábil.
              </StaggerItem>
              <StaggerItem as="p" className="mt-6 max-w-2xl text-lg leading-8 text-cf-muted">
                Com mais de <span className="font-semibold text-cf-black">17 anos de experiência</span> na área contábil, Rose Michei lidera a CF Contabilidade Brusque com foco em organização, orientação responsável e suporte próximo para empresas que querem crescer com segurança.
              </StaggerItem>
            </Stagger>

            <m.blockquote
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={stagger(0.15, 0.1)}
              className="relative mt-12 grid grid-cols-[2px_1fr] gap-6"
            >
              <m.span aria-hidden="true" variants={variants.lineY} className="block origin-top bg-cf-blue" />
              <m.p variants={variants.up} className="text-xl font-medium italic leading-9 tracking-[-0.01em] text-cf-black md:text-2xl md:leading-10">
                “A contabilidade vai muito além dos números. Ela precisa ajudar o empresário a tomar decisões com mais clareza.”
              </m.p>
            </m.blockquote>

            <m.ul
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={stagger(0.08, 0.1)}
              className="mt-12 grid border-t border-cf-border sm:grid-cols-2"
            >
              {trustPoints.map((point, index) => (
                <m.li
                  key={point.title}
                  variants={variants.up}
                  className={`group flex gap-4 border-b border-cf-border py-6 sm:pr-6 ${index % 2 === 1 ? 'sm:border-l sm:pl-6' : ''}`}
                >
                  <point.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cf-blue transition-transform duration-500 ease-cf group-hover:-translate-y-0.5" />
                  <div>
                    <p className="font-extrabold text-cf-black">{point.title}</p>
                    <p className="mt-1 text-sm text-cf-muted">{point.text}</p>
                  </div>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </div>

      <VideoDialog open={showVideo} onClose={closeVideo} />
    </section>
  );
}
