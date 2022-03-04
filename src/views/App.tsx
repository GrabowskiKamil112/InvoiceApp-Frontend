import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'

export const App = () => {
    return (
        <MainTemplate>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Navigate to="home" />} />
                    <Route path={'/login'} element={<LoginRegister />} />
                    <Route path={'/home'} element={<Home />} />
                </Routes>
            </BrowserRouter>
        </MainTemplate>
    )
}
