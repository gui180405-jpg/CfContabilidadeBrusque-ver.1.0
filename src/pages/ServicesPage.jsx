import ServicesPageHero from '../components/common/ServicesPageHero';
import ServicesSection from '../components/landing/ServicesSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';

export default function ServicesPage({ onStartQuiz }) {
  return (
    <>
      <ServicesPageHero
        eyebrow="Serviços contábeis"
        title="Organização contábil para empresas que precisam sair da correria."
        description="A CF acompanha abertura, fiscal, contábil, trabalhista e regularização para que a empresa tenha mais clareza sobre prazos, impostos, documentos e decisões."
        onStartQuiz={onStartQuiz}
      />

      <ServicesSection />
      <FAQSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
