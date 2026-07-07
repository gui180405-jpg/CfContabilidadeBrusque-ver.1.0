import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import FounderSection from '../components/landing/FounderSection';
import CTASection from '../components/landing/CTASection';
import { site } from '../content/siteContent';

export default function AboutPage({ onStartQuiz }) {
  return (
    <>
      <PageHero
        eyebrow="Sobre a CF"
        title="Contabilidade próxima, organizada e comprometida com a rotina da sua empresa."
        description="A CF Contabilidade Brusque atua com foco em clareza, responsabilidade e acompanhamento próximo para empresas que precisam manter obrigações em dia e tomar decisões com segurança."
        image={site.officeImage}
      >
        <PrimaryButton onClick={onStartQuiz}>Conversar sobre minha empresa</PrimaryButton>
      </PageHero>
      <FounderSection />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
