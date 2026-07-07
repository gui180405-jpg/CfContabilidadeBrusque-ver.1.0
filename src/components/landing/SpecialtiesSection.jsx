import { motion } from 'framer-motion';
import { BriefcaseBusiness, Building2, HeartPulse, Landmark, Store, UserRoundCheck } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { segments } from '../../content/siteContent';

const icons = [BriefcaseBusiness, Store, UserRoundCheck, HeartPulse, Building2, Landmark];

export default function SpecialtiesSection() {
  return (
    <section id="segmentos" className="relative overflow-hidden bg-[#e8f0f6] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(14,165,233,0.08),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Segmentos"
            title="Atendimento para diferentes perfis de negócio"
            description="A CF atende empresas que precisam de organização contábil, segurança fiscal e uma comunicação mais clara na rotina."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={item.title} delay={index * 0.04} as="article">
                <motion.div
                  whileHover={{ y: -7, scale: 1.012 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="cf-depth-card h-full rounded-2xl border border-white/75 bg-white/88 p-7 transition duration-300 hover:border-sky-200"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 text-sky-800 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{item.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
