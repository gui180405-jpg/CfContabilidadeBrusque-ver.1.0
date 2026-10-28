/* Logo simples: sem biblioteca de animação no carregamento inicial. */
export default function Logo({ variant = 'light', className = '' }) {
  const logoSrc = variant === 'dark' ? '/logo-cf-azul.png' : '/logo-cf-branca.png';

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="CF Contabilidade Brusque"
        className="h-10 w-auto select-none md:h-12"
        draggable="false"
        width="190"
        height="48"
        decoding="async"
      />
    </span>
  );
}
