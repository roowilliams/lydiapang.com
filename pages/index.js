import React, { Component } from 'react'
import Layout from '../components/Layout'
import Prismic from 'prismic-javascript'
import { initApi } from '../utils/prismic'
import styled from 'styled-components'


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

    return (
        <Layout title="Lydia Pang. Creative Director. NYC.">
            <h1>Lydia Pang. Creative Director. NYC.</h1>
            {this.props.content
                ? (
                <div>
                    <HeroImage src={this.props.content[0].data.about_image.url} data-pin-nopin />
                    <div className="grid">
                        <div className="col">
                            <Headline headline_text={this.props.content[0].data.headline} />
                        </div>
                        <div className="col">
                            <BodyCopy body_text={this.props.content[0].data.body_text} />
                            <Email address={this.props.content[0].data.email[0].text} />
                        </div>
                    </div>
                </div>
                )
                : <div>Loading...</div>
            }
        </Layout>
    )
  }
}

const HeroImage = styled.img`
    width: 100%;
`

const Copy = props => (
    <div className={props.className}>
        {props.body_text.map((paragraph, i) => (<p key={i}>{paragraph.text}</p>))}
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

const Headline = props => (
    <div>
        {props.headline_text.map((paragraph, i) => (<Paragraph key={i}>{paragraph.text}</Paragraph>))}
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