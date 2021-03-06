import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'
import { store } from '../store'
import { Provider } from 'react-redux'
import InvoiceDetails from './InvoiceDetails'
import { useAppSelector } from '../store/hooks/hooks'
import { AnimatePresence } from 'framer-motion'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <MainTemplate>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </MainTemplate>
        </Provider>
    )
}

const AnimatedRoutes: React.FC = () => {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path={'/'} element={<Navigate to="home" />} />
                <Route path={'/login'} element={<LoginRegister />} />

                <Route
                    path={'/home'}
                    element={
                        <RequireAuth redirectTo="/login">
                            <Home filterBy="total" />
                        </RequireAuth>
                    }
                />

                <Route
                    path={'/invoice/:id'}
                    element={
                        <RequireAuth redirectTo="/login">
                            <InvoiceDetails />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AnimatePresence>
    )
}

type RequireAuthProps = {
    redirectTo: string
    children: JSX.Element
}
const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
    const isAuthenticated =
        useAppSelector((state) => state.userID) || sessionStorage.getItem('userID')
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
