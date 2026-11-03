import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { navItems } from './contentBridge';
import Logo from './common/Logo';
import { EASE, stagger, variants } from './motion/motionConfig';

/*
  Header
  - no topo da página ele se funde ao fundo; ao rolar, ganha linha
    inferior e fica um pouco mais compacto;
  - o indicador da página ativa desliza entre os itens (layoutId);
  - no mobile, o menu abre com os itens entrando em sequência.
*/

export default function Header({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const menuButtonRef = useRef(null);

  // /blog/algum-artigo continua marcando "Blog" no menu
  const activeHref = currentPath.startsWith('/blog/') ? '/blog' : currentPath;

  // Trocou de página → fecha o menu mobile.
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  // Esc fecha o menu e devolve o foco ao botão.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A navegação em si é feita pelo App (links <a> comuns); aqui só fecha o menu.
  const closeMenu = () => setIsOpen(false);

  const indicatorTarget = hovered || activeHref;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-cf-background transition-[border-color,box-shadow] duration-300 ${
        scrolled || isOpen ? 'border-cf-border' : 'border-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[padding] duration-300 ease-cf md:px-8 ${
          scrolled ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <a
          href="/"
          onClick={closeMenu}
          className="flex items-center"
          aria-label="Voltar ao início"
        >
          <Logo variant="dark" className="origin-left" />
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegação principal"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-bold transition-colors duration-300 ${
                  isActive ? 'text-cf-navy' : 'text-cf-muted hover:text-cf-navy'
                }`}
              >
                {item.label}
                {indicatorTarget === item.href && (
                  <m.span
                    layoutId="cf-nav-indicator"
                    transition={{ duration: 0.45, ease: EASE }}
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] ${isActive ? 'bg-cf-blue' : 'bg-cf-border'}`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <a
          href="/diagnostico"
          className="group hidden items-center gap-2 border border-cf-navy bg-cf-navy px-4 py-3 text-sm font-bold text-cf-offwhite transition-colors duration-300 hover:border-cf-blue hover:bg-cf-blue lg:inline-flex"
        >
          Analisar empresa
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="border border-cf-border bg-cf-background p-2.5 text-cf-navy lg:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          aria-controls="cf-mobile-menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            key="mobile-menu"
            id="cf-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE } }}
            className="overflow-hidden border-t border-cf-border bg-cf-background lg:hidden"
          >
            <m.nav
              initial="hidden"
              animate="visible"
              variants={stagger(0.05, 0.08)}
              className="mx-auto flex max-h-[calc(100svh-4.5rem)] max-w-7xl flex-col overflow-y-auto overscroll-contain px-5 pb-6 pt-2"
              aria-label="Navegação principal (mobile)"
            >
              {navItems.map((item, index) => (
                <m.a
                  key={item.href}
                  variants={variants.up}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={activeHref === item.href ? 'page' : undefined}
                  className={`flex items-baseline gap-4 border-b border-cf-border py-4 text-2xl font-black tracking-[-0.03em] ${
                    activeHref === item.href ? 'text-cf-blue' : 'text-cf-navy'
                  }`}
                >
                  <span className="cf-numeral w-6 text-xs font-normal text-cf-muted">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </m.a>
              ))}
              <m.a
                variants={variants.up}
                href="/diagnostico"
                onClick={closeMenu}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-cf-blue px-5 py-4 font-bold text-cf-offwhite"
              >
                Analisar empresa
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </m.a>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
