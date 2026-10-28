import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { navItems, services, site } from '../../content/siteContent';
import Logo from '../common/Logo';
import { RevealLine } from '../motion/primitives';

export default function Footer() {
  return (
    <footer className="bg-cf-navy px-5 pb-10 pt-16 md:px-8 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <RevealLine className="bg-white/20" />

        <div className="grid gap-12 pt-12 md:grid-cols-12 md:gap-8 md:pt-16">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-7 text-cf-on-dark">
              Contabilidade para empresas, prestadores de serviço, comércios e profissionais liberais que buscam organização, segurança e clareza para crescer.
            </p>
            <p className="cf-label mt-6 text-cf-on-dark/70">{site.crc}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Rodapé">
            <h2 className="cf-label mb-5 text-cf-on-dark">Navegação</h2>
            <ul className="border-t border-white/10">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-white/10">
                  <a
                    href={item.href}
                    className="group flex min-h-[44px] items-center justify-between py-2.5 text-sm font-semibold text-cf-on-dark transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="cf-label mb-5 text-cf-on-dark">Contato</h2>
            <div className="space-y-5 text-sm text-cf-on-dark">
              <a href={`tel:+${site.phoneWhats}`} className="flex items-center gap-3 text-2xl font-black tracking-[-0.03em] text-white transition-colors hover:text-cf-on-dark">
                <Phone aria-hidden="true" className="h-4 w-4 text-cf-on-dark" />
                {site.phoneHuman}
              </a>
              <a href={`mailto:${site.email}`} className="flex min-h-[44px] items-center gap-3 break-all transition-colors hover:text-white">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-cf-on-dark" />
                {site.email}
              </a>
              <p className="flex items-start gap-3 leading-relaxed">
                <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-cf-on-dark" />
                {site.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-cf-on-dark/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.companyName}. Todos os direitos reservados.</p>
          <p>Serviços: {services.slice(0, 3).map((service) => service.title).join(' • ')}</p>
        </div>
      </div>
    </footer>
  );
}
