import { MessageCircle } from 'lucide-react';
import { site } from '../content/siteContent';

/*
============================================================
BOTÃO FLUTUANTE DO WHATSAPP
============================================================
Função:
- Captar pessoas que não querem responder o quiz.
- Não substitui o quiz; é um atalho discreto.

Para trocar a mensagem padrão:
- Edite site.whatsappDefaultMessage em src/content/siteContent.js.
============================================================
*/

export default function WhatsButton() {
  const url = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <aside aria-label="Atalho para o WhatsApp">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a CF Contabilidade pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-cf-blue px-4 py-4 text-cf-offwhite shadow-soft transition-colors duration-300 hover:bg-cf-navy md:px-5"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="hidden text-sm font-bold md:inline">Falar com contador</span>
    </a>
    </aside>
  );
}
