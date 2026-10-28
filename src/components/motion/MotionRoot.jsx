import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('./features').then((module) => module.default);

/*
  Envolve o app inteiro:
  - LazyMotion: os componentes usam `m.*` e os recursos de animação chegam em chunk próprio;
  - reducedMotion="user": quem pede menos movimento no sistema recebe só opacidade, sem deslocamentos.
*/
export default function MotionRoot({ children }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
