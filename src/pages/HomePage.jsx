import HeroSection from '../components/landing/HeroSection';
import SpecialtiesSection from '../components/landing/SpecialtiesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';
import LocationSection from '../components/landing/LocationSection';

/*
============================================================
PÁGINA INICIAL
============================================================
Home mais limpa e menos poluída:
- Hero institucional em duas colunas;
- segmentos atendidos;
- como funciona;
- CTA final.
============================================================
*/

export default function HomePage({ onStartQuiz, navigate }) {
  return (
    <>
      <HeroSection onStartQuiz={onStartQuiz} navigate={navigate} />
      <SpecialtiesSection />
      <HowItWorksSection />
      <LocationSection compact />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
