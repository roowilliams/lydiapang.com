import styled from 'styled-components'
import { media } from '../utils/styled-utils'

export default styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 8rem 0;
    display: flex;
    flex-direction: column;

    ${media.desktop`width: 80%;`}
`