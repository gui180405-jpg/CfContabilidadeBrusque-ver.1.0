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
        title="Serviços contábeis organizados para dar clareza à rotina da sua empresa."
        description="A CF acompanha as principais áreas da rotina empresarial para que obrigações, documentos, prazos e informações não fiquem espalhados ou tratados apenas na urgência."
        image={site.officeImage}
        onStartQuiz={onStartQuiz}
      />

      <ServicesSection />
      <FAQSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
