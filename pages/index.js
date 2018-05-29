import React, { Component } from 'react'
import Layout from '../components/Layout'
import Prismic from 'prismic-javascript'
import { initApi } from '../utils/prismic'
import styled from 'styled-components'

import Container from '../components/Container'
import ColumnContainer from '../components/ColumnContainer';
import Column from '../components/Column';


export default class Page extends Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ req }) {
    const content = await initApi()
      .then(api => api
        .query(Prismic.Predicates.at('document.type', 'about_page'))
        .then((response) => response.results))
      .catch(err => console.log(err))

    return {
      content,
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props.content)
    const content = this.props.content[0].data
    return (
        <Layout title="Lydia Pang. Creative Director. NYC.">
            <Container>
                <h1>Lydia Pang. Creative Director. NYC.</h1>
                {content
                    ? (
                    <div>
                        <HeroImage src={content.about_image.url} data-pin-nopin />
                        <ColumnContainer>
                            <Column>
                                <Headline headlineText={content.headline} />
                            </Column>
                            <Column>
                                <BodyCopy bodyText={content.body_text} />
                                <Email address={content.email[0].text} />
                            </Column>
                        </ColumnContainer>
                    </div>
                    )
                    : <div>Loading...</div>
                }
            </Container>
        </Layout>
    )
  }
}

const HeroImage = styled.img`
    width: 100%;
`

const Copy = ({bodyText, className}) => (
    <div className={className}>
        { bodyText.map((paragraph, i) => <p key={'body-para-'+i}>{paragraph.text}</p>) }
    </div>
)

const BodyCopy = styled(Copy)`
    margin-top: 1.74rem;

    p:first-child:first-letter {
        float: left;
        font-size: 3.45em;
        line-height: 0.7;
        padding-top: 0em;
        padding-right: 0.1em;
        padding-left: 0.04em;
    }
`

const Headline = ({headlineText}) => (
    <div>
        {headlineText.map((paragraph, i) => (<Paragraph key={'headline-para-'+i}>{paragraph.text}</Paragraph>))}
    </div>
)

const Paragraph = styled.p`
    font-size: 2.2em;
    line-height: 1.2;
    font-weight: 700;
`


const Email = props => (
  <EmailLink href={`mailto:${props.address}`}>{props.address}</EmailLink>
)

const EmailLink = styled.a`
    color: black;
    text-decoration: underline;
`