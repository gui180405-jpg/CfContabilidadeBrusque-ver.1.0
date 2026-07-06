import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from './contentBridge';
import PrimaryButton from './common/PrimaryButton';
import Logo from './common/Logo';

/*
============================================================
HEADER / MENU PRINCIPAL
============================================================
Header com aparência de site institucional:
- branco, fixo e limpo;
- sombra discreta;
- linha superior azul como detalhe de marca;
- navegação com movimento leve.
============================================================
*/

export default function Header({ onStartQuiz, currentPath, navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavigate(event, href) {
    event.preventDefault();
    setIsOpen(false);
    navigate(href);
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-300/70 bg-[#f2f7fa]/94 shadow-[0_12px_34px_rgba(15,23,42,0.07)] backdrop-blur-xl">
      <div className="h-1 w-full bg-gradient-to-r from-sky-950 via-sky-700 to-sky-400" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="/" onClick={(event) => handleNavigate(event, '/')} className="flex items-center" aria-label="Voltar ao início">
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
                className={`group relative py-2 text-sm font-semibold transition duration-300 ${
                  isActive ? 'text-sky-800' : 'text-slate-600 hover:text-sky-800'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-sky-700 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton onClick={onStartQuiz} className="px-5 py-3 text-sm">
            Diagnóstico contábil
          </PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-xl border border-slate-300 bg-[#f7fafc] p-2 text-slate-900 shadow-sm transition hover:border-sky-200 hover:text-sky-800 lg:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-[#f2f7fa] px-5 py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className={`rounded-xl px-3 py-2 text-base font-semibold transition ${
                  currentPath === item.href ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50 hover:text-sky-700'
                }`}
              >
                {item.label}
              </a>
            ))}
            <PrimaryButton onClick={() => { setIsOpen(false); onStartQuiz(); }} className="mt-2 w-full">
              Diagnóstico contábil
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
