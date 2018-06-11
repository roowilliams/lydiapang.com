import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../utils/styled-utils'

const ImageGallery = ({images, columns}) => {
    console.log('columns', columns)
    const grid = images.map((image, i) => {
        return (
            <ImageContainer key={'image-'+i} columns={columns}>
                <Image  src={image.image.url}/>
            </ImageContainer>
        )
    })
    return (
        <Container>
            { grid }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 2rem;
`

const ImageContainer = styled.div`
    align-self: center;
    ${media.tablet`width: ${props => props.columns ? '48%' : '100%' };`}
`

const Image = styled.img`
    max-width: 100%;
`

export default ImageGallery