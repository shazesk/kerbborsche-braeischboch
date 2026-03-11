import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vorstand',
  description: 'Der aktuelle Vorstand der Kerbborsche Bräischboch e.V.',
};

const boardMembers = [
  { initials: 'TN', role: '1. Vorsitzender', name: 'Till Nürnberger' },
  { initials: 'LH', role: '2. Vorsitzende', name: 'Lara Hammer' },
  { initials: 'NF', role: 'Rechner', name: 'Nick Friedrich' },
  { initials: 'NB', role: 'Schriftführerin', name: 'Nina Buxmann' },
  { initials: 'NP', role: 'Beisitzer: Vereinsheim', name: 'Nico Piccione' },
  { initials: 'JW', role: 'Beisitzer: Kassenprüfung', name: 'Jonas Wolf' },
];

export default function VorstandPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic08.jpg')" }}>
        <div className="hero-content">
          <h1>Unser Vorstand</h1>
          <p>Gewählt seit dem 08. Februar 2025</p>
        </div>
      </section>

      {/* Board Members */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Vereinsführung</span>
            <h2>Der aktuelle Vorstand</h2>
          </div>
          <div className="board-grid">
            {boardMembers.map((member) => (
              <div className="board-card" key={member.name}>
                <div className="board-avatar">{member.initials}</div>
                <h4>{member.role}</h4>
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt & Satzung */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="label">Informationen</span>
            <h2>Kontakt &amp; Satzung</h2>
          </div>
          <div className="info-grid">
            <div className="info-box">
              <h3>Kontakt</h3>
              <p>Unser Vorstand ist erreichbar unter:</p>
              <p><a href="mailto:kontakt@kerbborsche-braeischboch.de"><strong>kontakt@kerbborsche-braeischboch.de</strong></a></p>
              <a href="mailto:kontakt@kerbborsche-braeischboch.de" className="btn btn-primary btn-sm mt-sm">Mail schreiben →</a>
              <p className="mt-md" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Adresse für Rechnungen und Schriftverkehr: siehe <Link href="/impressum">Impressum</Link>.
              </p>
            </div>
            <div className="info-box">
              <h3>Vereinssatzung</h3>
              <p>Mehr über unseren Verein, den Vorstand und seine Zusammensetzung erfahrt ihr in unserer Satzung.</p>
              <a href="/assets/pdfs/vereinssatzung.pdf" className="btn btn-outline btn-sm" download>PDF herunterladen</a>
              <p className="mt-sm" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Mitglied werden? <Link href="/kontakt">Alle Infos hier →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
