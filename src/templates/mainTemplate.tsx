import React, { useContext, useState } from 'react'
import GlobalStyle from '../theme/globalStyle'
import theme from '../theme/theme'
import styled, { ThemeProvider } from 'styled-components'
import PageContext from '../context/pageContext'
import { themeNavigator } from '../utils/utils'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100vw;
    min-height: 100vh;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.body.bg`)};
    transition: background-color 0.4s ease;
    @media (max-width: 900px) {
        min-height: calc(100vh - 80px);
    }
`

const MainTemplate: React.FC = ({ children }) => {
    const [activeTheme, setTheme] = useState('dark')

    const toggleTheme = () => {
        setTheme((activeTheme) => (activeTheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        <PageContext.Provider value={{ activeTheme, toggleTheme }}>
            <McWrapper>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {children}
                </ThemeProvider>
            </McWrapper>
        </PageContext.Provider>
    )
}

const McWrapper: React.FC = ({ children }) => {
    const { activeTheme } = useContext(PageContext)

    return <StyledWrapper themeCtx={activeTheme}>{children}</StyledWrapper>
}

export default MainTemplate
