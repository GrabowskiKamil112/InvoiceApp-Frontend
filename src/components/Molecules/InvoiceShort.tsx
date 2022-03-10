import React, { useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100%;
    height: 74px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 250ms ease-out;
    outline: 1px solid rgba(124, 93, 250, 0);
    padding: 10px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.sidebar.bg`)};
    &:hover {
        outline: 1px solid #7c5dfa;
    }
`

const InvoiceShort: React.FC = ({ children }) => {
    const { activeTheme } = useContext(PageContext)
    return <StyledWrapper themeCtx={activeTheme}>{children}</StyledWrapper>
}

export default InvoiceShort
