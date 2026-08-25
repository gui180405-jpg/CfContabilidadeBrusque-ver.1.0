import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
  MessageCircle,
  Play,
  X,
} from 'lucide-react';
import { site } from '../content/siteContent';

const serviceLines = [
  {
    number: '01',
    title: 'Fiscal',
    text: 'Impostos, obrigações e planejamento para que a rotina fiscal deixe de ser uma surpresa.',
  },
  {
    number: '02',
    title: 'Contábil',
    text: 'Números organizados para entender o que acontece na empresa e decidir com mais clareza.',
  },
  {
    number: '03',
    title: 'Trabalhista',
    text: 'Folha, admissões, férias, rescisões e encargos acompanhados sem improviso.',
  },
  {
    number: '04',
    title: 'Societário',
    text: 'Abertura, alterações e regularizações para uma estrutura jurídica que acompanhe o negócio.',
  },
];

const process = [
  {
    number: '01',
    title: 'Entendemos',
    text: 'Começamos pelo momento real da empresa: atividade, rotina, dificuldades e objetivos.',
  },
  {
    number: '02',
    title: 'Organizamos',
    text: 'Definimos documentos, responsabilidades, prazos e o que precisa ser colocado em ordem.',
  },
  {
    number: '03',
    title: 'Acompanhamos',
    text: 'Fiscal, contábil, pessoal e societário passam a fazer parte da gestão — não apenas da urgência.',
  },
  {
    number: '04',
    title: 'Orientamos',
    text: 'Com informação mais clara, você ganha contexto para decidir o próximo passo da empresa.',
  },
];

function NavButton({ children, onClick, light = false, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 border px-5 py-3.5 text-sm font-bold transition duration-300 md:text-base ${
        light
          ? 'border-white bg-white text-[#07385F] hover:bg-transparent hover:text-white'
          : 'border-[#07385F] bg-[#07385F] text-white hover:bg-[#005F93]'
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

export default function HomePage({ onStartQuiz, navigate }) {
  const [showVideo, setShowVideo] = useState(false);

  const whatsappHref = `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(site.whatsappDefaultMessage)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-[#F6F7F5] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-stretch gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#005F93]">
              <span className="h-px w-10 bg-[#005F93]" />
              CF Contabilidade Brusque
            </div>

            <h1 className="max-w-3xl text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-[#071225] sm:text-6xl lg:text-[5.1rem]">
              Empresas crescem.
              <span className="mt-1 block text-[#005F93]">A contabilidade precisa acompanhar.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Há mais de 17 anos, a CF ajuda empresas a organizar números, impostos, pessoas e decisões com mais clareza.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <NavButton onClick={onStartQuiz}>Entender meu cenário</NavButton>
              <button
                type="button"
                onClick={() => navigate('/sobre')}
                className="group inline-flex items-center justify-center gap-2 border border-slate-300 bg-transparent px-5 py-3.5 text-sm font-bold text-[#071225] transition hover:border-[#005F93] hover:text-[#005F93] md:text-base"
              >
                Conhecer a CF
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-slate-300/90 py-5">
              <div className="border-r border-slate-300 pr-4">
                <strong className="block text-2xl font-black text-[#071225] md:text-3xl">17+</strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500 md:text-sm">anos de experiência</span>
              </div>
              <div className="border-r border-slate-300 px-4 md:px-6">
                <strong className="block text-2xl font-black text-[#071225] md:text-3xl">Brusque</strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500 md:text-sm">presença local</span>
              </div>
              <div className="pl-4 md:pl-6">
                <strong className="block text-2xl font-black text-[#071225] md:text-3xl">CRC</strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500 md:text-sm">{site.crc}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[520px] lg:min-h-[680px]"
          >
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="group relative h-full min-h-[520px] w-full overflow-hidden bg-[#DCE5EA] text-left lg:min-h-[680px]"
              aria-label="Assistir apresentação da Rose Michei"
            >
              <img
                src={site.founderImage}
                alt="Rose Michei, CEO da CF Contabilidade Brusque"
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.015]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071225]/75 via-transparent to-transparent" />

              <div className="absolute left-0 top-0 bg-[#005F93] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                Desde 2009
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-200">CEO • CF Contabilidade Brusque</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">Rose Michei</h2>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-white/70 bg-white text-[#07385F] transition group-hover:bg-[#005F93] group-hover:text-white">
                  <Play className="ml-1 h-6 w-6" />
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#005F93]">Estrutura antes da urgência</p>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-[-0.035em] text-[#071225] md:text-5xl">
                Sua empresa cresceu. Sua estrutura acompanhou?
              </h2>
            </div>

            <div className="border-t border-slate-300">
              {[
                'O saldo da conta não mostra sozinho o que realmente pertence à empresa.',
                'Imposto não deveria aparecer como surpresa no fim do mês.',
                'Crescer sem acompanhar números, folha e obrigações aumenta o risco da operação.',
              ].map((text, index) => (
                <div key={text} className="grid grid-cols-[42px_1fr] gap-5 border-b border-slate-300 py-6 md:grid-cols-[70px_1fr] md:py-8">
                  <span className="text-sm font-black text-[#005F93]">0{index + 1}</span>
                  <p className="max-w-2xl text-xl font-semibold leading-8 text-slate-700 md:text-2xl md:leading-9">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071D31] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-300">O que mantém uma empresa em ordem</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.035em] md:text-5xl">
                Contabilidade não começa quando a guia vence.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="group inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-sky-300"
            >
              Ver todos os serviços
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div>
            {serviceLines.map((service) => (
              <button
                type="button"
                key={service.number}
                onClick={() => navigate('/servicos')}
                className="group grid w-full gap-4 border-b border-white/15 py-8 text-left transition hover:bg-white/[0.035] md:grid-cols-[90px_0.75fr_1.25fr_30px] md:items-center md:gap-7 md:px-2 md:py-10"
              >
                <span className="text-sm font-black text-sky-300">{service.number}</span>
                <h3 className="text-3xl font-black tracking-tight md:text-4xl">{service.title}</h3>
                <p className="max-w-2xl leading-7 text-slate-300">{service.text}</p>
                <ArrowUpRight className="hidden h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFF3F5] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="relative">
            <img
              src={site.teamImage}
              alt="Equipe da CF Contabilidade Brusque"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 bg-[#005F93] px-6 py-5 text-white md:px-8">
              <strong className="block text-4xl font-black">17+</strong>
              <span className="text-sm font-semibold">anos acompanhando empresas</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#005F93]">Uma empresa feita de pessoas</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.035em] text-[#071225] md:text-5xl">
              Contabilidade também é uma relação de confiança.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              A CF nasceu em Brusque e cresceu acompanhando de perto a rotina de empresas, empresários e as mudanças da própria contabilidade. A tecnologia ajuda. A proximidade continua sendo parte do trabalho.
            </p>

            <div className="mt-9 border-l-2 border-[#005F93] pl-5">
              <p className="text-lg font-bold text-[#071225]">Rose Michei</p>
              <p className="mt-1 text-sm text-slate-500">CEO — CF Contabilidade Brusque</p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/sobre')}
              className="group mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-[#005F93] transition hover:text-[#07385F]"
            >
              Conheça nossa história
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#005F93]">Como trabalhamos</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.035em] text-[#071225] md:text-5xl">
                Menos improviso. Mais contexto.
              </h2>
              <p className="mt-6 max-w-md leading-7 text-slate-600">
                A rotina contábil precisa acompanhar a empresa durante o mês — não aparecer apenas quando alguma coisa já virou urgência.
              </p>
            </div>

            <div className="border-t border-slate-300">
              {process.map((step) => (
                <div key={step.number} className="grid gap-4 border-b border-slate-300 py-8 md:grid-cols-[70px_0.65fr_1.35fr] md:gap-7 md:py-10">
                  <span className="text-sm font-black text-[#005F93]">{step.number}</span>
                  <h3 className="text-2xl font-black text-[#071225] md:text-3xl">{step.title}</h3>
                  <p className="max-w-2xl leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#005F93] px-5 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-100">4 perguntas • menos de 2 minutos</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.035em] md:text-6xl">
              Como está a contabilidade da sua empresa hoje?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50/90">
              Conte um pouco do seu momento. A ideia é iniciar a conversa com contexto, sem formulário interminável e sem promessa pronta.
            </p>
          </div>

          <div className="lg:flex lg:justify-end">
            <NavButton onClick={onStartQuiz} light className="w-full sm:w-auto">
              Fazer análise inicial
            </NavButton>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F7F5] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-slate-300 bg-white lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[380px]">
            <img
              src={site.officeImage}
              alt="Escritório da CF Contabilidade Brusque"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
            <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#005F93]">
              <Building2 className="h-4 w-4" />
              Brusque • Santa Catarina
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.035em] text-[#071225] md:text-5xl">
              Contabilidade próxima também tem endereço.
            </h2>
            <p className="mt-6 leading-7 text-slate-600">{site.address}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-[#07385F] bg-[#07385F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#005F93]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com a CF
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => navigate('/contato')}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 px-5 py-3.5 text-sm font-bold text-[#071225] transition hover:border-[#005F93] hover:text-[#005F93]"
              >
                <MapPin className="h-4 w-4" />
                Ver contato
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071225]/90 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden bg-black"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-black/70 text-white"
                aria-label="Fechar vídeo"
              >
                <X className="h-5 w-5" />
              </button>
              <iframe
                src={site.founderVideoEmbed}
                className="h-full w-full"
                title="Apresentação Rose Michei"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
