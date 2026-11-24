import { MessageCircle, Mic } from 'lucide-react';
import {
  SectorHero,
  CredentialStrip,
  ServiceRows,
  InsightCards,
  StatementWithPhoto,
  PortraitVideo,
  ClosingSteps,
} from '../../components/segmentos/SectorSections';
import PrimaryButton from '../../components/common/PrimaryButton';
import { imobiliarias as c } from '../../content/paginasSegmento';

/*
  PÁGINA POR SEGMENTO — Contabilidade para imobiliárias (v23)
  Endereço: /contabilidade-para-imobiliarias
  Textos em src/content/paginasSegmento.js

  Jornada (cada bloco tem uma função):
   1 Topo — atenção · 2 Credenciais — confiança rápida
   3 A operação — reconhecimento + solução · 4 Reforma — autoridade técnica
   5 Rose e a palestra — autoridade pessoal · 6 Diagnóstico — conversão
*/
export default function ImobiliariasPage() {
  return (
    <>
      <SectorHero hero={c.hero} whatsapp={c.whatsappDiagnostico} secondary={{ href: '#operacao', label: 'Ver o que a CF cuida' }} />
      <CredentialStrip items={c.credentials} />
      <ServiceRows id="operacao" tone="soft" {...c.operation} whatsapp={c.whatsapp} />
      <InsightCards id="reforma" {...c.reforma} whatsapp={c.whatsappReforma} />

      <StatementWithPhoto
        id="quem-conduz"
        trackArea="quem-conduz"
        eyebrow={c.rose.eyebrow}
        title={c.rose.title}
        text={c.rose.text}
        media={<PortraitVideo {...c.rose.video} />}
      >
        <PrimaryButton href={c.whatsappRose} external>
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          {c.rose.cta}
        </PrimaryButton>
        <PrimaryButton href={c.whatsappPalestra} external variant="outline" data-track="palestra">
          <Mic aria-hidden="true" className="h-4 w-4" />
          {c.rose.ctaPalestra}
        </PrimaryButton>
      </StatementWithPhoto>

      <ClosingSteps id="diagnostico-imobiliario" {...c.diagnostico} whatsapp={c.whatsappDiagnostico} />
    </>
  );
}
