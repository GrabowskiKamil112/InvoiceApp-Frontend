import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'

export const App = () => {
    return (
        <MainTemplate>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Navigate to="login" />} />
                    <Route path={'/login'} element={<LoginRegister />} />
                </Routes>
            </BrowserRouter>
        </MainTemplate>
    )
}
