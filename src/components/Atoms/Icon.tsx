import styled from 'styled-components'
import SVG from 'react-inlinesvg'

const Icon = styled(SVG)`
    width: 32px;
    height: 32px;
    margin-bottom: 40px;
    cursor: pointer;
    fill: rgb(73, 78, 110);

    &:hover {
        fill: rgb(136, 143, 185);
    }

    @media (max-width: 900px) {
        margin: 0 40px 0 0;
    }
`

export default Icon
