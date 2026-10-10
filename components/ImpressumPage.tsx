import { LegalPage, LegalHeading, LegalP } from './LegalPage'

export function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalHeading>Angaben gemäß § 5 DDG</LegalHeading>
      <LegalP>
        Darya Goloborodko<br />
        Spreestraße 22<br />
        12439 Berlin<br />
        Deutschland
      </LegalP>

      <LegalHeading>Kontakt</LegalHeading>
      <LegalP>
        Telefon: +49 178 1618786<br />
        E-Mail: dashagoloborodko@gmail.com
      </LegalP>

      <LegalHeading>Umsatzsteuer</LegalHeading>
      <LegalP>
        Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
      </LegalP>

      <LegalHeading>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</LegalHeading>
      <LegalP>
        Darya Goloborodko (Anschrift wie oben)
      </LegalP>

      <LegalHeading>Streitschlichtung</LegalHeading>
      <LegalP>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#141414' }}>
          https://ec.europa.eu/consumers/odr/
        </a>
        . Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </LegalP>
    </LegalPage>
  )
}
