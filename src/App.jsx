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
import NotFoundPage from './pages/NotFoundPage';

/*
============================================================
APP PRINCIPAL — VERSÃO SITE INSTITUCIONAL
============================================================
Agora o projeto não é mais uma página única descendo sem parar.
Ele funciona como um site com páginas reais:

/             Página inicial
/sobre        Sobre a CF
/servicos     Serviços contábeis
/diagnostico  Diagnóstico contábil
/blog         Blog institucional
/contato      Contato e localização

Importante:
- Não usamos react-router-dom para evitar dependência extra.
- Usamos a API nativa do navegador: window.history.pushState.
- A Vercel já tem rewrite para index.html no vercel.json, então links diretos funcionam.
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

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = useCallback((to) => {
    const nextPath = normalizePath(to);
    if (nextPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', nextPath);
    }
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToDiagnostic = useCallback(() => {
    navigate('/diagnostico');
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const Page = routes[currentPath];

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
