import { Mail, MapPin, Phone } from 'lucide-react';
import { navItems, services, site } from '../../content/siteContent';
import Logo from '../common/Logo';

export default function Footer({ navigate }) {
  function handleNavigate(event, href) {
    if (!navigate) return;
    event.preventDefault();
    navigate(href);
  }

  return (
    <footer className="bg-slate-950 px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-relaxed text-slate-400">
            Contabilidade para empresas, prestadores de serviço, comércios e profissionais liberais que buscam organização, segurança e clareza para crescer.
          </p>
          <p className="mt-5 text-sm text-slate-500">{site.crc}</p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Navegação</h3>
          <div className="space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className="block text-sm text-slate-400 hover:text-sky-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Contato</h3>
          <div className="space-y-4 text-sm text-slate-300">
            <a href={`tel:${site.phoneHuman.replace(/\D/g, '')}`} className="flex items-center gap-3 hover:text-sky-300">
              <Phone className="h-4 w-4 text-sky-300" />
              {site.phoneHuman}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-sky-300">
              <Mail className="h-4 w-4 text-sky-300" />
              {site.email}
            </a>
            <p className="flex items-start gap-3 leading-relaxed">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
              {site.address}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.companyName}. Todos os direitos reservados.</p>
        <p>Serviços: {services.slice(0, 3).map((service) => service.title).join(' • ')}</p>
      </div>
    </footer>
  );
}
