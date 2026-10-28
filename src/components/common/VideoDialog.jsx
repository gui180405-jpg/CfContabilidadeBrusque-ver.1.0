import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE } from '../motion/motionConfig';
import { site } from '../../content/siteContent';

/*
============================================================
VÍDEO DA ROSE EM JANELA (modal) — usado na Home e no Sobre
============================================================
- abre com o foco no botão "Fechar"; Tab fica preso dentro da janela;
- Esc, clique fora ou o botão fecham; o foco volta para quem abriu;
- a página de fundo não rola enquanto o vídeo está aberto;
- o vídeo usa youtube-nocookie (sem cookies de rastreamento antes do play).
============================================================
*/

export default function VideoDialog({ open, onClose, title = 'Apresentação da Rose Michei' }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    openerRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll('button, iframe, a[href]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      openerRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="video-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cf-navy/95 p-4"
          onClick={onClose}
        >
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
            className="relative aspect-[9/16] max-h-[calc(100svh-2rem)] w-full max-w-sm overflow-hidden bg-cf-navy"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-cf-navy/80 text-white"
              aria-label="Fechar vídeo"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <iframe
              src={site.founderVideoEmbed}
              className="h-full w-full"
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
