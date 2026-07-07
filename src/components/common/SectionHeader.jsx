/*
============================================================
SECTION HEADER
============================================================
Componente reutilizável para títulos de seção.

theme="light"  -> textos escuros, para fundos claros.
theme="dark"   -> textos claros, para fundos escuros.
============================================================
*/

export default function SectionHeader({ eyebrow, title, description, theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.22em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
