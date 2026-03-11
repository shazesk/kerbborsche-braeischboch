import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gemeinschaftsarbeit',
  description: 'Gemeinschaftsarbeit der Kerbborsche Bräischboch e.V.',
};

export default function GemeinschaftsarbeitPage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic07.jpg')" }}>
        <div className="hero-content">
          <h1>Gemeinschaftsarbeit</h1>
          <p>Gemeinsam anpacken — für Brensbach und unsere Gemeinschaft.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 750 }}>
          <div className="section-header">
            <span className="label">Engagement</span>
            <h2>Zusammen für Brensbach</h2>
          </div>
          <p>Als Verein übernehmen wir Verantwortung für unseren Ort. Ob Arbeitseinsätze, Pflege des Vereinsheims oder Unterstützung bei Dorffesten — wir packen gemeinsam an.</p>

          <h3 className="mt-lg">Unsere Einsätze</h3>
          <ul style={{ margin: 'var(--s3) 0 0 var(--s6)' }}>
            <li>Pflege und Instandhaltung des Vereinsheims</li>
            <li>Aufbau und Abbau bei Veranstaltungen</li>
            <li>Unterstützung bei Dorffesten und Gemeindeaktionen</li>
            <li>Gemeinschaftliche Arbeitseinsätze</li>
          </ul>

          <h3 className="mt-lg">Mitmachen</h3>
          <p>Jede helfende Hand zählt! Wenn du uns unterstützen möchtest, <Link href="/kontakt">melde dich bei uns</Link>.</p>

          <div className="mt-lg">
            <Link href="/" className="btn btn-outline">← Zurück zur Startseite</Link>
          </div>
        </div>
      </section>
    </>
  );
}
