import PageHero from '../components/common/PageHero';
import QuizSection from '../components/landing/QuizSection';

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnóstico contábil"
        title="Organize o contexto da sua empresa antes de falar com a CF."
        description="Responda algumas perguntas rápidas. Ao final, suas respostas serão enviadas pelo WhatsApp para facilitar uma orientação inicial mais objetiva."
      />
      <QuizSection />
    </>
  );
}
