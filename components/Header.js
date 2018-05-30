import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { media } from '../utils/styled-utils'
import throttle from 'lodash.throttle'

import NavIcon from '../components/NavIcon'


const Wrapper = styled.div`
	transition: all 0.2s ease-in-out;
	display: flex;
	position: fixed;
	top: 0;
	width: 100%;
	background-color: white;
	height: ${props => props.minimized ? 3 : 6}rem;
	overflow: hidden;
	transition: all 0.22s ease-in-out;
	transition-delay: 0.2s;
	opacity: ${props => props.minimized ? 0.9 : 1};
	flex-direction: row-reverse;
	${media.desktop`flex-direction: row;`}
`

const Nav = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex: 1;
	margin: 0 1rem 0;

	a {
		font-family: 'Roboto', sans-serif;
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: 0.1em;
		color: black;
		padding: ${props => props.minimized ? 1 : 2}rem 0;
		transition: padding 0.22s ease-in-out;
		transition-delay: 0.2s;
	}
`

const Branding = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	margin-right: 2.6rem;
	text-align: left;
	flex: 1;
	margin: 0 1rem 0;
	${media.desktop`
		text-align: right;
	`}
	
`

const Name = styled.h1`
	transition: all 0.2s ease-in-out;
	margin: 0;
	padding: 2rem 0 0;
	margin-bottom: 0.2em;

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
				<NavIcon color="rgb(255,40,40)" clicked={navOpen} onClick={this.updateNavState}/>
				<Nav minimized={minimized}>
					<Link href="/">
							<a>About</a>
					</Link>
					<Link href="/work">
							<a>Work</a>
					</Link>
					<a href="http://lydiapanglydiapang.tumblr.com" target="_blank">Tumblr</a>
					<a href="http://instagram.com/lydia_pang_" target="_blank">Instagram</a>
				</Nav>

				<Branding>
					<Name>Lydia Pang</Name>
					<Description minimized={minimized}>Creative Director</Description>
				</Branding>

			</Wrapper>
		)
	}
}
export default Header