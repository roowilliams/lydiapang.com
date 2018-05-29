import styled from 'styled-components'
import { media } from '../utils/styled-utils'

export default styled.div`
    display: flex;
    flex-direction: column;
    ${media.desktop`flex-direction: row;`}
`