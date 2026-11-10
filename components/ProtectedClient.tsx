'use client'

import { Fragment, useState } from 'react'

const REVEAL_BTN: React.CSSProperties = {
  background: 'none', border: 0, padding: 0,
  font: 'inherit', color: '#141414',
  textDecoration: 'underline', textUnderlineOffset: 3,
}

// Shows a "click to show" button first; the real text is only decoded
// once a person clicks it — bots reading the page never see it.
export function ProtectedClient({ encoded, label }: { encoded: string; label: string }) {
  const [text, setText] = useState<string | null>(null)

  const reveal = () => {
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
    setText(new TextDecoder().decode(bytes))
  }

  if (text === null) {
    return <button type="button" onClick={reveal} style={REVEAL_BTN}>{label}</button>
  }

  // "\n" in the text becomes a line break
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  )
}
