import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '@/components/ui/Countdown';
import PretixWidget from '@/components/ui/PretixWidget';

export const metadata: Metadata = {
  title: '20 Jahre Kerbborsche — Jubiläum',
  description: '20 Jahre Kerbborsche Bräischboch e.V. — Feiert mit uns das Jubiläum! Tickets und alle Infos.',
};

export default function JubilaeumPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero hero-home" style={{ backgroundImage: "url('/assets/images/pic05.jpg')" }}>
        <div className="hero-content">
          <Image src="/assets/images/logo.png" alt="Kerbborsche Wappen" width={90} height={90} className="hero-crest" />
          <div className="hero-badge">2007 – 2027</div>
          <h1>20 Jahre Kerbborsche</h1>
          <p>Zwei Jahrzehnte Tradition, Gemeinschaft und unvergessliche Momente in Brensbach.</p>
          <div className="hero-actions">
            <a href="#tickets" className="btn btn-primary">Tickets sichern →</a>
            <Link href="/galerie" className="btn btn-ghost">Galerie ansehen</Link>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="label">Save the Date</span>
            <h2>Countdown zum Jubiläum</h2>
            <p>Das große Fest rückt näher — seid dabei, wenn wir 20 Jahre feiern!</p>
          </div>
          <Countdown targetDate="2027-09-01T18:00:00" />
        </div>
      </section>

      {/* Event Details */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Das Fest</span>
            <h2>Das große Jubiläumsfest</h2>
            <p>20 Jahre Kerbborsche Bräischboch verdienen gefeiert zu werden — und zwar richtig!</p>
          </div>
          <div className="info-grid">
            <div className="info-box">
              <h3>Was erwartet euch?</h3>
              <p>Ein Abend voller Überraschungen, Live-Musik, Rückblicke auf 20 Jahre Vereinsgeschichte und natürlich jede Menge Party.</p>
              <p>Weitere Details zum Programm folgen bald!</p>
            </div>
            <div className="info-box">
              <h3>Wann &amp; Wo?</h3>
              <p><strong>Datum:</strong> Wird noch bekanntgegeben</p>
              <p><strong>Ort:</strong> Brensbach</p>
              <p>Haltet euch den Termin frei — es wird legendär!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="label">Tickets</span>
            <h2>Tickets sichern</h2>
            <p>Sichert euch frühzeitig eure Tickets für das Jubiläumsfest!</p>
          </div>
          <PretixWidget organizer="" eventSlug="" />
          <div className="text-center mt-md">
            <Link href="#" className="btn btn-primary">Tickets kaufen →</Link>
          </div>
        </div>
      </section>

      {/* History Teaser */}
      <section className="section">
        <div className="container">
          <div className="callout">
            <span className="hero-badge">Rückblick</span>
            <h2>20 Jahre in Bildern</h2>
            <p>Von den Anfängen bis heute — schaut euch unsere schönsten Momente an.</p>
            <Link href="/galerie" className="btn btn-primary">Zur Galerie →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
