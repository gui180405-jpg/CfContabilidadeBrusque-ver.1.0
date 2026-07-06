import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, MessageCircle, WalletCards } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';
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

  const question = questions[currentStep];
  const progress = Math.round(((currentStep + (finished ? 1 : 0)) / questions.length) * 100);

  const whatsappUrl = useMemo(() => {
    const message = `Olá! Respondi o diagnóstico no site da CF Contabilidade Brusque.\n\nMinhas informações:\n• Perfil do negócio: ${answers.perfil || 'Não informado'}\n• Situação atual: ${answers.situacao || 'Não informado'}\n• Faturamento mensal aproximado: ${answers.faturamento || 'Não informado'}\n• Principal necessidade: ${answers.necessidade || 'Não informado'}\n\nGostaria de receber uma orientação inicial sobre minha situação contábil.`;

    return `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(message)}`;
  }, [answers]);

  function handleAnswer(option) {
    const nextAnswers = { ...answers, [question.id]: option };
    setAnswers(nextAnswers);

    if (currentStep === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function handleBack() {
    if (finished) {
      setFinished(false);
      setCurrentStep(questions.length - 1);
      return;
    }
    setCurrentStep((step) => Math.max(0, step - 1));
  }

  return (
    <section id="diagnostico" className="relative overflow-hidden bg-[#dfeaf2] px-5 py-20 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.10),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Diagnóstico gratuito"
          title="Análise rápida da sua situação contábil"
          description="Responda 4 perguntas e chegue ao WhatsApp com as informações principais já organizadas."
        />

        <div className="rounded-[1.7rem] border border-white/75 bg-white/88 p-6 shadow-xl shadow-slate-900/10 md:p-9">
          <div className="mb-7 flex items-center justify-between gap-4 text-sm text-slate-500">
            <span>{finished ? 'Concluído' : `Etapa ${currentStep + 1} de ${questions.length}`}</span>
            <span className="font-bold text-sky-700">{progress}% concluído</span>
          </div>

          <div className="mb-9 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-sky-700 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          {finished ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-sky-700" />
              <h3 className="text-2xl font-bold text-slate-950 md:text-3xl">Pronto, seu contexto foi organizado.</h3>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Agora você pode enviar suas respostas para a CF e iniciar uma conversa mais objetiva com um contador.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <PrimaryButton href={whatsappUrl} external>
                  Receber orientação no WhatsApp
                  <MessageCircle className="ml-2 h-5 w-5" />
                </PrimaryButton>
                <button type="button" onClick={handleBack} className="text-sm font-bold text-slate-500 hover:text-slate-900">
                  Voltar uma etapa
                </button>
              </div>
              <p className="mt-5 text-xs text-slate-500">Sem compromisso • Atendimento direto com contador</p>
            </div>
          ) : (
            <>
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100/70 text-sky-800">
                  <question.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 md:text-2xl">{question.question}</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(option)}
                    className="rounded-2xl border border-slate-200 bg-[#eef4f8] p-5 text-left text-sm font-bold text-slate-900 transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-100/70"
                  >
                    {option}
                    <span className="mt-1 block text-xs font-medium text-slate-500">Clique para avançar</span>
                  </button>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
                <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                  Avanço automático
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
