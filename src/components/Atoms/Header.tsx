import styled from 'styled-components'
import React, { ReactNode, useContext } from 'react'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

const StyledHeader = styled.header<{ themeCtx: string }>`
    font-weight: 700;
    margin: 0;
    line-height: 36px;
    color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.heading`)};

    h1 {
        font-size: 3.2rem;
        font-weight: inherit;
    }
    h2 {
        font-size: 1.6rem;
        font-weight: inherit;
    }
    h3 {
        font-size: 1.2rem;
        font-weight: inherit;
    }
`

interface Props {
    size: string
}
const Header: React.FC<Props> = ({ size, children }) => {
    const { activeTheme } = useContext(PageContext)
    const renderSwitch = (param: string, child: ReactNode) => {
        switch (param) {
            case 'big':
                return <h1>{child}</h1>
            case 'medium':
                return <h2>{child}</h2>
            case 'small':
                return <h3>{child}</h3>
        }
    }

    return <StyledHeader themeCtx={activeTheme}>{renderSwitch(size, children)}</StyledHeader>
}

export default Header
