/*
============================================================
BOTÃO PRINCIPAL
============================================================
Use para ações importantes: diagnóstico, WhatsApp, contato.
Visual mais institucional: menos "landing page", mais site profissional.
============================================================
*/

export default function PrimaryButton({ children, href, onClick, className = '', external = false }) {
  const baseClasses =
    'cf-shine inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-800 to-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-sky-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-sky-900/25 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-[#dfeaf2] md:text-base';

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
}
