import { LegalPage, LegalHeading, LegalP } from './LegalPage'
import Link from 'next/link'
import { Protected } from './Protected'

export function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalHeading>Angaben gemäß § 5 DDG</LegalHeading>
      <LegalP>
        Darya Goloborodko<br />
        <Protected label="Klicken, um die Adresse anzuzeigen" text={'Spreestraße 22\n12439 Berlin\nDeutschland'} />
      </LegalP>

      <LegalHeading>Kontakt</LegalHeading>
      <LegalP>
        E-Mail: <Protected label="Klicken, um die E-Mail anzuzeigen" text={'contact [at] darya-goloborodko.com'} /><br />
        oder über das <Link href="/contact" style={{ color: '#141414', textDecoration: 'underline', textUnderlineOffset: 3 }}>Kontaktformular</Link>
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
