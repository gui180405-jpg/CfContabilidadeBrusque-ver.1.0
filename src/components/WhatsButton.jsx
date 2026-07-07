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
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a CF Contabilidade pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-4 text-white shadow-2xl shadow-green-950/30 transition hover:-translate-y-1 hover:bg-green-600 md:px-5"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-bold md:inline">Falar com contador</span>
    </a>
  );
}
