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
        title="Serviços contábeis para empresas que precisam de rotina, clareza e segurança."
        description="Da abertura do CNPJ ao acompanhamento mensal, a CF organiza obrigações fiscais, contábeis, trabalhistas e societárias para que sua empresa tenha mais previsibilidade."
        image={site.officeImage}
        onStartQuiz={onStartQuiz}
      />

      <ServicesSection />
      <FAQSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
