import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Events und Veranstaltungen der Kerbborsche Bräischboch e.V.',
};

export default function EventsPage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic09.jpg')" }}>
        <div className="hero-content">
          <h1>Events</h1>
          <p>Feste, Partys und mehr — wir bringen Brensbach zusammen.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 750 }}>
          <div className="section-header">
            <span className="label">Veranstaltungen</span>
            <h2>Mehr als nur Kerb</h2>
          </div>
          <p>Neben der jährlichen Kerb organisieren wir regelmäßig Veranstaltungen für die ganze Gemeinde. Von Public Viewings über Sommerfeste bis hin zu Themenpartys — bei uns ist immer was los.</p>

          <h3 className="mt-lg">Was wir veranstalten</h3>
          <ul style={{ margin: 'var(--s3) 0 0 var(--s6)' }}>
            <li>Sommerfeste und Grillabende</li>
            <li>Public Viewings bei großen Sportereignissen</li>
            <li>Themenpartys und Clubnights</li>
            <li>Gemeinschaftliche Dorffeste</li>
          </ul>

          <h3 className="mt-lg">Nächste Veranstaltungen</h3>
          <p>Aktuelle Termine findet ihr auf unseren Social-Media-Kanälen oder auf der <Link href="/kerb">Kerb 2025 Seite</Link>.</p>

          <div className="mt-lg">
            <Link href="/" className="btn btn-outline">← Zurück zur Startseite</Link>
          </div>
        </div>
      </section>
    </>
  );
}
