import { useState } from 'react';
import responsiveImages from '../../content/responsiveImages';

/**
 * Imagem das fotos reais da CF.
 *
 * - Se a foto tiver versões otimizadas (src/content/responsiveImages.js,
 *   gerado por scripts/otimizar_fotos.py), usa WebP com srcSet: o navegador
 *   baixa só o tamanho necessário para o espaço em que a foto aparece.
 * - `sizes` diz ao navegador a largura aproximada da foto na tela
 *   (padrão: metade da tela no desktop, tela inteira no celular).
 * - Se algo falhar, cai para o arquivo original e, depois, para `fallback`.
 */
export default function PhotoImage({
  src,
  fallback,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  ...props
}) {
  const optimized = responsiveImages[src];
  const chain = [optimized?.src, src, fallback].filter(Boolean);
  const [step, setStep] = useState(0);
  const current = chain[Math.min(step, chain.length - 1)];
  const useSrcSet = optimized && current === optimized.src;

  return (
    <img
      src={current}
      srcSet={useSrcSet ? optimized.srcSet : undefined}
      sizes={useSrcSet ? sizes : undefined}
      width={optimized?.width}
      height={optimized?.height}
      alt={alt}
      className={className}
      onError={() => {
        if (step < chain.length - 1) setStep(step + 1);
      }}
      {...props}
    />
  );
}
