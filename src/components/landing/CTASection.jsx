import { ArrowRight, Phone } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import Reveal from '../common/Reveal';
import { site } from '../../content/siteContent';

export default function CTASection({ onStartQuiz }) {
  return (
    <section className="bg-[#dfeaf2] px-5 py-20 md:px-8 md:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 p-8 shadow-2xl shadow-slate-900/24 md:p-12">
          <div className="absolute inset-0 cf-subtle-grid opacity-12" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute -bottom-20 left-20 h-72 w-72 rounded-full bg-white/8 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-300">Próximo passo</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Vamos entender a situação contábil da sua empresa?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                Responda o diagnóstico ou fale diretamente com a CF. O objetivo é iniciar uma conversa com clareza e responsabilidade.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <PrimaryButton onClick={onStartQuiz} className="w-full bg-white text-sky-800 hover:bg-sky-50 hover:text-sky-900 lg:w-auto">
                Começar diagnóstico
                <ArrowRight className="ml-2 h-5 w-5" />
              </PrimaryButton>
              <a
                href={`tel:${site.phoneHuman.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-slate-200 shadow-lg shadow-slate-950/15 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white lg:w-auto"
              >
                <Phone className="h-4 w-4" />
                {site.phoneHuman}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
