import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { navItems } from './contentBridge';
import Logo from './common/Logo';

export default function Header({ onStartQuiz, currentPath, navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavigate(event, href) {
    event.preventDefault();
    setIsOpen(false);
    navigate(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-[#F6F7F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <a
          href="/"
          onClick={(event) => handleNavigate(event, '/')}
          className="flex items-center"
          aria-label="Voltar ao início"
        >
          <Logo variant="dark" className="origin-left" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className={`relative py-2 text-sm font-bold transition ${
                  isActive ? 'text-[#005F93]' : 'text-slate-600 hover:text-[#005F93]'
                }`}
              >
                {item.label}
                {isActive && <span className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-[#005F93]" />}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onStartQuiz}
          className="group hidden items-center gap-2 border border-[#07385F] bg-[#07385F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#005F93] lg:inline-flex"
        >
          Analisar empresa
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="border border-slate-300 bg-white p-2.5 text-[#071225] lg:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-[#F6F7F5] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className={`border-b border-slate-200 py-4 text-base font-bold ${
                  currentPath === item.href ? 'text-[#005F93]' : 'text-[#071225]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onStartQuiz();
              }}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-[#07385F] px-5 py-3.5 font-bold text-white"
            >
              Analisar empresa
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
