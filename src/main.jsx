import ReactDOM from 'react-dom/client';
// Inter hospedada no próprio site (sem depender do Google Fonts): carrega mais rápido,
// não envia o IP do visitante a terceiros e simplifica a política de segurança (CSP).
import '@fontsource-variable/inter';
import App from './App.jsx';
import './index.css';

// Sem StrictMode aqui: durante o desenvolvimento ele executava renderizações
// extras e deixava a sensação de abertura mais pesada em máquinas comuns.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
