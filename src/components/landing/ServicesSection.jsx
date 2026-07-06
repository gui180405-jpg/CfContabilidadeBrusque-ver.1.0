import { motion } from 'framer-motion';
import { Calculator, FileCheck2, Handshake, Landmark, ScrollText, Users } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';
import { services } from '../../content/siteContent';

const serviceIcons = [Calculator, FileCheck2, Landmark, Users, ScrollText, Handshake];

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-[#dfeaf2] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-sky-300/26 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Serviços"
            title="Soluções contábeis para a rotina da empresa"
            description="Da abertura do CNPJ ao acompanhamento mensal, a CF organiza obrigações, prazos e informações essenciais."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Reveal key={service.title} delay={index * 0.04} as="article">
                <motion.div
                  whileHover={{ y: -7, scale: 1.012 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="cf-depth-card h-full rounded-2xl border border-white/75 bg-white/88 p-7 transition duration-300 hover:border-sky-200"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-800 to-sky-600 text-white shadow-lg shadow-sky-900/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{service.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
