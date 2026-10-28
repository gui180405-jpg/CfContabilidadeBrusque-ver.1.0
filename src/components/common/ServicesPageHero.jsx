import { ArrowDown, ArrowRight } from 'lucide-react';
import PageHero from './PageHero';
import PrimaryButton from './PrimaryButton';
import ProcessTimeline from '../editorial/ProcessTimeline';
import { site } from '../../content/siteContent';

/*
============================================================
SERVIÇOS HERO — EDITORIAL
============================================================
- título grande com entrada por máscara;
- foto real da equipe em recorte vertical;
- o método (Diagnóstico → Organização → Acompanhamento) vira
  um percurso com linha que se desenha, logo abaixo do topo.
============================================================
*/

const trustPoints = [
  'rotina acompanhada',
  'prazos mais claros',
  'obrigações organizadas',
];

const methodHighlights = [
  { number: '01', title: 'Diagnóstico', text: 'entender o momento da empresa' },
  { number: '02', title: 'Organização', text: 'estruturar documentos, prazos e informações' },
  { number: '03', title: 'Acompanhamento', text: 'dar mais segurança à rotina' },
];

export default function ServicesPageHero({ eyebrow, title, description }) {
  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      points={trustPoints}
      imageSrc={site.photos.servicesWork}
      imageFallback={site.receptionImage}
      imageAlt="Rose Michei e Emilly, da equipe da CF Contabilidade, revisando informações no computador"
      imageClassName="object-cover object-[55%_30%]"
      bottom={<ProcessTimeline steps={methodHighlights} headingAs="h2" />}
    >
      <PrimaryButton href="/diagnostico">
        Analisar minha situação contábil
        <ArrowRight className="h-4 w-4" />
      </PrimaryButton>

      <PrimaryButton href="#servicos" variant="outline">
        Ver áreas atendidas
        <ArrowDown className="h-4 w-4" />
      </PrimaryButton>
    </PageHero>
  );
}
