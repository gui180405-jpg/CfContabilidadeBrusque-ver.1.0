import { ExternalLink, MapPin } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { site } from '../../content/siteContent';

export default function LocationSection({ compact = false }) {
  return (
    <section className={`${compact ? 'bg-[#dbe8f1]' : 'bg-[#e3edf5]'} px-5 py-20 md:px-8 md:py-24`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Localização"
          title={compact ? 'A CF também está em Brusque-SC.' : 'Atendimento em Brusque e também digital'}
          description={compact ? 'Localização real, atendimento próximo e suporte também pelos canais digitais.' : 'Você pode falar com a CF pelo WhatsApp, por reunião online ou presencialmente no endereço abaixo.'}
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-2xl border border-white/70 bg-white/82 p-7 shadow-xl shadow-slate-900/6">
            <MapPin className="mb-5 h-9 w-9 text-sky-700" />
            <h3 className="text-2xl font-bold text-slate-950">{site.companyName}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{site.address}</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Felipe+Schmidt,+172,+Brusque,+SC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-[#e8f0f6] px-5 py-3 text-sm font-bold text-sky-800 shadow-sm hover:bg-sky-50"
            >
              Abrir no Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/86 shadow-2xl shadow-slate-900/10">
            <iframe
              title="Mapa da CF Contabilidade Brusque"
              src="https://www.google.com/maps?q=R.%20Felipe%20Schmidt%20172%20Brusque%20SC&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
