import HeroSection from '../components/landing/HeroSection';
import JourneySection from '../components/landing/JourneySection';
import SpecialtiesSection from '../components/landing/SpecialtiesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';
import LocationSection from '../components/landing/LocationSection';

/*
============================================================
PÁGINA INICIAL
============================================================
A Home passa a conduzir o visitante:
promessa → jornada → segmentos → processo → contato.
============================================================
*/

export default function HomePage({ onStartQuiz, navigate }) {
  return (
    <>
      <HeroSection onStartQuiz={onStartQuiz} navigate={navigate} />
      <JourneySection navigate={navigate} onStartQuiz={onStartQuiz} />
      <SpecialtiesSection />
      <HowItWorksSection />
      <LocationSection compact />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
