import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { media } from '../utils/styled-utils'


const NavWrapper = styled.ul`
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
const Nav = (props) => (
    <NavWrapper {...props}>
        <NavItem {...props}><Link href="/"><a>About</a></Link></NavItem>
        <NavItem {...props}><Link href="/work"><a>Work</a></Link></NavItem>
        <NavItem {...props}><a href="http://lydiapanglydiapang.tumblr.com" target="_blank">Tumblr</a></NavItem>
        <NavItem {...props}><a href="http://instagram.com/lydia_pang_" target="_blank">Instagram</a></NavItem>
    </NavWrapper>
)
export default Nav