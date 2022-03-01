import React, { useContext, useState } from 'react'
import GlobalStyle from '../theme/globalStyle'
import theme from '../theme/theme'
import styled, { ThemeProvider } from 'styled-components'
import PageContext from '../context/pageContext'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100vw;
    height: 100vh;
    background-color: ${({ themeCtx }) =>
        themeCtx === 'dark' ? theme.dark.body.bg : theme.light.body.bg};
    overflow: hidden;
`

const MainTemplate: React.FC = ({ children }) => {
    const [activeTheme, setTheme] = useState('dark')

    const toggleTheme = () => {
        setTheme((activeTheme) => (activeTheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        <PageContext.Provider value={{ activeTheme, toggleTheme }}>
            <Wrapper>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {children}
                </ThemeProvider>
            </Wrapper>
        </PageContext.Provider>
    )
}

const Wrapper: React.FC = ({ children }) => {
    const { activeTheme } = useContext(PageContext)

    return <StyledWrapper themeCtx={activeTheme}>{children}</StyledWrapper>
}

export default MainTemplate
