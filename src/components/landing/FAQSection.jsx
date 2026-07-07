import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { faq } from '../../content/siteContent';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#dbe7f0] px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Dúvidas frequentes"
          title="Perguntas comuns antes de falar com a CF"
          description="Respostas objetivas para entender melhor como funciona o atendimento e o diagnóstico inicial."
        />

        <div className="space-y-4">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="rounded-2xl border border-white/75 bg-white/86 shadow-lg shadow-slate-900/6 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-950">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-sky-700 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="px-5 pb-5 leading-relaxed text-slate-600">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
