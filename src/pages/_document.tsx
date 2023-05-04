import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://theatrum.center" />
        <meta property="og:title" content="Theatrum" />
        <meta property="og:description" content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://theatrum.center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
