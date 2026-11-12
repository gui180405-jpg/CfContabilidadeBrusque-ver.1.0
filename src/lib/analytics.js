/*
============================================================
MEDIÇÃO — Google Tag Manager (GTM)
============================================================
O que este arquivo faz:
1. Carrega o Google Tag Manager SOMENTE se o ID do contêiner estiver
   preenchido em src/content/siteContent.js (campo site.gtmId).
   Enquanto ele estiver vazio, nada do Google é carregado.
2. Envia para o GTM (window.dataLayer) os eventos que o Google Ads e o
   Google Analytics 4 usam como conversão:
   - whatsapp_click        → clique em qualquer link do WhatsApp (wa.me)
   - phone_click           → clique em link de telefone (tel:)
   - email_click           → clique em link de e-mail (mailto:)
   - diagnostico_concluido → a pessoa respondeu as 4 perguntas do diagnóstico
3. Cada evento leva:
   - link_location: a área da página onde estava o botão
     (ex.: "diagnostico", "rodape", "botao-flutuante")
   - page_path: a página onde o clique aconteceu

Privacidade: nenhuma resposta do diagnóstico, nome, telefone ou e-mail
do visitante é enviado. O aviso "Suas respostas não são salvas no site"
continua verdadeiro.

O carregamento é feito por um arquivo externo (gtm.js), sem script inline,
para funcionar com a política de segurança (CSP) do vercel.json.
============================================================
*/
import { site } from '../content/siteContent';

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
let started = false;

function dataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  dataLayer().push({ event, page_path: window.location.pathname, ...params });
}

function locationOf(anchor) {
  if (anchor.dataset.track) return anchor.dataset.track;
  const area = anchor.closest('[data-track-area], section[id], header, footer, nav');
  if (!area) return 'pagina';
  if (area.dataset.trackArea) return area.dataset.trackArea;
  if (area.id) return area.id;
  return { HEADER: 'topo', FOOTER: 'rodape', NAV: 'menu' }[area.tagName] || 'pagina';
}

function onDocumentClick(event) {
  const anchor = event.target.closest?.('a[href]');
  if (!anchor) return;
  const href = anchor.getAttribute('href') || '';
  let name = null;
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) name = 'whatsapp_click';
  else if (/^tel:/i.test(href)) name = 'phone_click';
  else if (/^mailto:/i.test(href)) name = 'email_click';
  if (!name) return;
  trackEvent(name, { link_location: locationOf(anchor) });
}

export function initAnalytics() {
  if (started || typeof window === 'undefined') return;
  started = true;

  // Os eventos de clique são registrados sempre; sem GTM, só ficam no dataLayer.
  document.addEventListener('click', onDocumentClick, { capture: true });

  const id = String(site.gtmId || '').trim().toUpperCase();
  if (!GTM_ID_PATTERN.test(id)) return;

  dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}
