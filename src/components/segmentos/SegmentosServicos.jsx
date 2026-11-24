import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';
import { Eyebrow, MaskText, ParallaxImage } from '../motion/primitives';
import { finalPaths } from '../../content/paginasSegmento';

/*
============================================================
ATENDIMENTO POR SEGMENTO — bloco da página de Serviços
============================================================
Leva para as páginas específicas de cada segmento. Hoje: imobiliárias.
Para incluir outro segmento no futuro, acrescente um item em `segmentos`.
============================================================
*/

const segmentos = [
  {
    href: finalPaths.imobiliarias,
    title: 'Contabilidade para imobiliárias',
    text: 'Repasses a proprietários, valores de terceiros, comissões, DIMOB e a reforma tributária na locação e na venda. Uma página só para a rotina de imobiliárias e administradoras de imóveis.',
    cta: 'Conhecer a contabilidade para imobiliárias',
    image: '/cf-escritorio-vista.webp',
    imageAlt: 'Escritório da CF Contabilidade com vista para os prédios do centro de Brusque',
  },
];

export default function SegmentosServicos() {
  return (
    <section id="segmentos" className="scroll-mt-20 bg-cf-background px-5 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Atendimento por segmento</Eyebrow>
        {segmentos.map((item) => (
          <div key={item.href} className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <MaskText as="h2" lines={[item.title]} className="cf-title-lg text-cf-black" />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-lg leading-8 text-cf-muted">{item.text}</p>
              </Reveal>
              <Reveal variant="cta" delay={0.3}>
                <a href={item.href} className="cf-link mt-8 text-cf-blue">
                  {item.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <a href={item.href} tabIndex={-1} aria-hidden="true" className="block">
                <ParallaxImage
                  src={item.image}
                  alt=""
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  intensity={6}
                  className="aspect-[4/3] w-full bg-cf-soft"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
