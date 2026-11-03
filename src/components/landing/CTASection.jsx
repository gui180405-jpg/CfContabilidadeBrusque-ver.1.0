import { ArrowRight, Phone } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import Reveal from '../common/Reveal';
import { Eyebrow, MaskText, RevealLine } from '../motion/primitives';
import { site } from '../../content/siteContent';

/*
  CTA final — bloco navy de largura total, tipografia grande,
  linha que se desenha separando a pergunta das ações.
*/

export default function CTASection() {
  return (
    <section className="cf-defer bg-cf-navy px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="light">Próximo passo</Eyebrow>

        <MaskText
          as="h2"
          className="mt-7 max-w-5xl cf-title-lg text-cf-offwhite"
          lines={['Vamos entender a situação', 'contábil da sua empresa?']}
        />

        <RevealLine className="mt-12 bg-cf-offwhite/20" delay={0.2} />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.3} className="lg:col-span-6">
            <p className="max-w-2xl text-lg leading-8 text-cf-on-dark">
              Responda o diagnóstico ou fale diretamente com a CF. O objetivo é iniciar uma conversa com clareza e responsabilidade.
            </p>
          </Reveal>

          <Reveal variant="cta" delay={0.45} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <PrimaryButton variant="light" href="/diagnostico">
              Começar diagnóstico
              <ArrowRight className="h-4 w-4" />
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
