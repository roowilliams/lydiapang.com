import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../utils/styled-utils'
import throttle from 'lodash.throttle'

import Container from '../components/Container'
import NavIcon from '../components/NavIcon'
import Nav from '../components/Nav'

const Wrapper = styled.div`
	display: flex;
	position: fixed;
	align-items: center;
	top: 0;
	width: 100%;
	background-color: white;
	height: ${props => props.minimized ? 3 : 6}rem;
	transition: all 0.22s ease-in-out 0.2s;
	opacity: ${props => props.minimized ? 0.9 : 1};
	flex-direction: row-reverse;
	z-index: 101;
	${media.desktop`flex-direction: row;`}
`



const Branding = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	// margin-right: 2.6rem;
	text-align: left;
	flex: 1;
	white-space: nowrap;
	${media.desktop`
		text-align: right;
	`}
`

const Name = styled.h1`
	transition: all 0.2s ease-in-out 0.2s;
	margin: 0;
	padding: 0;
	position: relative;
	margin-top: ${props => props.minimized ? 1.9 : 0}rem;
	${media.desktop`


	`}
`


const Description = styled.h2`
	margin-top: 0.2em;
	font-weight: 100;
	font-size: 1em;
	opacity: ${props => props.minimized ? 0 : 1};
	transition: opacity 0.2s ease-in-out;
`
const HeaderContainer = styled(Container)`
	align-items: center;
	flex-direction: row-reverse;
	${media.desktop`flex-direction: row;`}
`

class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {
			minimized: false,
			navOpen: false
		}
		this.scrollThreshhold  = 100 // in px
		this.throttleTime = 300 // in ms
		this.updateMinimizeState = this.updateMinimizeState.bind(this)
		this.updateNavState = this.updateNavState.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', throttle(() => this.updateMinimizeState(this.scrollThreshhold), this.throttleTime))
		// window.addEventListener('scroll', () => this.updateMinimizeState(this.scrollThreshhold))
	}

	updateMinimizeState(threshold) {
		let supportPageOffset = window.pageXOffset !== undefined
		let scroll = {
			x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
		}
	
		if (scroll.y > threshold) this.setState({ minimized: true })
		else this.setState({ minimized: false })
	}

	updateNavState() {
		this.setState({navOpen: !this.state.navOpen})
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', () => this.updateMinimizeState(this.scrollThreshhold))
	}
	
	render() {
		const { minimized, navOpen } = this.state
		return (
			<Wrapper minimized={minimized} ref={node => this.headerContainer = node}>
				<HeaderContainer>
					<NavIcon color="rgb(0,0,0)" clicked={navOpen} onClick={this.updateNavState}/>
					<Nav minimized={minimized} mobileNavOpen={navOpen} />

					<Branding>
						<Name minimized={minimized}>Lydia Pang</Name>
						<Description minimized={minimized}>Creative Director</Description>
					</Branding>
				</HeaderContainer>
			</Wrapper>
		)
	}
}
export default Header