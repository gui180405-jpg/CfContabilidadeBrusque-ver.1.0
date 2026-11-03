import { ArrowRight, MessageCircle } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import PrimaryButton from '../components/common/PrimaryButton';
import { navItems, site } from '../content/siteContent';

const whatsappHref = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="Página não encontrada"
        title="Essa página não existe ou foi movida."
        description="Volte para a página inicial, escolha uma das páginas abaixo ou fale com a CF pelo WhatsApp."
      >
        <PrimaryButton href="/">
          Voltar para o início
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </PrimaryButton>
        <PrimaryButton href={whatsappHref} external variant="outline">
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Falar pelo WhatsApp
        </PrimaryButton>
      </PageHero>

      <nav aria-label="Páginas do site" className="bg-cf-background px-5 pb-20 md:px-8 md:pb-28">
        <ul className="mx-auto grid max-w-7xl border-t border-cf-border sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-cf-border">
              <a href={item.href} className="flex min-h-[56px] items-center justify-between py-4 pr-4 font-bold text-cf-black hover:text-cf-blue">
                {item.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
