import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  MessageCircle,
  WalletCards,
} from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import { Eyebrow } from '../motion/primitives';
import { EASE } from '../motion/motionConfig';
import { site } from '../../content/siteContent';

const questions = [
  {
    id: 'perfil',
    question: 'Qual é o perfil do seu negócio?',
    icon: Building2,
    options: ['Prestador de serviço', 'Comércio', 'Profissional liberal', 'Clínica ou consultório', 'Empresa em abertura', 'Outro tipo de empresa'],
  },
  {
    id: 'situacao',
    question: 'Como sua empresa está hoje?',
    icon: BriefcaseBusiness,
    options: ['Já tenho CNPJ', 'Estou abrindo empresa', 'Quero trocar de contador', 'Tenho pendências para regularizar', 'Ainda estou avaliando o melhor caminho'],
  },
  {
    id: 'faturamento',
    question: 'Qual é o faturamento mensal aproximado?',
    icon: WalletCards,
    options: ['Até R$ 10 mil', 'R$ 10 mil a R$ 25 mil', 'R$ 25 mil a R$ 50 mil', 'Acima de R$ 50 mil', 'Prefiro informar depois'],
  },
  {
    id: 'necessidade',
    question: 'O que você mais precisa neste momento?',
    icon: MessageCircle,
    options: ['Organizar a contabilidade', 'Entender impostos e enquadramento', 'Abrir CNPJ', 'Trocar de contador', 'Regularizar pendências', 'Melhorar previsibilidade financeira'],
  },
];

export default function QuizSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const headingRef = useRef(null);
  const interacted = useRef(false);

  // Ao trocar de etapa, o foco vai para a nova pergunta (teclado e leitor de tela
  // não "se perdem" quando os botões da etapa anterior somem).
  useEffect(() => {
    if (!interacted.current) return undefined;
    const timer = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 260);
    return () => window.clearTimeout(timer);
  }, [currentStep, finished]);

  const question = questions[currentStep];
  const progress = Math.round(((currentStep + (finished ? 1 : 0)) / questions.length) * 100);

  const whatsappUrl = useMemo(() => {
    const message = `Olá! Respondi o diagnóstico no site da CF Contabilidade Brusque.\n\nMinhas informações:\n• Perfil do negócio: ${answers.perfil || 'Não informado'}\n• Situação atual: ${answers.situacao || 'Não informado'}\n• Faturamento mensal aproximado: ${answers.faturamento || 'Não informado'}\n• Principal necessidade: ${answers.necessidade || 'Não informado'}\n\nGostaria de receber uma orientação inicial sobre minha situação contábil.`;

    return `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(message)}`;
  }, [answers]);

  function handleAnswer(option) {
    interacted.current = true;
    const nextAnswers = { ...answers, [question.id]: option };
    setAnswers(nextAnswers);

    if (currentStep === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function handleBack() {
    interacted.current = true;
    if (finished) {
      setFinished(false);
      setCurrentStep(questions.length - 1);
      return;
    }

    setCurrentStep((step) => Math.max(0, step - 1));
  }

  const stepKey = finished ? 'done' : question.id;

  return (
    <section id="diagnostico" className="scroll-mt-24 bg-cf-background px-5 py-16 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <Eyebrow>Diagnóstico gratuito</Eyebrow>
          <p className="max-w-md text-base leading-7 text-cf-muted md:justify-self-end md:text-right">
            Responda 4 perguntas e chegue ao WhatsApp com as informações principais já organizadas.
          </p>
        </div>

        <div className="border-y border-cf-border md:border md:bg-cf-soft">
          {/* cabeçalho: etapa + progresso */}
          <div className="flex items-end justify-between gap-4 pt-6 md:px-10 md:pt-9">
            <p className="flex items-baseline gap-2 text-cf-black">
              <span className="cf-numeral text-4xl leading-none md:text-5xl">
                {finished ? '04' : String(currentStep + 1).padStart(2, '0')}
              </span>
              <span className="cf-numeral text-sm text-cf-muted">/ {String(questions.length).padStart(2, '0')}</span>
              <span className="sr-only">{finished ? 'Concluído' : `Etapa ${currentStep + 1} de ${questions.length}`}</span>
            </p>
            <span className="cf-label text-cf-blue">{finished ? 'Concluído' : `${progress}% concluído`}</span>
          </div>

          <div className="relative mt-6 h-px bg-cf-border md:mx-10">
            <m.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 block w-full origin-left bg-cf-blue"
              style={{ height: 2, top: -0.5 }}
              initial={false}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>

          <div className="pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={stepKey}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, x: -16, transition: { duration: 0.2, ease: EASE } }}
              >
                {finished ? (
                  <div className="text-center">
                    <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-cf-blue" strokeWidth={1.5} />
                    <h3 ref={headingRef} tabIndex={-1} className="text-3xl font-black tracking-[-0.035em] text-cf-black outline-none md:text-4xl">
                      Pronto, seu contexto foi organizado.
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-cf-muted">
                      Agora você pode enviar suas respostas para a CF e iniciar uma conversa mais objetiva com um contador.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <PrimaryButton href={whatsappUrl} external>
                        Receber orientação no WhatsApp
                        <MessageCircle className="h-4 w-4" />
                      </PrimaryButton>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="cf-link text-cf-muted hover:text-cf-black"
                      >
                        Voltar uma etapa
                      </button>
                    </div>
                    <p className="cf-label mt-8 text-cf-muted">Sem compromisso • Atendimento direto com contador</p>
                    <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-cf-muted">
                      Suas respostas não são salvas no site. Elas só chegam à CF se você tocar no botão e enviar a mensagem pelo WhatsApp.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex items-start gap-3 md:mb-8 md:gap-4">
                      <question.icon aria-hidden="true" className="mt-1.5 h-6 w-6 shrink-0 text-cf-blue" strokeWidth={1.75} />
                      <h3
                        ref={headingRef}
                        tabIndex={-1}
                        className="text-[1.6rem] font-black leading-tight tracking-[-0.03em] text-cf-black outline-none md:text-[2rem]"
                      >
                        <span className="sr-only">{`Pergunta ${currentStep + 1} de ${questions.length}: `}</span>
                        {question.question}
                      </h3>
                    </div>

                    <div className="grid border-t border-cf-border md:gap-3 md:border-t-0 md:grid-cols-2">
                      {question.options.map((option, index) => {
                        const selected = answers[question.id] === option;

                        return (
                          <m.button
                            key={option}
                            type="button"
                            onClick={() => handleAnswer(option)}
                            aria-pressed={selected}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: 0.05 + index * 0.04 } }}
                            className={`group flex min-h-[60px] items-center gap-4 border-b py-3.5 text-left transition-colors duration-300 md:border md:p-5 ${
                              selected ? 'border-cf-blue md:bg-cf-blue/5' : 'border-cf-border md:bg-cf-offwhite md:hover:border-cf-navy'
                            }`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center border text-xs font-bold transition-colors duration-300 ${
                                selected
                                  ? 'border-cf-blue bg-cf-blue text-cf-offwhite'
                                  : 'border-cf-border text-cf-muted group-hover:border-cf-navy group-hover:bg-cf-navy group-hover:text-cf-offwhite'
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1">
                              <span className="block text-sm font-bold text-cf-black md:text-base">{option}</span>
                              <span aria-hidden="true" className="mt-0.5 hidden text-xs text-cf-muted md:block">Clique para avançar</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-cf-black opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </m.button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-cf-border pt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-cf-muted transition hover:text-cf-black disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                      </button>
                      <span className="inline-flex items-center gap-2 text-xs text-cf-muted">
                        Avanço automático
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </>
                )}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
