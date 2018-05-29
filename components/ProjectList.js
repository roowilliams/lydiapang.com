import styled from 'styled-components'
import { media } from '../utils/styled-utils'
import Link from 'next/link'
import GridColumn from '../components/GridColumn'

const ProjectImage = styled.img`
    width: 100%;
`



const ProjectList = (props) => {
	console.log(props)
	return (
		<div className="grid">
			{ 
				props.projects.map(project => {
					return (
						<div className="col" key={project.id}>
							<Link as={project.uid ? '/project/' + project.uid : '#'} href={`/project?uid=${project.uid}`}><ProjectImage src={project.data.featured_image.url} alt="" /></Link>
						</div>
					)
				})
			}

		</div>
	)
}

export default ProjectList