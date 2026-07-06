/*
============================================================
CONTEÚDO CENTRAL DO SITE — CF CONTABILIDADE
============================================================
Este é o arquivo mais importante para personalização.

Para mudar textos do site, comece por aqui:
- dados da empresa;
- menu;
- texto principal da Home;
- segmentos atendidos;
- serviços;
- perguntas frequentes;
- posts futuros do blog.

A ideia desta versão é deixar o site com aparência institucional,
limpa e profissional, sem depender de uma única página longa.
============================================================
*/

export const site = {
  companyName: 'CF Contabilidade Brusque',
  shortName: 'CF Contabilidade',
  cityState: 'Brusque - SC',
  phoneHuman: '(47) 3351-3630',
  phoneWhats: '554733513630',
  email: 'contato@cfbrusque.com.br',
  address: 'CRF Prime — R. Felipe Schmidt, 172 — 5º Andar, Sala 502 — Brusque, SC',
  crc: 'CRC/SC 011948/O',

  // IMAGENS DO SITE.
  // Todas precisam estar dentro da pasta public/.
  heroImage: '/cf-recepcao-brasil.webp',
  teamImage: '/EquipeCfcontabilidade.jpg',
  receptionImage: '/cf-recepcao-brasil.webp',
  officeImage: '/cf-escritorio-vista.webp',

  // FOTO DA ROSE COM VÍDEO
  // Se quiser deixar 100% local no futuro, salve a foto em public/rose-michei.png
  // e troque o caminho abaixo para '/rose-michei.png'.
  founderImage: '/rose-michei-nova.jpg',
  founderVideoEmbed: 'https://www.youtube.com/embed/RNDuFxzAX9A?autoplay=1',

  whatsappDefaultMessage:
    'Olá! Vim pelo site da CF Contabilidade Brusque e gostaria de conversar sobre a organização contábil da minha empresa.',
};

export const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

export const homeHero = {
  eyebrow: 'Contabilidade em Brusque-SC',
  title: 'Contabilidade clara para empresas que querem crescer com segurança.',
  description:
    'A CF organiza a rotina contábil, fiscal, trabalhista e societária da sua empresa para que você tenha mais previsibilidade e menos improviso nas decisões.',
  primaryCta: 'Analisar minha situação contábil',
  secondaryCta: 'Conhecer os serviços',
  highlights: ['Atendimento próximo', 'Rotina organizada', 'Orientação responsável'],
};

export const segments = [
  {
    title: 'Prestadores de serviço',
    description:
      'Organização contábil e fiscal para empresas que precisam de clareza em impostos, notas, prazos e obrigações mensais.',
  },
  {
    title: 'Comércios',
    description:
      'Acompanhamento para empresas comerciais com atenção a documentos fiscais, folha, regularidade e rotina operacional.',
  },
  {
    title: 'Profissionais liberais',
    description:
      'Suporte para profissionais que atuam como pessoa física, PJ ou estão avaliando a melhor forma de estruturar a atividade.',
  },
  {
    title: 'Clínicas e consultórios',
    description:
      'Atendimento para clínicas, consultórios e profissionais da saúde que precisam de segurança na gestão contábil.',
  },
  {
    title: 'Empresas em abertura',
    description:
      'Apoio para abrir CNPJ, escolher natureza jurídica, organizar documentação e iniciar a rotina sem improviso.',
  },
  {
    title: 'Negócios em crescimento',
    description:
      'Orientação contábil para empresas que estão contratando, aumentando faturamento ou precisam de mais previsibilidade.',
  },
];

export const specialties = segments;

export const processSteps = [
  {
    title: 'Entendemos o momento da empresa',
    description:
      'A conversa começa pelo contexto: atividade, situação atual, principais dúvidas e pontos que precisam de organização.',
  },
  {
    title: 'Organizamos o caminho contábil',
    description:
      'A CF orienta documentos, prazos, responsabilidades e próximos passos para reduzir ruído na rotina da empresa.',
  },
  {
    title: 'Mantemos a rotina acompanhada',
    description:
      'Fiscal, contábil, trabalhista e societário deixam de ser lembrados só na urgência e passam a fazer parte da gestão.',
  },
  {
    title: 'Você decide com mais clareza',
    description:
      'Com informações organizadas, o empresário ganha segurança para abrir, regularizar, crescer ou ajustar a operação.',
  },
];

export const services = [
  {
    title: 'Abertura de empresas',
    description:
      'Apoio na abertura de CNPJ, escolha da estrutura adequada e organização inicial para começar com segurança.',
  },
  {
    title: 'Contabilidade mensal',
    description:
      'Rotina contábil, fiscal e trabalhista acompanhada de forma próxima, com prazos e obrigações bem definidos.',
  },
  {
    title: 'Fiscal e impostos',
    description:
      'Apuração de impostos, entrega de obrigações e orientação para reduzir riscos na rotina fiscal da empresa.',
  },
  {
    title: 'Departamento pessoal',
    description:
      'Admissões, folha de pagamento, pró-labore, encargos, férias, rescisões e obrigações trabalhistas.',
  },
  {
    title: 'Societário e regularização',
    description:
      'Alterações contratuais, regularização de pendências, baixa de empresas e suporte documental.',
  },
  {
    title: 'Planejamento tributário',
    description:
      'Análise do enquadramento e da estrutura tributária para pagar corretamente, com segurança e previsibilidade.',
  },
];

export const metrics = [
  {
    value: '17+',
    label: 'anos de experiência',
  },
  {
    value: 'Brusque-SC',
    label: 'atendimento local e digital',
  },
  {
    value: 'Contábil • Fiscal • Trabalhista',
    label: 'rotina acompanhada',
  },
];

export const faq = [
  {
    question: 'A CF atende quais tipos de empresas?',
    answer:
      'A CF atende prestadores de serviço, comércios, profissionais liberais, clínicas, consultórios, empresas em abertura e negócios que precisam organizar melhor a rotina contábil.',
  },
  {
    question: 'Posso trocar de contador sem complicação?',
    answer:
      'Na maioria dos casos, sim. Com os documentos corretos, a transição pode ser organizada de forma segura e sem interromper a rotina da empresa.',
  },
  {
    question: 'Vocês fazem abertura de CNPJ?',
    answer:
      'Sim. A CF orienta a abertura do CNPJ, natureza jurídica, atividades, enquadramento e primeiros passos da rotina contábil.',
  },
  {
    question: 'O diagnóstico é uma consultoria completa?',
    answer:
      'Não. Ele é uma triagem inicial para entender seu perfil e iniciar uma conversa com mais contexto. Uma análise completa depende de documentos e avaliação contábil.',
  },
  {
    question: 'Vocês atendem fora de Brusque?',
    answer:
      'Sim. O atendimento pode ser digital, mantendo organização e comunicação próxima pelo WhatsApp e reuniões online.',
  },
  {
    question: 'É garantido que vou pagar menos impostos?',
    answer:
      'Não fazemos promessa sem análise. O objetivo é verificar se existe oportunidade legal e segura de melhoria tributária.',
  },
];

// BLOG
// Para publicar um post futuramente, altere os textos abaixo ou adicione novos itens.
// Enquanto estiver como draft: true, o card aparece como "em breve" e não abre página interna.
export const blogPosts = [
  {
    title: 'Como saber se minha empresa está pagando impostos corretamente?',
    category: 'Gestão tributária',
    excerpt:
      'Um guia simples para entender quando vale revisar enquadramento, rotina fiscal e documentos antes que pequenas falhas virem problemas.',
    date: 'Em breve',
    readTime: '4 min',
    draft: true,
  },
  {
    title: 'Quando vale trocar de contador?',
    category: 'Rotina contábil',
    excerpt:
      'Sinais de que a empresa precisa de mais clareza, comunicação e acompanhamento na rotina contábil mensal.',
    date: 'Em breve',
    readTime: '3 min',
    draft: true,
  },
  {
    title: 'Abrir CNPJ com pressa pode sair caro',
    category: 'Abertura de empresas',
    excerpt:
      'O que observar antes de escolher atividade, natureza jurídica, regime tributário e estrutura inicial da empresa.',
    date: 'Em breve',
    readTime: '5 min',
    draft: true,
  },
];
