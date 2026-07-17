import { motion } from 'framer-motion';
import { ArrowRight, BadgeDollarSign, Building2, ClipboardCheck, FileQuestion, MessageCircle } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import Reveal from '../common/Reveal';

const journeys = [
  { icon: Building2, title: 'Quero abrir ou regularizar minha empresa', description: 'Para estruturar CNPJ, enquadramento, documentos e primeiros passos com segurança.', action: 'Ver abertura', to: '/servicos#abertura', featured: true },
  { icon: ClipboardCheck, title: 'Preciso organizar minha rotina contábil', description: 'Documentos, prazos, guias e obrigações precisam funcionar com mais previsibilidade.', action: 'Ver rotina', to: '/servicos#rotina' },
  { icon: BadgeDollarSign, title: 'Tenho dúvidas sobre impostos', description: 'Conteúdos para entender regime tributário, guias, Simples Nacional e obrigações.', action: 'Ler conteúdos', to: '/blog?jornada=impostos-e-enquadramento' },
  { icon: FileQuestion, title: 'Não sei por onde começar', description: 'Organize o contexto da empresa antes de conversar com a CF.', action: 'Fazer diagnóstico', type: 'diagnostic' },
];

export default function JourneySection({ navigate, onStartQuiz }) {
  function handleClick(journey) { journey.type === 'diagnostic' ? onStartQuiz() : navigate(journey.to); }
  const featured = journeys.find((journey) => journey.featured);
  const secondary = journeys.filter((journey) => !journey.featured);

  return (
    <section className="relative overflow-hidden bg-[#e8f0f6] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 cf-subtle-grid opacity-[0.035]" />
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-sky-400/12 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/55 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal><SectionHeader eyebrow="Caminhos de atendimento" title="Cada empresa chega com uma necessidade diferente." description="Escolha o caminho mais próximo da sua situação e avance para a página certa." /></Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }} className="relative overflow-hidden rounded-[2rem] border border-sky-900/10 bg-gradient-to-br from-[#173d5a] to-[#226281] p-7 text-white shadow-2xl shadow-slate-900/16 md:p-9">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" /><div className="absolute inset-0 cf-subtle-grid opacity-[0.055]" />
            <div className="relative z-10 flex h-full flex-col"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-sky-100"><Building2 className="h-7 w-7" /></div><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-sky-200">empresas em abertura ou ajuste</p><h3 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight md:text-4xl">{featured.title}</h3><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{featured.description}</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{['CNPJ', 'enquadramento', 'regularização'].map((item) => <div key={item} className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur"><p className="text-sm font-extrabold text-white">{item}</p></div>)}</div><button type="button" onClick={() => handleClick(featured)} className="mt-9 inline-flex w-fit items-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-sky-900 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-50">{featured.action}<ArrowRight className="ml-2 h-5 w-5" /></button></div>
          </motion.article>
          <div className="space-y-4">{secondary.map((item, index) => { const Icon = item.icon; return (<motion.article key={item.title} initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay: index * 0.07 }} className="group rounded-[1.6rem] border border-white/80 bg-white/82 p-5 shadow-xl shadow-slate-900/7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-200"><div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800 transition duration-300 group-hover:bg-sky-800 group-hover:text-white"><Icon className="h-6 w-6" /></div><div><h3 className="font-extrabold leading-tight text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p></div><button type="button" onClick={() => handleClick(item)} className="inline-flex items-center justify-center rounded-xl bg-[#f7fbfe] px-4 py-3 text-sm font-extrabold text-sky-800 transition duration-300 hover:bg-sky-50"><ArrowRight className="h-5 w-5" /></button></div></motion.article>); })}<div className="rounded-[1.6rem] border border-sky-900/10 bg-white/70 p-5 shadow-xl shadow-slate-900/7 backdrop-blur"><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-800"><MessageCircle className="h-6 w-6" /></div><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">orientação inicial</p><p className="mt-2 font-extrabold leading-relaxed text-slate-950">O diagnóstico ajuda a CF a entender melhor o contexto antes da conversa.</p></div></div></div></div>
        </div>
      </div>
    </section>
  );
}
