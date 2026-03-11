import type { Metadata } from 'next';
import Link from 'next/link';
import PretixWidget from '@/components/ui/PretixWidget';

export const metadata: Metadata = {
  title: 'Kerb 2025',
  description: 'Bräischbocher Kerb 2025 — 29. August bis 2. September. Alle Infos, Programm und Tickets.',
};

export default function KerbPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: "url('/assets/images/pic02.jpg')" }}>
        <div className="hero-content">
          <div className="hero-badge">29. Aug – 2. Sep 2025</div>
          <h1>Bräischbocher Kerb 2025</h1>
          <p>Feiert mit uns die Bräischbocher Kerb — Musik, Essen und gute Laune in Brensbach.</p>
          <div className="hero-actions">
            <a href="#tickets" className="btn btn-primary">Tickets sichern →</a>
            <a href="#programm" className="btn btn-ghost">Programm ansehen</a>
          </div>
        </div>
      </section>

      {/* Event Poster */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Save the Date</span>
            <h2>Das offizielle Plakat</h2>
            <p>Alle Infos auf einen Blick — teilt es gerne mit euren Freunden!</p>
          </div>
          <div className="event-poster text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/pic06.jpg" alt="Kerb 2025 Plakat" />
          </div>
        </div>
      </section>

      {/* Programm */}
      <section id="programm" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="label">Programm</span>
            <h2>Das erwartet euch</h2>
            <p>Zwei Abende voller Musik, Essen und guter Laune.</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-day">Freitag<br/>29. Aug</div>
              <div className="timeline-detail">
                <h4>Clubnight mit DJ Jey Aux Platines</h4>
                <p>Techno &amp; elektronische Beats. Ein Heppenheimer, seit über einem Jahrzehnt in der Szene aktiv.</p>
                <p><strong>Einlass: 21:30 Uhr</strong></p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-day">Samstag<br/>30. Aug</div>
              <div className="timeline-detail">
                <h4>Party Night mit DJ Da Silva</h4>
                <p>Einer der bekanntesten DJs im Raum Frankfurt-Darmstadt seit 1993. Mix aus Schlagern, 90er-2000er Hits und Partymusik.</p>
                <p><strong>Einlass: 20:00 Uhr</strong></p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-day">Essen</div>
              <div className="timeline-detail">
                <h4>Häbbschjemacherei</h4>
                <p>Zum ersten Mal dabei: eine lokale Essensstation direkt am Veranstaltungsort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wann & Wo */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Details</span>
            <h2>Wann &amp; Wo</h2>
          </div>
          <div className="info-grid">
            <div className="info-box">
              <h3>Wann?</h3>
              <p><strong>Freitag, 29. August 2025</strong><br/>Einlass: 21:30 Uhr</p>
              <p><strong>Samstag, 30. August 2025</strong><br/>Einlass: 20:00 Uhr</p>
            </div>
            <div className="info-box">
              <h3>Wo?</h3>
              <p><strong>Ehemaliger Schützenverein-Hof</strong><br/>hinter dem SSV Brensbach Sportplatz</p>
              <p>Waldstraße 83<br/>64395 Brensbach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="label">Eintritt</span>
            <h2>Tickets</h2>
            <p>Sichert euch jetzt eure Tickets für die Kerb 2025!</p>
          </div>
          <PretixWidget organizer="" eventSlug="" />
          <div className="text-center mt-md">
            <Link href="#" className="btn btn-primary">Tickets kaufen →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
