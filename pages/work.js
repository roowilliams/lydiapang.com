import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/Layout'
import setupServiceWorker from '../utils/setupServiceWorker'
import Prismic from 'prismic-javascript'
import { initApi } from '../utils/prismic'

import ProjectList from '../components/ProjectList'



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
				'project.title',
				'project.uid'
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
					?	<ProjectList projects={projects} />

					:	<div>Loading...</div>
				}
			</Layout>
			)
	}
}