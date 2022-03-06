import styled from 'styled-components'
import SVG from 'react-inlinesvg'

const Icon = styled(SVG)`
    width: 30px;
    height: 30px;
    margin-bottom: 40px;
    cursor: pointer;

    transition: all 0.25s ease-in-out;
    fill: rgb(73, 78, 110);

    &:hover {
        fill: rgb(136, 143, 185);
        transform: translateX(6px);
    }

    @media (max-width: 900px) {
        margin: 0 40px 0 0;
    }
`

export default Icon
