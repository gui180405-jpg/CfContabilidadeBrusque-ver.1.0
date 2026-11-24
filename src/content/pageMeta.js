/*
============================================================
TÍTULO, DESCRIÇÃO E ENDEREÇO DE CADA PÁGINA (SEO)
============================================================
Usado em dois lugares:
- no navegador (troca o título da aba ao navegar pelo site);
- no build (scripts/vite-plugin-cf-blog.js gera um HTML por página
  com estas tags, para o Google, WhatsApp e LinkedIn lerem sem JavaScript).

Para mudar o texto que aparece no Google, edite aqui.
============================================================
*/

export const SITE_URL = 'https://cfcontabilidadebrusque.com';
export const SITE_NAME = 'CF Contabilidade Brusque';

export const pageMeta = {
  '/': {
    title: 'CF Contabilidade Brusque | Contabilidade Empresarial e Consultiva',
    description:
      'Contabilidade em Brusque para empresas que buscam organização, planejamento e segurança. Soluções contábeis, fiscais, trabalhistas e societárias para acompanhar o crescimento do seu negócio.',
  },
  '/servicos': {
    title: 'Serviços contábeis em Brusque | CF Contabilidade',
    description:
      'Abertura de empresa, rotina contábil, impostos, departamento pessoal e regularização. Conheça os serviços da CF Contabilidade Brusque.',
  },
  '/sobre': {
    title: 'Sobre a CF Contabilidade Brusque | Desde 2009',
    description:
      'Conheça a história da CF Contabilidade Brusque, a equipe e a forma de trabalhar: contabilidade acompanhada na rotina, não só no vencimento.',
  },
  '/diagnostico': {
    title: 'Diagnóstico contábil gratuito | CF Contabilidade Brusque',
    description:
      'Responda 4 perguntas rápidas sobre a sua empresa e envie o resumo pelo WhatsApp para uma orientação inicial da CF Contabilidade.',
  },
  '/blog': {
    title: 'Blog | CF Contabilidade Brusque',
    description:
      'Conteúdos sobre abertura de empresa, impostos, rotina contábil, folha de pagamento e gestão financeira, organizados pelo momento da sua empresa.',
  },
  '/contato': {
    title: 'Contato | CF Contabilidade Brusque',
    description:
      'Fale com a CF Contabilidade Brusque pelo WhatsApp, telefone (47) 3351-3630 ou e-mail. R. Felipe Schmidt, 172, sala 502, Brusque-SC.',
  },
};

// Páginas por segmento
pageMeta['/contabilidade-para-imobiliarias'] = {
  title: 'Contabilidade para imobiliárias em Brusque | CF Contabilidade',
  description:
    'Contabilidade, tributação e gestão para imobiliárias de Brusque e região: repasses, DIMOB e reforma tributária na locação e na venda. Solicite o Diagnóstico Imobiliário CF.',
};
pageMeta['/troque-de-contador'] = {
  title: 'Trocar de contador em Brusque | CF Contabilidade',
  description:
    'Está pensando em trocar de contador? Entenda como funciona a mudança de contabilidade e converse com a CF Contabilidade Brusque.',
};

export const notFoundMeta = {
  title: 'Página não encontrada | CF Contabilidade Brusque',
  description: 'O endereço acessado não existe ou mudou. Volte para o início do site da CF Contabilidade Brusque.',
};
