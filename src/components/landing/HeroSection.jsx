import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck2, CheckCircle2, FileText, MessageCircle, Play, ReceiptText, ShieldCheck, Sparkles, X } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import { homeHero, site } from '../../content/siteContent';

const trustItems = ['Rotina contábil acompanhada', 'Orientação com clareza', 'Mais segurança para decidir'];
const routineItems = [
  { icon: ReceiptText, title: 'Impostos', text: 'guias, apurações e obrigações fiscais' },
  { icon: CalendarCheck2, title: 'Prazos', text: 'acompanhamento da rotina mensal' },
  { icon: FileText, title: 'Documentos', text: 'informações organizadas para a contabilidade' },
];
const heroMetrics = [
  { value: '17+', label: 'anos de experiência' },
  { value: 'CF', label: 'atendimento próximo' },
  { value: 'Brusque', label: 'contabilidade local' },
];

export default function HeroSection({ onStartQuiz, navigate }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#dfeaf2] px-5 pb-24 pt-32 md:px-8 md:pb-28 md:pt-36">
      <div className="absolute inset-0 cf-subtle-grid opacity-35" />
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-sky-500/14 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-white/65 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#eef1f4] via-[#eef1f4]/70 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-sky-800 shadow-lg shadow-sky-900/5 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-40" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-700" /></span>
            {homeHero.eyebrow}
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-slate-950 md:text-5xl lg:text-[4.2rem]">
            Contabilidade clara para empresas que querem crescer com segurança.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
            A CF organiza a rotina contábil, fiscal, trabalhista e societária para que sua empresa tenha mais previsibilidade, menos correria e mais confiança nas decisões.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onStartQuiz}>{homeHero.primaryCta}<ArrowRight className="ml-2 h-5 w-5" /></PrimaryButton>
            <button type="button" onClick={() => navigate('/servicos')} className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/78 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-sky-800 hover:shadow-xl md:text-base">Conhecer serviços</button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.22 + index * 0.08 }} className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/62 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                <CheckCircle2 className="h-5 w-5 text-sky-700" />{item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative mx-auto min-h-[590px] w-full max-w-[600px]">
          <div className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-br from-sky-300/20 via-white/40 to-sky-900/10 blur-2xl" />

          <div className="absolute right-0 top-0 w-full max-w-[440px] rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-2xl shadow-slate-900/12 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">rotina organizada</p><h2 className="mt-1 text-2xl font-extrabold text-slate-950">O que a CF acompanha</h2></div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800"><ShieldCheck className="h-6 w-6" /></div>
            </div>
            <div className="mt-5 space-y-3">
              {routineItems.map((item, index) => { const Icon = item.icon; return (
                <motion.div key={item.title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-[#f7fbfe] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-800 shadow-sm"><Icon className="h-5 w-5" /></div>
                  <div><p className="font-extrabold text-slate-950">{item.title}</p><p className="text-sm leading-relaxed text-slate-500">{item.text}</p></div>
                </motion.div>
              ); })}
            </div>
          </div>

          <motion.button type="button" onClick={() => setShowVideo(true)} whileHover={{ y: -5, scale: 1.01 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} className="absolute bottom-20 left-0 z-20 w-[330px] overflow-hidden rounded-[2rem] border border-white/80 bg-white/92 p-3 text-left shadow-2xl shadow-slate-900/16 backdrop-blur focus:outline-none focus:ring-4 focus:ring-sky-200" aria-label="Assistir apresentação da Rose Michei">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
              <img src={site.founderImage} alt="Rose Michei, contadora e fundadora da CF Contabilidade Brusque" className="h-[330px] w-full object-cover object-top transition duration-700" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/8 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white shadow-2xl shadow-black/20 backdrop-blur-md"><Sparkles className="h-4 w-4 text-sky-200" />Quem está à frente da CF</div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Contadora responsável</p><h2 className="mt-1 text-2xl font-extrabold text-white">Rose Michei</h2><p className="mt-1 text-xs font-medium text-slate-200">CF Contabilidade Brusque</p></div><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sky-800 shadow-2xl"><Play className="ml-1 h-6 w-6" /></div></div>
            </div>
          </motion.button>

          <div className="absolute bottom-0 right-4 z-30 w-[285px] rounded-[1.7rem] border border-sky-900/10 bg-gradient-to-br from-[#173d5a] to-[#226281] p-5 text-white shadow-2xl shadow-slate-900/16">
            <div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-sky-100"><MessageCircle className="h-5 w-5" /></div><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">próximo passo</p><p className="mt-1 font-extrabold leading-snug">Envie seu contexto pelo diagnóstico e facilite a orientação inicial.</p></div></div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-7xl"><div className="grid gap-3 rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-xl shadow-slate-900/7 backdrop-blur md:grid-cols-3">{heroMetrics.map((metric) => (<div key={metric.value} className="rounded-2xl bg-white/74 p-4"><p className="text-2xl font-extrabold text-slate-950">{metric.value}</p><p className="mt-1 text-sm text-slate-500">{metric.label}</p></div>))}</div></div>

      <AnimatePresence>{showVideo && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" onClick={() => setShowVideo(false)}><motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setShowVideo(false)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75" aria-label="Fechar vídeo"><X className="h-6 w-6" /></button><iframe src={site.founderVideoEmbed} className="h-full w-full" title="Apresentação Rose Michei" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></motion.div></motion.div>)}</AnimatePresence>
    </section>
  );
}
