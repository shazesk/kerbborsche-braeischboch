import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Kerbborsche</h4>
            <p>Kerbtraditionen, Events, Jugendförderung und mehr — seit 2007 in Brensbach.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/gurregsoat/" target="_blank" rel="noopener" aria-label="Facebook">f</a>
              <a href="https://www.instagram.com/kerbborsche_braeischboch" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
              <a href="https://www.youtube.com/@kerbborschebraischboche.v.4891" target="_blank" rel="noopener" aria-label="YouTube">yt</a>
              <a href="https://open.spotify.com/playlist/5pDSWXd1vFvZVyAqCkBYAi" target="_blank" rel="noopener" aria-label="Spotify">♫</a>
            </div>
          </div>
          <div>
            <h4>Seiten</h4>
            <ul className="footer-nav">
              <li><Link href="/">Startseite</Link></li>
              <li><Link href="/kerb">Kerb 2025</Link></li>
              <li><Link href="/jubilaeum">20 Jahre Jubiläum</Link></li>
              <li><Link href="/kontakt">Kontakt &amp; Beitreten</Link></li>
              <li><Link href="/vorstand">Vorstand</Link></li>
              <li><Link href="/galerie">Galerie</Link></li>
            </ul>
          </div>
          <div>
            <h4>Playlist</h4>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/playlist/5pDSWXd1vFvZVyAqCkBYAi?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kerbborsche Bräischboch e.V.</span>
          <div className="footer-legal">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
