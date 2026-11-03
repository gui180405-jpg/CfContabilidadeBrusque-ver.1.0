import { ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import ServiceIndex from '../editorial/ServiceIndex';
import { Eyebrow, MaskText } from '../motion/primitives';

const services = [
  {
    id: 'abertura',
    number: '01',
    title: 'Abertura e regularização',
    description:
      'Da estrutura inicial às alterações da empresa: CNPJ, enquadramento e organização cadastral para começar — ou reorganizar — com segurança.',
    items: ['Abertura de CNPJ', 'Alterações contratuais', 'Enquadramento', 'Organização cadastral'],
  },
  {
    id: 'rotina',
    number: '02',
    title: 'Rotina contábil mensal',
    description:
      'Documentos, informações e prazos acompanhados durante o mês para que a contabilidade não apareça apenas quando existe uma urgência.',
    items: ['Documentos', 'Acompanhamento mensal', 'Relatórios', 'Previsibilidade'],
  },
  {
    id: 'impostos',
    number: '03',
    title: 'Fiscal, impostos e notas',
    description:
      'Apuração de tributos, notas fiscais e obrigações para você entender melhor o que está pagando e manter a operação em ordem.',
    items: ['Guias e apurações', 'Notas fiscais', 'Simples Nacional', 'Obrigações fiscais'],
  },
  {
    id: 'trabalhista',
    number: '04',
    title: 'Departamento pessoal',
    description:
      'Folha, admissões, férias, desligamentos e obrigações trabalhistas acompanhadas para empresas que já têm equipe ou estão crescendo.',
    items: ['Folha de pagamento', 'Admissões', 'Férias', 'Desligamentos'],
  },
  {
    id: 'regularizacao',
    number: '05',
    title: 'Regularização e pendências',
    description:
      'Quando algo saiu da rotina, a CF ajuda a entender o cenário, organizar prioridades e construir o caminho de regularização.',
    items: ['Pendências fiscais', 'CNPJ irregular', 'Ajustes cadastrais', 'Próximos passos'],
  },
];

function DiagnosticLink() {
  return (
    <a href="/diagnostico" className="cf-link text-cf-offwhite hover:text-cf-on-dark">
      Entender minha situação
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-cf-navy px-5 py-16 text-cf-offwhite md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          theme="dark"
          layout="split"
          eyebrow="Áreas atendidas"
          lines={['A estrutura que mantém', 'a empresa em ordem.']}
          description="A CF acompanha as áreas contábeis que fazem parte da rotina do negócio — da abertura aos impostos, da equipe às pendências."
        />

        <ServiceIndex
          className="mt-10 md:mt-20"
          services={services}
          cta={<DiagnosticLink />}
        />

        <div className="mt-16 grid gap-8 border-t border-cf-offwhite/15 pt-10 md:mt-32 md:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow tone="light">Antes da urgência</Eyebrow>
          </div>

          <div className="flex flex-col items-start justify-between gap-10 lg:col-span-8">
            <MaskText
              as="p"
              className="max-w-3xl text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-cf-offwhite md:text-[2.5rem]"
              lines={['Contabilidade funciona melhor quando acompanha a rotina — não apenas quando a guia vence.']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
