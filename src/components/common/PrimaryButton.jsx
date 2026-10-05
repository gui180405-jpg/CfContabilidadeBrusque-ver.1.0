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
    'cf-shine inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#005F93] to-[#131F39] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#131F39]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#131F39]/25 focus:outline-none focus:ring-2 focus:ring-[#005F93] focus:ring-offset-2 focus:ring-offset-[#F5F4F1] md:text-base';

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
