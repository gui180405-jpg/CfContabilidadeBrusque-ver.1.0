import { useEffect } from 'react';

/*
  Atualiza título, descrição, canonical e Open Graph enquanto a página
  está aberta e restaura os valores originais ao sair.
  (O build também gera um HTML por artigo com essas tags — ver
  scripts/vite-plugin-cf-blog.js — para quem lê a página sem JavaScript,
  como o WhatsApp e o LinkedIn.)
*/

function upsert(selector, create) {
  let element = document.head.querySelector(selector);
  let created = false;
  if (!element) {
    element = create();
    document.head.appendChild(element);
    created = true;
  }
  return { element, created };
}

function metaTag(attr, key) {
  return upsert(`meta[${attr}="${key}"]`, () => {
    const element = document.createElement('meta');
    element.setAttribute(attr, key);
    return element;
  });
}

export default function useDocumentMeta(meta) {
  const { title, description, canonical, image, imageAlt, type = 'article', robots = '' } = meta || {};

  useEffect(() => {
    if (!title) return undefined;

    const previousTitle = document.title;
    const changes = [];

    const set = (attr, key, value) => {
      if (!value) return;
      const { element, created } = metaTag(attr, key);
      changes.push({ element, created, previous: element.getAttribute('content') });
      element.setAttribute('content', value);
    };

    document.title = title;
    set('name', 'description', description);
    set('property', 'og:title', title);
    set('property', 'og:description', description);
    set('property', 'og:type', type);
    set('property', 'og:url', canonical);
    set('property', 'og:image', image);
    set('property', 'og:image:alt', image ? imageAlt : '');
    set('name', 'robots', robots);

    const { element: link, created: linkCreated } = upsert('link[rel="canonical"]', () => {
      const element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      return element;
    });
    const previousCanonical = link.getAttribute('href');
    if (canonical) link.setAttribute('href', canonical);
    else link.removeAttribute('href');

    return () => {
      document.title = previousTitle;
      changes.forEach(({ element, created, previous }) => {
        if (created) element.remove();
        else if (previous !== null) element.setAttribute('content', previous);
      });
      if (linkCreated) link.remove();
      else if (previousCanonical) link.setAttribute('href', previousCanonical);
      else link.removeAttribute('href');
    };
  }, [title, description, canonical, image, imageAlt, type, robots]);
}
