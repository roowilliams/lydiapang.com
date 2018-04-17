import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'

injectGlobal`
    body {
        font-family: 'Playfair Display', serif;
    }

    .container {
        width: 80%;
        margin: 0 auto;
        padding: 8rem 0;
    }

    .grid {
        display: flex;
    }

    .col {
        flex: 1;
        margin: 0 1rem 0;
    }

    p {
        line-height: 1.5;
        color: rgb(30,30,30)
    }
`


export default class MyCustomDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags } // return styles collected
  }

  render () {
    return (
      <html>
        <Head>
          <title>My Page Title</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}