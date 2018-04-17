import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import debounce from 'lodash.debounce'


const Wrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	background-color: white;
	height: ${props => props.minimized ? 3 : 6}rem;
	overflow: hidden;
	transition: all 0.3s ease-in-out;
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
		transition: padding 0.3s ease-in-out;
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
`

class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {
			minimized: false
		}
		this.scrollThreshhold = 100 // in px
		this.debounceTime = 100 // in ms
		this.updateMinimizeState = this.updateMinimizeState.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', debounce(() => this.updateMinimizeState(this.scrollThreshhold), this.debounceTime))
		// window.addEventListener('scroll', () => this.updateMinimizeState(this.scrollThreshhold))
	}

	updateMinimizeState(threshold) {
		console.log('update')
		let supportPageOffset = window.pageXOffset !== undefined
		let scroll = {
			x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
		}
	
		if (scroll.y > threshold) this.setState({ minimized: true })
		else this.setState({ minimized: false })
	}

	componentWillUnmount() {
		window.removeEventListener('scroll')
	}
	
	render() {
		const { minimized } = this.state
		console.log(minimized)
		return (
			<Wrapper className="grid" minimized={minimized} ref={node => this.headerContainer = node}>
				<Nav className="col" minimized={minimized}>
					<Link href="/">
							<a>About</a>
					</Link>
					<Link href="/work">
							<a>Work</a>
					</Link>
					<Link href="http://lydiapanglydiapang.tumblr.com">
							<a>Tumblr</a>
					</Link>
					<Link href="http://instagram.com/lydia_pang_">
							<a>Instagram</a>
					</Link>
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