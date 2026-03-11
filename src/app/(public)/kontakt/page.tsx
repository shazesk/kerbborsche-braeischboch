import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt & Beitreten',
  description: 'Kontaktiere die Kerbborsche oder werde Mitglied im Verein.',
};

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic08.jpg')" }}>
        <div className="hero-content">
          <h1>Kontakt &amp; Beitreten</h1>
          <p>Schreib uns oder werde Teil der Kerbborsche!</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Kontakt</span>
            <h2>Schreib uns</h2>
            <p>Fragen, Anregungen oder Interesse am Verein? Wir melden uns bei euch!</p>
          </div>
          <form className="form-grid" action="https://formspree.io/f/DEINE-ID" method="POST">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="betreff">Betreff</label>
              <select id="betreff" name="betreff">
                <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                <option value="Mitgliedschaft">Mitgliedschaft</option>
                <option value="Kerb">Kerb / Veranstaltungen</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="nachricht">Nachricht *</label>
              <textarea id="nachricht" name="nachricht" required></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-checkbox">
                <input type="checkbox" required />
                Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/datenschutz">Datenschutzerklärung</Link> zu. *
              </label>
            </div>
            <div className="form-group full-width">
              <button type="submit" className="btn btn-primary">Nachricht senden →</button>
            </div>
          </form>
          <p className="text-center mt-md" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Oder direkt per E-Mail: <a href="mailto:kontakt@kerbborsche-braeischboch.de">kontakt@kerbborsche-braeischboch.de</a>
          </p>
        </div>
      </section>

      {/* Mitglied werden */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="label">Mitmachen</span>
            <h2>Mitglied werden</h2>
            <p>Du möchtest bei den Kerbborsche mitmachen? So geht&apos;s.</p>
          </div>

          <div style={{ maxWidth: 700, margin: '0 auto var(--s8)' }}>
            <h3>Voraussetzungen</h3>
            <ul style={{ margin: 'var(--s3) 0 0 var(--s6)' }}>
              <li>Brensbacher Wurzeln oder eine längere Verbundenheit zum Ort</li>
              <li>Keine aktive Mitgliedschaft in einem anderen Kerbverein</li>
              <li>Bei Minderjährigen: Einverständnis der Erziehungsberechtigten</li>
            </ul>
          </div>

          <div className="steps">
            <div className="step">
              <h4>Reinschnuppern</h4>
              <p>Komm einfach zu unseren Treffen vorbei, lerne die Mitglieder und den Vorstand kennen.</p>
            </div>
            <div className="step">
              <h4>Antrag stellen</h4>
              <p>Fülle den Mitgliedsantrag aus und gib ihn beim Vorstand ab. Bei unter 18: mit Unterschrift der Eltern.</p>
            </div>
            <div className="step">
              <h4>Dabei sein</h4>
              <p>Auch passive Mitgliedschaft ist möglich — für alle, die uns finanziell unterstützen möchten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Dokumente</span>
            <h2>Downloads</h2>
          </div>
          <div className="download-grid">
            <div className="download-card">
              <h4>Vereinssatzung</h4>
              <p>Alle Infos über unseren Verein, den Vorstand und seine Zusammensetzung.</p>
              <a href="/assets/pdfs/vereinssatzung.pdf" className="btn btn-outline btn-sm" download>PDF herunterladen</a>
            </div>
            <div className="download-card">
              <h4>Mitgliedsantrag</h4>
              <p>Den ausgefüllten Antrag einfach beim Vorstand abgeben.</p>
              <a href="/assets/pdfs/mitgliedsantrag.pdf" className="btn btn-outline btn-sm" download>PDF herunterladen</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
