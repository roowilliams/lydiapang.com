import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import setupServiceWorker from '../utils/setupServiceWorker'
import Prismic from 'prismic-javascript'
import { initApi } from '../utils/prismic'


const ProjectGallery = (props) => {
	console.log(props)
	return (
		<div className="grid">
			{ 
				props.projects.map(project => {
					return (
						<div className="col" key={project.id}><img src={project.data.featured_image.url} alt="" /></div>
					)
				})
			}
			<style jsx>{`
				.col > img {
					width: 100%;
				}

			`}</style>
		</div>
	)
}

export default class Page extends Component {
	constructor(props) {
		super(props)
	}

	static async getInitialProps({ req }) {
		const content = await initApi()
		.then(api => {
			return api
			.query(Prismic.Predicates.at('document.type', 'project'), {
				fetch: [
				'project.featured_image',
				'project.title'
				],
				pageSize: 6
			})
			.then(response => {
				return response.results
			})
		})
		.catch(err => console.log(err))

		return {
			content: content
		}
	}

	componentDidMount() {
		setupServiceWorker()
	}

	render() {
		console.log(this.props.content)
		const projects = this.props.content

		return (
			<Layout title="Lydia Pang. Work.">
				<h1>Work</h1>
				{this.props.content
					?  (	<div className="container">	
								<ProjectGallery projects={projects} />
							</div>
						)
					: <div>Loading...</div>
				}
			</Layout>
			)
	}
}