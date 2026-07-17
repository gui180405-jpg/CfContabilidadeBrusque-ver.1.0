import ServicesPageHero from '../components/common/ServicesPageHero';
import ServicesSection from '../components/landing/ServicesSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';

export default function ServicesPage({ onStartQuiz }) {
  return (
    <>
      <ServicesPageHero
        eyebrow="Serviços contábeis"
        title="Serviços contábeis para organizar a rotina da sua empresa."
        description="A CF acompanha abertura, fiscal, contábil, trabalhista e regularização para que prazos, impostos, documentos e decisões fiquem mais claros."
        onStartQuiz={onStartQuiz}
      />

      <ServicesSection />
      <FAQSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
