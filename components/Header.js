import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { media } from '../utils/styled-utils'
import throttle from 'lodash.throttle'

import Container from '../components/Container'
import NavIcon from '../components/NavIcon'


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
	${media.desktop`flex-direction: row;`}
`

const Nav = styled.ul`
	position: absolute;
	top: ${props => props.mobileNavOpen ? 0 : `-100vh`};
	opacity: ${props => props.mobileNavOpen ? 1 : `0`};
	transition: all 0.2s ease-in-out;
	list-style: none;
	width: 110%;
	margin: 0 10%;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	height: 100vh;
	background: black;

	${media.desktop`
		opacity: 1;
		height: auto;
		z-index: 102;
		// position: relative;
		top: 0;
		flex-direction: row;
		flex-grow: 1;
		width: 40%;
		align-items: flex-start;
		justify-content: space-around;
		margin: 0 1rem 0;
		background: transparent;
	`}
`

const NavItem = styled.li`
	list-style: none;
	font-size: 1.8rem;
	line-height: 2;
	opacity: ${props => props.mobileNavOpen ? 1 : `0`};
	transition: all 0.2s ease-in-out 0.2s;

	a {
		text-decoration: none;
		color: white;
		cursor: pointer;
		display: block
		transition: all 0.1s ease-in-out;

		&:hover {
			transform: scale(1.1);
		}
	}

	${media.desktop`
		opacity: 1;
		padding: ${props => props.minimized ? 1 : 2}rem 0;
		transition: padding 0.22s ease-in-out 0.2s;
		font-family: 'Roboto', sans-serif;
		font-size: 1rem;
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: black;
		a {
			color: black;
		}
	`}

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
		console.log('updateNavState', this.state.navOpen)
		this.setState({navOpen: !this.state.navOpen})
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', () => this.updateMinimizeState(this.scrollThreshhold))
	}
	
	render() {
		const { minimized, navOpen } = this.state
		console.log(this.state)
		return (
			<Wrapper minimized={minimized} ref={node => this.headerContainer = node}>
				<HeaderContainer>
					<NavIcon color="rgb(0,0,0)" clicked={navOpen} onClick={this.updateNavState}/>
					<Nav minimized={minimized} mobileNavOpen={navOpen}>
						<NavItem minimized={minimized} mobileNavOpen={navOpen}><Link href="/"><a>About</a></Link></NavItem>
						<NavItem minimized={minimized} mobileNavOpen={navOpen}><Link href="/work"><a>Work</a></Link></NavItem>
						<NavItem minimized={minimized} mobileNavOpen={navOpen}><a href="http://lydiapanglydiapang.tumblr.com" target="_blank">Tumblr</a></NavItem>
						<NavItem minimized={minimized} mobileNavOpen={navOpen}><a href="http://instagram.com/lydia_pang_" target="_blank">Instagram</a></NavItem>
					</Nav>

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