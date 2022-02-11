import React, { Component } from 'react'
import GlobalStyle from '../theme/globalStyle'

export default class MainTemplate extends Component {
    render() {
        const { children } = this.props
        return (
            <>
                <GlobalStyle />
                {children}
            </>
        )
    }
}
