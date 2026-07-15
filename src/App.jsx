import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import WhatsButton from './components/WhatsButton';
import Footer from './components/landing/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DiagnosticPage from './pages/DiagnosticPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';

/*
============================================================
APP PRINCIPAL — SITE INSTITUCIONAL COM JORNADAS
============================================================
Agora o navegador entende:
- rotas internas normais;
- links com hash, como /servicos#abertura;
- filtros por query, como /blog?jornada=impostos-e-enquadramento;
- páginas internas de artigo, como /blog/titulo-do-post.
============================================================
*/

const routes = {
  '/': HomePage,
  '/sobre': AboutPage,
  '/servicos': ServicesPage,
  '/diagnostico': DiagnosticPage,
  '/blog': BlogPage,
  '/contato': ContactPage,
};

function normalizePath(pathname) {
  if (!pathname || pathname === '') return '/';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function getPathFromUrl(value) {
  try {
    const url = new URL(value, window.location.origin);
    return normalizePath(url.pathname);
  } catch {
    return normalizePath(value);
  }
}

function getFullTarget(value) {
  try {
    const url = new URL(value, window.location.origin);
    const pathname = normalizePath(url.pathname);
    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return normalizePath(value);
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = useCallback((to) => {
    const nextPath = getPathFromUrl(to);
    const nextTarget = getFullTarget(to);
    const currentTarget = `${normalizePath(window.location.pathname)}${window.location.search}${window.location.hash}`;

    if (nextTarget !== currentTarget) {
      window.history.pushState({}, '', nextTarget);
    }

    setCurrentPath(nextPath);

    window.setTimeout(() => {
      const hash = window.location.hash?.replace('#', '');

      if (hash) {
        const targetElement = document.getElementById(hash);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 80);
  }, []);

  const goToDiagnostic = useCallback(() => {
    navigate('/diagnostico');
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isBlogPost = currentPath.startsWith('/blog/');
  const Page = isBlogPost ? BlogPostPage : routes[currentPath];

  return (
    <>
      <Header currentPath={currentPath} navigate={navigate} onStartQuiz={goToDiagnostic} />
      <main>
        {Page ? (
          <Page navigate={navigate} onStartQuiz={goToDiagnostic} />
        ) : (
          <NotFoundPage navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
      <WhatsButton />
    </>
  );
}
