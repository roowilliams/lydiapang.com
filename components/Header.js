import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import throttle from 'lodash.throttle'


const Wrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	background-color: white;
	height: ${props => props.minimized ? 3 : 6}rem;
	overflow: hidden;
	transition: all 0.22s ease-in-out;
	transition-delay: 0.2s;
	opacity: ${props => props.minimized ? 0.9 : 1};
`

const Nav = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;

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
	text-align: right;
`

const Name = styled.h1`
	margin: 0;
	padding: 2rem 0 0;
	margin-bottom: 0.2em;
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
			minimized: false
		}
		this.scrollThreshhold  = 100 // in px
		this.throttleTime = 300 // in ms
		this.updateMinimizeState = this.updateMinimizeState.bind(this)
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

	componentWillUnmount() {
		window.removeEventListener('scroll', () => this.updateMinimizeState(this.scrollThreshhold))
	}
	
	render() {
		const { minimized } = this.state

		return (
			<Wrapper className="grid" minimized={minimized} ref={node => this.headerContainer = node}>
				<Nav className="col" minimized={minimized}>
					<Link href="/">
							<a>About</a>
					</Link>
					<Link href="/work">
							<a>Work</a>
					</Link>
					<a href="http://lydiapanglydiapang.tumblr.com" target="_blank">Tumblr</a>
					<a href="http://instagram.com/lydia_pang_" target="_blank">Instagram</a>
				</Nav>

				<Branding className="col">
					<Name>Lydia Pang</Name>
					<Description minimized={minimized}>Creative Director</Description>
				</Branding>

			</Wrapper>
		)
	}
}
export default Header