import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import setupServiceWorker from '../utils/setupServiceWorker'
import Prismic from 'prismic-javascript'
import { initApi } from '../utils/prismic'
import ImageGallery from '../components/ImageGallery'

export default class Page extends Component {
	constructor(props) {
		super(props)
	}

	static async getInitialProps({ req, query }) {
		console.log(query.uid)
		const content = await initApi()
		.then(api => {
			return api.getByUID('project', query.uid)
		  })
		.catch(err => console.log(err))

		// .then(api => {
		// 	return api
		// 	.query(Prismic.Predicates.at('document.type', 'project'), {
		// 		fetch: [
		// 		'project.title',
		// 		'project.description',
		// 		'project.date',
		// 		'project.role',
		// 		'project.image_gallery'
		// 		],
		// 		pageSize: 6
		// 	})
		// 	.then(response => {
		// 		return response.results
		// 	})
		// })
		// .catch(err => console.log(err))

		return {
			content: content
		}
	}

	componentDidMount() {
		setupServiceWorker()
	}

	render() {
		console.log(this.props.content)
		const content = this.props.content.data
		const title = content.title[0].text
		const role = content.role
		const description = content.description[0].text
		const { featured_image, image_gallery, additional_images, image_carousel } = content
		

		return (
			<Layout title="Lydia Pang. Work.">
				<h1>Work</h1>
				{content
					?	
					<div className="container">
						{ title && <Title>{title}</Title> }
						{ description && <Description>{description}</Description> }
						{ featured_image && <FeaturedImage src={featured_image.url} /> }
						{ image_gallery && <ImageGallery images={image_gallery} />}
					</div>
				
					: <div>Loading...</div>
				}
			</Layout>
			)
	}
}

const FeaturedImage = styled.img`
`

const Title = styled.h1`
`

const Description = styled.div`
`