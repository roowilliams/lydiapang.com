import styled from 'styled-components'
import { media } from '../utils/styled-utils'

export default styled.div`
    flex: 0;
    ${media.desktop`
        flex: 1;
        margin: 0 1rem 0;
    `}
`