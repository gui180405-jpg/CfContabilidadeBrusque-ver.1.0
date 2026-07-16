import HeroSection from '../components/landing/HeroSection';
import CFOperatingSystemSection from '../components/landing/CFOperatingSystemSection';
import JourneySection from '../components/landing/JourneySection';
import SpecialtiesSection from '../components/landing/SpecialtiesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';
import LocationSection from '../components/landing/LocationSection';

/*
============================================================
PÁGINA INICIAL — NOVO AR
============================================================
A Home agora alterna:
- hero escuro com interface;
- seção clara com sistema visual;
- jornada assimétrica;
- segmentos/processo/localização/CTA.
============================================================
*/

export default function HomePage({ onStartQuiz, navigate }) {
  return (
    <>
      <HeroSection onStartQuiz={onStartQuiz} navigate={navigate} />
      <CFOperatingSystemSection onStartQuiz={onStartQuiz} navigate={navigate} />
      <JourneySection navigate={navigate} onStartQuiz={onStartQuiz} />
      <SpecialtiesSection />
      <HowItWorksSection />
      <LocationSection compact />
      <CTASection onStartQuiz={onStartQuiz} />
    </>
  );
}
