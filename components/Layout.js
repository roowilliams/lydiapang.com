import styled from 'styled-components'
import Head from 'next/head'
import Header from './Header'


const Content = styled.div`
	margin-top: 6rem;
`
export default ({
  children,
  title = 'This is the default title',
  description = 'Portfolio of Lydia Pang.',
  canonical = null,
}) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="description" content={description} />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="author" href="Roo Williams" />
			<meta name="robots" content="index,follow" />
			<meta
			name="google-site-verification"
			content="0jhxV5hlLfqQ8q7mc6Xif2GjQ64gn-aXasg1EKeW3gw"
			/>
			<meta name="geo.region" content="USA" />
			<meta name="geo.placename" content="New York" />
			<meta name="theme-color" content="#000" />
			<meta name="application-name" content="Lydia Pang" />
			<link rel="dns-prefetch" href="https://lydia-pang.prismic.io" />
			<link rel="preconnect" href="https://lydia-pang.prismic.io" />
			{canonical && <link rel="canonical" href={canonical} />}
			
			<link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" rel="stylesheet" />
			<link href="https://fonts.googleapis.com/css?family=Roboto:300|Playfair+Display" rel="stylesheet" />
			
			
		</Head>
		<div>
			<Header />
			<Content>
				{children}
			</Content>
		</div>
	</div>
)