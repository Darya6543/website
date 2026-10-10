import { LegalPage, LegalHeading, LegalP } from './LegalPage'

export function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalHeading>1. Verantwortliche Stelle</LegalHeading>
      <LegalP>
        Darya Goloborodko<br />
        Spreestraße 22<br />
        12439 Berlin<br />
        E-Mail: dashagoloborodko@gmail.com<br />
        Telefon: +49 178 1618786
      </LegalP>

      <LegalHeading>2. Hosting</LegalHeading>
      <LegalP>
        Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet.
        Beim Aufruf der Website erhebt Vercel automatisch technische Zugriffsdaten (sog. Server-Logfiles),
        insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser
        und Betriebssystem. Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an
        einer sicheren und funktionsfähigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
        Da Vercel als US-Anbieter Daten ggf. auch außerhalb der EU verarbeitet, erfolgt dies auf
        Grundlage der EU-Standardvertragsklauseln als geeignete Garantie im Sinne von Art. 46 DSGVO.
      </LegalP>

      <LegalHeading>3. Kontaktformular</LegalHeading>
      <LegalP>
        Die Kontaktseite dieser Website öffnet beim Absenden das E-Mail-Programm des Besuchers
        (mailto-Link) mit vorausgefülltem Namen und Nachricht. Die eingegebenen Daten werden dabei
        nicht auf einem Server dieser Website gespeichert oder verarbeitet, sondern ausschließlich
        über das eigene E-Mail-Programm des Besuchers direkt an{' '}
        dashagoloborodko@gmail.com versendet. Die Verarbeitung der so erhaltenen Nachrichten erfolgt
        zur Beantwortung der Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b bzw. f DSGVO.
      </LegalP>

      <LegalHeading>4. Cookies &amp; Tracking</LegalHeading>
      <LegalP>
        Diese Website setzt keine Cookies ein und verwendet keine Analyse- oder Tracking-Tools
        (z. B. Google Analytics o. ä.). Es findet keine Erstellung von Nutzungsprofilen statt.
      </LegalP>

      <LegalHeading>5. Eingebundene Schriftarten</LegalHeading>
      <LegalP>
        Die auf dieser Website verwendeten Schriftarten werden lokal bei Vercel bereitgestellt und
        nicht von externen Servern (z. B. Google Fonts) nachgeladen. Es findet dabei keine
        Datenübertragung an Dritte statt.
      </LegalP>

      <LegalHeading>6. Ihre Rechte</LegalHeading>
      <LegalP>
        Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten
        (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung
        der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen
        die Verarbeitung (Art. 21 DSGVO). Wenden Sie sich dazu an die oben genannte Kontaktadresse.
        Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, z. B. bei
        der Berliner Beauftragten für Datenschutz und Informationsfreiheit.
      </LegalP>

      <LegalHeading>7. Speicherdauer</LegalHeading>
      <LegalP>
        Über das Kontaktformular erhaltene Nachrichten werden nur so lange aufbewahrt, wie es zur
        Bearbeitung der jeweiligen Anfrage erforderlich ist, sofern keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </LegalP>

      <LegalP>Stand: Oktober 2026</LegalP>
    </LegalPage>
  )
}
