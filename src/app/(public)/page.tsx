import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero hero-home" style={{ backgroundImage: "url('/assets/images/pic02.jpg')" }}>
        <div className="hero-content">
          <Image src="/assets/images/logo.png" alt="Kerbborsche Wappen" width={90} height={90} className="hero-crest" />
          <div className="hero-badge">Seit 2007 in Brensbach</div>
          <h1>Gurre g&apos;soat zur Bräischbocher Kerb.</h1>
          <p>Kerbtraditionen, Events, Jugendförderung und mehr — für unser Dorf.</p>
          <div className="hero-actions">
            <Link href="/kerb" className="btn btn-primary">Kerb 2025 entdecken →</Link>
            <Link href="/kontakt" className="btn btn-ghost">Mitglied werden</Link>
          </div>
        </div>
      </section>

      {/* Kerb Phases */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Tradition</span>
            <h2>Die Bräischbocher Kerb</h2>
            <p>Jedes Jahr am ersten Montag im September und dem vorausgehenden Wochenende.</p>
          </div>
          <div className="phases-grid">
            {[
              { img: 'pic01.jpg', title: 'Kerbfreitag', desc: 'Kerbrede & Kerbbaum' },
              { img: 'pic02.jpg', title: 'Kerbsamstag', desc: 'Party im Schützenhaus' },
              { img: 'pic03.jpg', title: 'Kerbsonntag', desc: 'Umzug durchs Dorf' },
              { img: 'pic04.jpg', title: 'Kerbmontag', desc: 'Frühschoppen im Zelt' },
              { img: 'pic05.jpg', title: 'Kerbdienstag', desc: 'Kerbverbrennung' },
            ].map((phase) => (
              <div className="phase-card" key={phase.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/images/${phase.img}`} alt={phase.title} />
                <div className="phase-overlay">
                  <h4>{phase.title}</h4>
                  <p>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kerb 2025 Callout */}
      <section className="section section-alt">
        <div className="container">
          <div className="callout">
            <span className="hero-badge">Save the Date</span>
            <h2>Bräischbocher Kerb 2025</h2>
            <p>29. August – 2. September 2025. Feiert mit uns die Bräischbocher Kerb!</p>
            <Link href="/kerb" className="btn btn-primary">Zur Veranstaltung →</Link>
          </div>
        </div>
      </section>

      {/* Activity Cards */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="label">Unser Verein</span>
            <h2>Mehr als nur Kerb</h2>
            <p>Wir sind mehr als ein Kerbverein. Erfahrt, was uns noch bewegt.</p>
          </div>
          <div className="card-grid">
            {[
              { href: '/events', img: 'pic09.jpg', title: 'Events', desc: 'Feste, Partys, Public Viewings und mehr — wir bringen das Dorf zusammen.' },
              { href: '/jugendfoerderung', img: 'pic08.jpg', title: 'Jugendförderung', desc: 'Wir fördern den Nachwuchs und geben jungen Menschen eine Plattform.' },
              { href: '/gemeinschaftsarbeit', img: 'pic07.jpg', title: 'Gemeinschaftsarbeit', desc: 'Gemeinsam anpacken — für Brensbach und unsere Gemeinschaft.' },
            ].map((card) => (
              <Link href={card.href} className="card-link" key={card.href}>
                <div className="card">
                  <div className="card-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/images/${card.img}`} alt={card.title} className="card-img" />
                  </div>
                  <div className="card-body">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <span className="card-cta">Mehr erfahren →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
