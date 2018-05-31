import React from 'react'
import styled from 'styled-components'
import { media } from '../utils/styled-utils'

const Wrapper = styled.div`
    position: relative;
    width: 2rem;
    height: 1.4rem;
    cursor: pointer;
    // margin 0.8rem 1rem;
    z-index: 101;
    ${media.desktop`display: none;`}
`

const TopBar = styled.div`
    width: 2rem;
    height: 2px;
    position: absolute;
    top: 0;
    transition: all 0.2s ease-in-out;
    ${props => props.clicked ? `transform: translate(0, 0.6rem) rotate(45deg);` : null}
    background-color: ${props => props.color ? props.color : `black`};
    ${props => props.clicked ? `background-color: white;` : null}
`

const MiddleBar = styled.div`
    width: 2rem;
    height: 2px;
    position: absolute;
    top: calc(50% - 1px);
    transition: all 0.2s ease-in-out;
    ${props => props.clicked ? `transform: scaleX(0);` : null}
    background-color: ${props => props.color ? props.color : `black`};
    ${props => props.clicked ? `background-color: white;` : null}
`

const BottomBar = styled.div`
    width: 2rem;
    height: 2px;
    position: absolute;
    bottom: 0;
    transition: all 0.2s ease-in-out;
    ${props => props.clicked ? `transform: translate(0, -0.6rem) rotate(-45deg);` : null}
    background-color: ${props => props.color ? props.color : `black`};
    ${props => props.clicked ? `background-color: white;` : null}
`

const NavIcon = ({clicked, color, onClick}) => (
    <Wrapper onClick={onClick}>
        <TopBar color={color} clicked={clicked}/>
        <MiddleBar color={color} clicked={clicked}/>
        <BottomBar color={color} clicked={clicked}/>
    </Wrapper>
)

export default NavIcon