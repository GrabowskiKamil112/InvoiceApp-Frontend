import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'

const user = null

export const App = () => {
    return (
        <MainTemplate>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Navigate to="home" />} />
                    <Route path={'/login'} element={<LoginRegister />} />

                    <Route
                        path={'/home'}
                        element={
                            <RequireAuth redirectTo="/login">
                                <Home user={user} />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </MainTemplate>
    )
}
type RequireAuthProps = {
    redirectTo: string
    children: JSX.Element
}
const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
    const isAuthenticated = user
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}
