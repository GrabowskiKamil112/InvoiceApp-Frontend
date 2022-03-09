import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'
import store from '../store'
import { Provider } from 'react-redux'

const user = null

export const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
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
