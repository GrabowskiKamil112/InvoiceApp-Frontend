import styled from 'styled-components'
import { themeNavigator } from '../../utils/utils'

const Paragraph = styled.p<{ themeCtx: string; small?: boolean }>`
    color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.bodyA`)};
    font-size: ${({ theme, small }) => (small ? theme.sizes.s : theme.sizes.m)};
    text-shadow: 0px 0px 1px #ffffff;
    font-weight: 300;
`

export default Paragraph
