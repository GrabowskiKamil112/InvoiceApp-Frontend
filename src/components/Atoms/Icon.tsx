import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { themeNavigator } from '../../utils/utils'

const Icon = styled(SVG)<{ themectx: string }>`
    width: 282px;
    height: 28px;
    margin-bottom: 40px;
    cursor: pointer;

    transition: all 0.25s ease-in-out;
    fill: ${({ themectx }) => themeNavigator(`${themectx}.icon`)};

    &:hover {
        fill: rgb(136, 143, 185);
        transform: translateX(6px);
    }

    @media (max-width: 900px) {
        margin: 0 40px 0 0;
    }
`

export default Icon
