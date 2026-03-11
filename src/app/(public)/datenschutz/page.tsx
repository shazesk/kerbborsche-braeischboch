import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der Kerbborsche Bräischboch e.V.',
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: '30vh' }}>
        <div className="hero-content">
          <h1>Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-content">
            <h2>1. Verantwortliche Stelle</h2>
            <p>
              Kerbborsche Bräischboch e.V.<br/>
              Vertreten durch: Till Nürnberger (1. Vorsitzender)<br/>
              Brensbach<br/>
              E-Mail: <a href="mailto:kontakt@kerbborsche-braeischboch.de">kontakt@kerbborsche-braeischboch.de</a>
            </p>

            <h2>2. Allgemeines zur Datenverarbeitung</h2>
            <p>Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers oder wenn die Verarbeitung durch gesetzliche Vorschriften gestattet ist.</p>

            <h2>3. Hosting</h2>
            <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln.</p>

            <h2>4. SSL-Verschlüsselung</h2>
            <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://&quot; auf „https://&quot; wechselt.</p>

            <h2>5. Kontaktformular</h2>
            <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular (Name, E-Mail-Adresse, Betreff, Nachricht) zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
            <p>Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Das Kontaktformular wird über den Dienst Formspree verarbeitet. Weitere Informationen finden Sie in der Datenschutzerklärung von Formspree.</p>

            <h2>6. Ticket-Verkauf</h2>
            <p>Für den Verkauf von Veranstaltungstickets nutzen wir den Dienst Pretix. Beim Kauf von Tickets werden Ihre Daten (Name, E-Mail, Zahlungsinformationen) direkt von Pretix verarbeitet. Bitte beachten Sie die Datenschutzerklärung von Pretix (rami.io GmbH).</p>

            <h2>7. Eingebettete Inhalte</h2>
            <h3>Spotify</h3>
            <p>Auf unseren Seiten sind Plugins des Musikdienstes Spotify eingebunden. Wenn Sie eine Seite mit Spotify-Plugin aufrufen, wird eine Verbindung zu den Servern von Spotify hergestellt. Dabei wird dem Spotify-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Anbieter: Spotify AB, Regeringsgatan 19, SE-111 53 Stockholm, Schweden.</p>

            <h3>YouTube</h3>
            <p>Unsere Website nutzt ggf. Plugins der von Google betriebenen Seite YouTube. Wenn Sie eine mit YouTube-Plugin ausgestattete Seite besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt.</p>

            <h2>8. Social Media Links</h2>
            <p>Auf unserer Website befinden sich Links zu unseren Social-Media-Profilen (Facebook, Instagram, YouTube, Spotify). Es handelt sich um einfache Verlinkungen — beim Aufrufen unserer Website werden keine Daten an die sozialen Netzwerke übertragen. Erst beim Anklicken der Links werden Sie auf die jeweilige Plattform weitergeleitet.</p>

            <h2>9. Ihre Rechte</h2>
            <p>Sie haben das Recht:</p>
            <ul>
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
              <li>Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)</li>
            </ul>
            <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:kontakt@kerbborsche-braeischboch.de">kontakt@kerbborsche-braeischboch.de</a></p>

            <h2>10. Änderung dieser Datenschutzerklärung</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.</p>
            <p><em>Stand: März 2026</em></p>
          </div>
        </div>
      </section>
    </>
  );
}
