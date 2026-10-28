import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from './components/Header';
import WhatsButton from './components/WhatsButton';
import Footer from './components/landing/Footer';
import HomePage from './pages/HomePage';
import { MotionRoot } from './components/motion';
import useDocumentMeta from './components/blog/useDocumentMeta';
import { SITE_URL, notFoundMeta, pageMeta } from './content/pageMeta';

// A Home fica no bundle inicial. O restante só é baixado quando o visitante
// realmente entra na página correspondente.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const routes = {
  '/': HomePage,
  '/sobre': AboutPage,
  '/servicos': ServicesPage,
  '/diagnostico': DiagnosticPage,
  '/blog': BlogPage,
  '/contato': ContactPage,
};

/*
============================================================
ROTEADOR DO SITE (sem biblioteca)
============================================================
- Links internos são <a href="/..."> normais: o clique é interceptado
  aqui e a troca de página acontece sem recarregar. Ctrl/⌘+clique,
  botão do meio e "abrir em nova aba" continuam funcionando.
- Voltar/avançar do navegador restaura a posição de rolagem.
- Links com #âncora rolam até a seção, inclusive ao abrir o endereço
  direto (ex.: /servicos#abertura).
- A cada troca de página: título/descrição atualizados, foco levado
  ao conteúdo e um aviso para leitores de tela.
============================================================
*/

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function parseTarget(value) {
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    const path = normalizePath(url.pathname);
    return { path, full: `${path}${url.search}${url.hash}`, hash: url.hash.slice(1) };
  } catch {
    return null;
  }
}

// Endereços do mesmo domínio que NÃO são páginas do app (arquivos, painel, API).
function isAppRoute(path) {
  return !/^\/(admin|api)(\/|$)/.test(path) && !/\.[a-z0-9]{2,5}$/i.test(path);
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Tenta rolar até um id por até ~2,5 s (a página pode ainda estar carregando). */
function scrollToHash(hash, smooth) {
  let tries = 0;
  let timer;
  const attempt = () => {
    const element = document.getElementById(decodeURIComponent(hash));
    if (element) {
      element.scrollIntoView({ behavior: smooth && !reduceMotion() ? 'smooth' : 'auto', block: 'start' });
      return;
    }
    if (tries++ < 25) timer = window.setTimeout(attempt, 100);
  };
  attempt();
  return () => window.clearTimeout(timer);
}

/** Restaura uma posição de rolagem assim que a página tiver altura suficiente. */
function restoreScroll(y) {
  let tries = 0;
  let timer;
  const attempt = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max >= y - 2 || tries++ > 25) {
      window.scrollTo(0, y);
      return;
    }
    timer = window.setTimeout(attempt, 100);
  };
  attempt();
  return () => window.clearTimeout(timer);
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cf-background px-5 pt-28" role="status">
      <div className="flex items-center gap-3 text-sm font-bold text-cf-muted">
        <span aria-hidden="true" className="h-2 w-2 animate-pulse bg-cf-blue" />
        Carregando…
      </div>
    </div>
  );
}

function RouteMeta({ path, isBlogPost, known }) {
  // Artigos do blog definem as próprias tags em BlogPostPage.
  const meta = isBlogPost ? null : known ? pageMeta[path] : notFoundMeta;
  useDocumentMeta(
    meta && {
      ...meta,
      canonical: known ? `${SITE_URL}${path === '/' ? '/' : path}` : '',
      type: 'website',
      robots: known ? 'index, follow' : 'noindex',
    },
  );
  return null;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const mainRef = useRef(null);
  const announcerRef = useRef(null);
  const firstRender = useRef(true);
  const pendingScroll = useRef(null); // { hash } | { y } | { top: true }
  const pathRef = useRef(currentPath);
  pathRef.current = currentPath;

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const target = parseTarget(to);
    if (!target) return;

    const current = `${normalizePath(window.location.pathname)}${window.location.search}${window.location.hash}`;
    const samePage = target.path === normalizePath(window.location.pathname);

    if (target.full !== current || replace) {
      // guarda a posição atual para o "voltar" do navegador
      window.history.replaceState({ ...(window.history.state || {}), scrollY: window.scrollY }, '');
      window.history[replace ? 'replaceState' : 'pushState']({ scrollY: 0 }, '', target.full);
    }

    if (samePage) {
      if (target.hash) scrollToHash(target.hash, true);
      else if (target.full === current) window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
      return;
    }

    pendingScroll.current = target.hash ? { hash: target.hash } : { top: true };
    setCurrentPath(target.path);
  }, []);

  const goToDiagnostic = useCallback(() => navigate('/diagnostico'), [navigate]);

  // Voltar / avançar
  useEffect(() => {
    const handlePopState = (event) => {
      const path = normalizePath(window.location.pathname);
      const y = event.state?.scrollY;
      pendingScroll.current = typeof y === 'number' ? { y } : window.location.hash ? { hash: window.location.hash.slice(1) } : { top: true };
      if (pathRef.current === path) {
        // mesma página (ex.: só mudou a #âncora): aplica a rolagem agora
        const pending = pendingScroll.current;
        pendingScroll.current = null;
        if (pending?.y !== undefined) restoreScroll(pending.y);
        else if (pending?.hash) scrollToHash(pending.hash, false);
        return;
      }
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercepta cliques em links internos comuns (<a href="/...">).
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download') || anchor.dataset.reload !== undefined) return;
      const href = anchor.getAttribute('href');
      if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      const target = parseTarget(href);
      if (!target || !isAppRoute(target.path)) return;
      event.preventDefault();
      navigate(target.full);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  // Depois que a nova página monta: rolagem, foco e aviso de troca de página.
  useEffect(() => {
    const pending = pendingScroll.current;
    pendingScroll.current = null;
    let cancel;

    if (firstRender.current) {
      firstRender.current = false;
      // abertura direta com #âncora (ex.: /servicos#abertura)
      if (window.location.hash) cancel = scrollToHash(window.location.hash.slice(1), false);
      return cancel;
    }

    if (pending?.hash) cancel = scrollToHash(pending.hash, false);
    else if (pending?.y !== undefined) cancel = restoreScroll(pending.y);
    else window.scrollTo(0, 0);

    // leva o foco para o conteúdo, sem rolar (teclado e leitores de tela)
    mainRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(() => {
      if (announcerRef.current) announcerRef.current.textContent = `Página carregada: ${document.title}`;
    }, 300);

    return () => {
      cancel?.();
      window.clearTimeout(timer);
    };
  }, [currentPath]);

  const isBlogPost = currentPath.startsWith('/blog/');
  const Page = isBlogPost ? BlogPostPage : routes[currentPath];

  return (
    <MotionRoot>
      <a
        href="#conteudo"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView();
        }}
        className="sr-only z-[200] bg-cf-navy px-5 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <RouteMeta path={currentPath} isBlogPost={isBlogPost} known={Boolean(Page)} />
      <Header currentPath={currentPath} />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          {Page ? (
            <Page key={currentPath} navigate={navigate} onStartQuiz={goToDiagnostic} />
          ) : (
            <NotFoundPage />
          )}
        </Suspense>
      </main>
      <Footer />
      <WhatsButton />
      <p ref={announcerRef} className="sr-only" aria-live="polite" />
    </MotionRoot>
  );
}
