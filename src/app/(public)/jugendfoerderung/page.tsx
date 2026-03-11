import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jugendförderung',
  description: 'Jugendförderung der Kerbborsche Bräischboch e.V.',
};

export default function JugendfoerderungPage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic08.jpg')" }}>
        <div className="hero-content">
          <h1>Jugendförderung</h1>
          <p>Wir geben jungen Menschen eine Plattform.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 750 }}>
          <div className="section-header">
            <span className="label">Nachwuchs</span>
            <h2>Nachwuchs fördern</h2>
          </div>
          <p>Als Kerbverein liegt uns die Jugend besonders am Herzen. Wir bieten jungen Menschen aus Brensbach und Umgebung die Möglichkeit, sich aktiv in die Dorfgemeinschaft einzubringen und Verantwortung zu übernehmen.</p>

          <h3 className="mt-lg">Was wir bieten</h3>
          <ul style={{ margin: 'var(--s3) 0 0 var(--s6)' }}>
            <li>Einbindung in die Organisation der Kerb und anderer Events</li>
            <li>Gemeinschaftliche Aktivitäten und Ausflüge</li>
            <li>Übernahme von Verantwortung im Vereinsleben</li>
            <li>Teil einer gewachsenen Gemeinschaft werden</li>
          </ul>

          <h3 className="mt-lg">Mitmachen</h3>
          <p>Interesse? Komm einfach bei einem unserer Treffen vorbei oder <Link href="/kontakt">schreib uns</Link>. Wir freuen uns über jeden, der sich einbringen möchte!</p>

          <div className="mt-lg">
            <Link href="/" className="btn btn-outline">← Zurück zur Startseite</Link>
          </div>
        </div>
      </section>
    </>
  );
}
