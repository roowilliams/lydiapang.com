import styled from 'styled-components'
import { media } from '../utils/styled-utils'
import Link from 'next/link'
import GridColumn from '../components/GridColumn'

const Image = styled.img`
	width: 100%;
	height: auto;
	vertical-align: middle;
`

const ProjectImageWrapper = styled.div`
	flex: ${props => props.ratio};
	cursor: pointer;
`


const ProjectItem = ({project}) => {

	const imageSrc = project.data.featured_image.url
	const dimensions = project.data.featured_image.dimensions
	
	const ratio = Math.round(dimensions.width * 100.0 / dimensions.height) / 100 || 1

	return (
		<Link as={project.uid ? '/project/' + project.uid : '#'} href={`/project?uid=${project.uid}`}>
			<ProjectImageWrapper ratio={ratio}>
				<Image src={imageSrc} ratio={ratio} />
			</ProjectImageWrapper>
		</Link>
	)
}


const ProjectGrid = styled.div`
	display: block;
	${media.tablet`display: flex;`}
`

const ProjectList = ({projects}) => {

	return (
		<ProjectGrid>
			{ 
				projects.map(project => {
					return (
						<ProjectItem key={project.id} project={project} alt="" />
					)
				})
			}

		</ProjectGrid>
	)
}

export default ProjectList