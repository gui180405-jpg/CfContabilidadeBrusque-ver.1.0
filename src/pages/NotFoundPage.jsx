import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';

export default function NotFoundPage({ navigate }) {
  return (
    <PageHero
      eyebrow="Página não encontrada"
      title="Essa página não existe ou foi movida."
      description="Volte para a página inicial ou fale com a CF pelo WhatsApp."
    >
      <PrimaryButton onClick={() => navigate('/')}>Voltar para o início</PrimaryButton>
    </PageHero>
  );
}
