import styled, { css } from 'styled-components'
import React, { ReactNode, useContext } from 'react'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

const StyledHeader = styled.header<{ themeCtx: string; fontSize?: string; windowWidth?: number }>`
    font-weight: 700;
    margin: 0;
    color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.heading`)};

    h1 {
        font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : '3.2rem')};
        height: 32px;
        font-weight: inherit;
        ${({ windowWidth }) =>
            windowWidth &&
            windowWidth < 550 &&
            css`
                font-size: 20px;
            `};
    }
    h2 {
        font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : '1.6rem')};
        height: 16px;
        font-weight: inherit;
    }
    h3 {
        font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : '1.2rem')};
        height: 12px;
        font-weight: inherit;
    }
`

interface Props {
    size: string
    fontSize?: string
    windowWidth?: number
}
const Header: React.FC<Props> = ({ size, children, fontSize, windowWidth }) => {
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

    return (
        <StyledHeader windowWidth={windowWidth} fontSize={fontSize} themeCtx={activeTheme}>
            {renderSwitch(size, children)}
        </StyledHeader>
    )
}

export default Header
