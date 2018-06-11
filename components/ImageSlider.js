import React, { Component } from 'react'
import styled from 'styled-components'

class ImageSlider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visibleSlideIndex: 0
        }

        this.renderSlides = this.renderSlides.bind(this)
        this.nextSlide = this.nextSlide.bind(this)
    }

    componentWillMount() {
        setInterval(() => this.nextSlide(), 3000)
    }

    nextSlide() {
        const numberOfSlides = this.props.images.length
        let currentSlide = this.state.visibleSlideIndex

        const newSlide = (currentSlide < numberOfSlides-1) ? currentSlide+1 : 0
        this.setState({visibleSlideIndex: newSlide})
    }

    renderSlides() {

        return this.props.images.map((image, i) => {
            return (
                <Slide key={'slide-'+i} visible={i === this.state.visibleSlideIndex ? true : false}>
                    <Image src={image.image.url} />
                </Slide>
            )
        }) 
    }

    render() {

        return (
            <Container>
                { this.renderSlides() }
            </Container>
        )
    }
}

const Container = styled.div`
    position: relative;
    width: 100%;
    background: black;
    
`

const Slide = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${props => props.visible ? 1 : 0};
    transition: all 0.4s ease-in-out;
    margin-bottom: 2rem;
`
const Image = styled.img`
    align-self: center;
    flex: 0 0 auto;
    max-width: 100%;
`

export default ImageSlider