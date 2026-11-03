/*
============================================================
BOTÃO PRINCIPAL
============================================================
Use para ações importantes: diagnóstico, WhatsApp, contato.

variant:
- 'primary'       azul CF, texto branco (padrão)
- 'light'         branco, texto navy — para fundos escuros/azuis
- 'outline'       contorno discreto — para fundos claros
- 'outline-light' contorno claro — para fundos escuros

Microinteração: o ícone final desliza 4px no hover.
Cantos retos, sem sombra — o peso vem da cor e da tipografia.
============================================================
*/

const base =
  'group inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-sm font-bold transition-colors duration-300 ease-cf md:text-base ' +
  '[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-cf hover:[&>svg:last-child]:translate-x-1 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cf-blue focus-visible:ring-offset-2 focus-visible:ring-offset-cf-background';

const variantClasses = {
  primary: 'border-cf-blue bg-cf-blue text-cf-offwhite hover:border-cf-blue-dark hover:bg-cf-blue-dark',
  light: 'border-cf-offwhite bg-cf-offwhite text-cf-navy hover:bg-transparent hover:text-cf-offwhite',
  outline: 'border-cf-border bg-transparent text-cf-navy hover:border-cf-navy',
  'outline-light': 'border-cf-offwhite/30 bg-transparent text-cf-offwhite hover:border-cf-offwhite',
};

export default function PrimaryButton({
  children,
  href,
  onClick,
  className = '',
  external = false,
  variant = 'primary',
  ...props
}) {
  const classes = `${base} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
