import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import LocationSection from '../components/landing/LocationSection';
import FAQSection from '../components/landing/FAQSection';
import { site } from '../content/siteContent';

export default function ContactPage({ onStartQuiz }) {
  const whatsappUrl = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a CF Contabilidade Brusque."
        description="Entre em contato pelo WhatsApp, telefone, e-mail ou visite nosso escritório em Brusque-SC."
        image={site.receptionImage}
      >
        <PrimaryButton href={whatsappUrl} external>Falar no WhatsApp</PrimaryButton>
        <button
          type="button"
          onClick={onStartQuiz}
          className="rounded-xl border border-slate-300 bg-white/84 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-800 md:text-base"
        >
          Fazer diagnóstico
        </button>
      </PageHero>
      <LocationSection />
      <FAQSection />
    </>
  );
}
