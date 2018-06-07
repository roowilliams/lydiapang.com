import React, { Component } from 'react'
import styled from 'styled-components'

const ImageGallery = ({images}) => {

    const grid = images.map((image, i) => {
        return <Image key={'image-'+i} src={image.image.url} />
    }) 
    return (
        <Container>
            { grid }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Image = styled.img`
    align-self: center;
    flex: 0 0 auto;
    max-width: 100%;
`

export default ImageGallery