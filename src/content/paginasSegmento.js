/*
============================================================
PÁGINAS POR SEGMENTO — CONTEÚDO
============================================================
Textos das duas páginas aprovadas pela Rose (no ar desde a v24):
  /contabilidade-para-imobiliarias
  /troque-de-contador
Os endereços antigos de demonstração (/proposta/...) redirecionam
para estes (vercel.json). Título e descrição para o Google ficam em
src/content/pageMeta.js.

Para editar um texto, mude aqui. Nada de layout precisa ser alterado.
============================================================
*/

import { site } from './siteContent';

const wa = (message) => `https://wa.me/${site.phoneWhats}?text=${encodeURIComponent(message)}`;

/* Endereços das páginas. */
export const finalPaths = {
  imobiliarias: '/contabilidade-para-imobiliarias',
  troca: '/troque-de-contador',
};

/* ---------------- Página 1 — Imobiliárias ---------------- */
/*
  v23: página reorganizada em 6 blocos, cada um com uma função:
   1 Topo (atenção) · 2 Credenciais (confiança rápida)
   3 A operação da imobiliária (desafio + como a CF cuida, no mesmo lugar)
   4 Reforma tributária (único lugar onde o tema é detalhado)
   5 Rose e a palestra (autoridade pessoal)
   6 Diagnóstico Imobiliário (conversão + objeções)
  Fatos sobre a CF usados aqui (confirmados pela gestão): atende
  imobiliárias; Rose palestrou na Imobia; Rose tem especialização em
  reforma tributária e artigos publicados. CRC, 17+ anos e atendimento
  local e digital já constam no site. Percentuais da reforma: LC 214/2025
  (conferir antes de publicar).
*/

const msgImob = (assunto) => wa(`Olá! Vim pela página de imobiliárias do site da CF Contabilidade e ${assunto}`);

export const imobiliarias = {
  whatsapp: msgImob('gostaria de conversar sobre a contabilidade da minha imobiliária.'),
  whatsappDiagnostico: msgImob('gostaria de solicitar o Diagnóstico Imobiliário.'),
  whatsappReforma: msgImob('quero entender como a reforma tributária afeta a minha imobiliária.'),
  whatsappRose: msgImob('gostaria de conversar com a Rose.'),
  whatsappPalestra: wa('Olá! Vim pelo site da CF Contabilidade e gostaria de convidar a Rose Michei para uma palestra.'),

  /* 1 — Topo */
  hero: {
    eyebrow: 'Contabilidade para imobiliárias',
    title: 'Contabilidade para imobiliárias em Brusque',
    subtitle: 'Contabilidade, tributação e gestão para quem administra imóveis de terceiros, com especialização em reforma tributária.',
    text: [
      'Repasses a proprietários, taxas de administração, comissões e DIMOB têm regras próprias, e a contabilidade da sua imobiliária precisa conhecê-las.',
    ],
    cta: 'Solicitar o Diagnóstico Imobiliário',
    note: 'Conversa sem compromisso de contratação.',
    image: '/fotos/rose-certificados.jpg',
    imagePosition: 'object-[50%_20%]',
    imageAlt: 'Rose Michei, gestora da CF Contabilidade, trabalhando no escritório com certificados na parede ao fundo',
  },

  /* 2 — Credenciais */
  credentials: [
    { value: 'CRC/SC 011948/O', label: 'Registro no Conselho Regional de Contabilidade' },
    { value: '17+ anos', label: 'de experiência em contabilidade' },
    { value: 'Brusque e região', label: 'Atendimento presencial e digital' },
  ],

  /* 3 — A operação da imobiliária: desafio do setor + como a CF cuida */
  operation: {
    eyebrow: 'A operação da imobiliária',
    title: 'Onde a contabilidade de uma imobiliária é diferente',
    intro: 'A CF olha para a operação inteira da imobiliária, não só para as obrigações do mês.',
    pointsLabel: 'Como a CF cuida',
    items: [
      {
        title: 'Receita própria × valores de terceiros',
        text: 'Aluguéis e valores dos proprietários passam pela conta da imobiliária, mas não são receita dela. Misturar os dois pode gerar imposto indevido.',
        points: ['Escrituração separando receita própria e valores de terceiros', 'Apuração de impostos sobre taxas de administração e comissões', 'Relatórios contábeis para acompanhar o resultado'],
      },
      {
        title: 'Repasses e movimentação financeira',
        text: 'Cada contrato gera recebimento, desconto de taxas e repasse ao proprietário, todos os meses.',
        points: ['Organização das informações de recebimentos e repasses aos proprietários', 'Leitura das movimentações financeiras para as decisões do dia a dia'],
      },
      {
        title: 'Notas fiscais, obrigações e DIMOB',
        text: 'A DIMOB é obrigatória para quem intermedeia ou administra imóveis e vence no último dia útil de fevereiro, somada às demais obrigações do ano.',
        points: ['Orientação sobre emissão de notas fiscais', 'Obrigações acessórias em dia', 'Preparação e envio da DIMOB, quando a imobiliária é obrigada'],
      },
      {
        title: 'Equipe, corretores e comissões',
        text: 'Comissões de venda e locação, corretores contratados ou autônomos e parcerias pedem documentação e tributação corretas.',
        points: ['Folha de pagamento, admissões, férias e rescisões', 'Pró-labore dos sócios', 'Orientação sobre corretores contratados e autônomos'],
      },
    ],
    extras: {
      title: 'A CF também cuida de',
      items: ['Abertura, alteração e regularização da empresa', 'Diagnóstico e consultoria contábil, financeira e operacional', 'BPO Financeiro'],
    },
  },

  /* 4 — Reforma tributária */
  reforma: {
    eyebrow: 'Reforma tributária',
    title: 'A reforma muda a tributação de aluguéis e vendas',
    intro: 'A Lei Complementar 214/2025 criou regras próprias para operações com imóveis. A transição começa em 2026 e vai até 2033.',
    items: [
      { title: 'Locação', text: 'Os novos impostos sobre aluguel (IBS e CBS) terão alíquotas reduzidas em 70%.' },
      { title: 'Venda', text: 'Na venda de imóveis, a redução das alíquotas é de 50%.' },
      { title: 'Proprietário pessoa física', text: 'Quem aluga vários imóveis e passa de certos limites de receita pode se tornar contribuinte. Seus clientes proprietários vão querer saber se é o caso deles.' },
      { title: 'Contratos em andamento', text: 'Contratos já assinados têm regras de transição. Vale revisar a carteira com antecedência.' },
    ],
    support: {
      title: 'Como a CF apoia',
      items: ['Análise dos efeitos na imobiliária e na carteira de contratos', 'Orientação para conversar com proprietários e inquilinos', 'Acompanhamento da transição até 2033'],
    },
    note: 'Regras sujeitas a regulamentação. A CF acompanha as atualizações.',
    cta: 'Entender o impacto na minha imobiliária',
  },

  /* 5 — Rose e a palestra */
  rose: {
    eyebrow: 'Quem conduz',
    title: 'Rose Michei, gestora da CF Contabilidade',
    text: [
      'Contadora com especialização em reforma tributária, acompanha de perto a contabilidade das imobiliárias atendidas pela CF e publica artigos sobre tributação e gestão.',
      'Já levou o tema da reforma para o setor imobiliário em palestra na Imobia.',
    ],
    cta: 'Conversar com a Rose',
    ctaPalestra: 'Convidar a Rose para uma palestra',
    video: {
      src: '/videos/rose-palestra-imobia.mp4',
      poster: '/videos/rose-palestra-imobia-capa.webp',
      label: 'Vídeo: Rose Michei em palestra na Imobia',
      caption: 'Rose Michei em palestra na Imobia.',
    },
  },

  /* 6 — Diagnóstico Imobiliário (fechamento) */
  diagnostico: {
    title: 'Comece pelo Diagnóstico Imobiliário',
    intro: 'Uma conversa estruturada para entender como a sua imobiliária está hoje e o que merece atenção.',
    items: [
      { title: 'Conversa inicial', text: 'Entendemos a operação: carteira de locação, vendas, equipe e rotina financeira.' },
      { title: 'Análise de 5 pontos', text: 'Receita própria e valores de terceiros, repasses e comissões, DIMOB, regime tributário e impactos da reforma.' },
      { title: 'Relatório', text: 'Você recebe um resumo do que está bem, dos riscos e dos próximos passos.' },
      { title: 'Decisão', text: 'Com o relatório em mãos, você decide se e como quer seguir com a CF.' },
    ],
    cta: 'Solicitar o diagnóstico',
    objections: [
      { text: 'Já tem contador?', link: { href: finalPaths.troca, label: 'Veja como funciona a troca' } },
    ],
  },
};

/* ---------------- Página 2 — Troque de contador ---------------- */

export const troca = {
  whatsapp: wa('Olá! Vim pela página de troca de contador do site da CF Contabilidade e gostaria de entender como funciona a mudança.'),
  hero: {
    eyebrow: 'Troca de contador',
    title: 'Está pensando em trocar de contador?',
    subtitle: 'Mude de contabilidade com orientação e tranquilidade.',
    text: [
      'Trocar de contador não precisa ser um processo complicado.',
      'Se sua empresa precisa de um atendimento mais próximo, maior clareza nas informações ou uma contabilidade que acompanhe melhor suas necessidades, talvez seja o momento de avaliar uma mudança.',
      'Na CF Contabilidade, queremos entender a realidade da sua empresa e orientar você durante o processo de transição.',
    ],
    cta: 'Converse com a CF',
    image: '/fotos/Emilly e rose.jpg',
    imageFallback: '/cf-diagnostico-consultivo.webp',
    imageAlt: 'Rose Michei e Emilly, da CF Contabilidade, analisando informações juntas no computador',
  },
  moments: {
    eyebrow: 'Quando é o momento de trocar?',
    title: 'Situações que costumam indicar a hora de mudar',
    items: [
      'Dificuldade para obter respostas e orientações.',
      'Falta de clareza sobre impostos e obrigações.',
      'Pouco acompanhamento e proximidade.',
      'Crescimento da empresa sem evolução do atendimento contábil.',
      'Necessidade de mais organização e apoio nas decisões.',
    ],
    closing: 'A contabilidade deve acompanhar o desenvolvimento da empresa, não apenas cuidar das obrigações.',
  },
  steps: {
    eyebrow: 'Passo a passo',
    title: 'Como funciona a troca de contador?',
    items: [
      { title: 'Conversa inicial', text: 'Entendemos o momento da empresa e o motivo da mudança.' },
      { title: 'Análise da situação atual', text: 'Avaliamos as informações e necessidades contábeis.' },
      { title: 'Orientação sobre a transição', text: 'Explicamos os procedimentos e documentos necessários.' },
      { title: 'Organização da mudança', text: 'Alinhamos as etapas para que a transferência das informações seja conduzida adequadamente.' },
      { title: 'Início do atendimento', text: 'Damos continuidade ao acompanhamento conforme o escopo contratado.' },
    ],
  },
  objections: {
    eyebrow: 'Dúvidas comuns',
    title: 'Tenho receio de trocar de contador. E agora?',
    text: [
      'É natural ter dúvidas sobre documentos, prazos, responsabilidades e continuidade das obrigações.',
      'Por isso, a mudança deve ser planejada e acompanhada. Antes de qualquer decisão, nossa equipe pode conversar com você e explicar os pontos que precisam ser considerados.',
    ],
    topics: ['Documentos', 'Prazos', 'Responsabilidades', 'Continuidade das obrigações'],
  },
  final: {
    title: 'Sua empresa pode contar com uma contabilidade mais próxima.',
    text: 'Se você está avaliando trocar de contador, entre em contato com a CF Contabilidade. Vamos entender sua situação e apresentar os próximos passos para uma possível mudança.',
    cta: 'Quero conversar sobre a troca de contador',
  },
};
