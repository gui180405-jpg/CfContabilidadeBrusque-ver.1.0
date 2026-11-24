import { SectorHero, RecognitionList, StepsRow, StatementWithPhoto, FinalCall } from '../../components/segmentos/SectorSections';
import PrimaryButton from '../../components/common/PrimaryButton';
import { MessageCircle } from 'lucide-react';
import { troca as c } from '../../content/paginasSegmento';

/*
  PÁGINA POR SEGMENTO — Troque de contador
  Endereço: /troque-de-contador
  Textos em src/content/paginasSegmento.js
  Regra: não falar mal de outros escritórios (NBC PG 01) e não prometer prazos.
*/
export default function TrocaContadorPage() {
  return (
    <>
      <SectorHero hero={c.hero} whatsapp={c.whatsapp} secondary={{ href: '#como-funciona', label: 'Ver como funciona' }} />
      <RecognitionList id="quando-trocar" {...c.moments} />
      <StepsRow id="como-funciona" {...c.steps} />
      <StatementWithPhoto
        {...c.objections}
        image="/fotos/rose-ambiente-trabalho.jpg"
        imageFallback="/cf-recepcao-brasil.webp"
        imageAlt="Rose Michei, responsável pela CF Contabilidade, trabalhando no escritório em Brusque"
        reverse
      >
        <PrimaryButton href={c.whatsapp} external>
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Tirar minhas dúvidas
        </PrimaryButton>
      </StatementWithPhoto>
      <FinalCall {...c.final} whatsapp={c.whatsapp} />
    </>
  );
}
