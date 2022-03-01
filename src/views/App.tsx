import React from 'react'
import MainTemplate from '../templates/mainTemplate'

export const App = () => {
    return (
        <MainTemplate>
            <h1>
                Hello TS React app - {process.env.NODE_ENV} - {process.env.name}
            </h1>
        </MainTemplate>
    )
}
