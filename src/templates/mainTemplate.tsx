import React, { Component } from 'react'
import GlobalStyle from '../theme/globalStyle'
import theme from '../theme/theme'
import { ThemeProvider } from 'styled-components'

class MainTemplate extends Component {
    render() {
        const { children } = this.props
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        )
    }
}
export default MainTemplate
