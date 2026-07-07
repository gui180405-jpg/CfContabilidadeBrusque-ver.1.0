import ServicesPageHero from '../components/common/ServicesPageHero';
import ServicesSection from '../components/landing/ServicesSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import { site } from '../content/siteContent';

export default function ServicesPage({ onStartQuiz }) {
  return (
    <>
      <ServicesPageHero
        eyebrow="Serviços contábeis"
        title="Da abertura da empresa à rotina fiscal, trabalhista e contábil."
        description="A CF organiza obrigações, prazos e informações para que sua empresa tenha uma base contábil mais segura, previsível e alinhada ao crescimento do seu negócio."
        image={site.receptionImage}
        onStartQuiz={onStartQuiz}
      />

      <ServicesSection />
      <FAQSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
