import { motion } from 'framer-motion';
import { ArrowRight, ClipboardCheck, MessageCircle, SearchCheck, ShieldCheck } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { processSteps } from '../../content/siteContent';

const stepIcons = [ClipboardCheck, SearchCheck, MessageCircle, ShieldCheck];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-[#dbe7f0] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-55" />
      <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Como funciona"
            title="Um processo simples, claro e organizado"
            description="A proposta é deixar a rotina contábil menos confusa e mais previsível para o empresário."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <Reveal key={step.title} delay={index * 0.06} as="article">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 20 }}
                  className="relative h-full rounded-2xl border border-white/80 bg-white/82 p-6 shadow-xl shadow-slate-900/6 backdrop-blur"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-800 text-white shadow-lg shadow-sky-900/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-extrabold text-sky-900/35">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-sky-700/35 lg:block" />
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
