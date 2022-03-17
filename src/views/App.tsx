import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'
import { store } from '../store'
import { Provider } from 'react-redux'
import InvoiceDetails from './InvoiceDetails'
import { useAppSelector } from '../store/hooks/hooks'

const App = () => {
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
                                    <Home invoices={undefined} filterBy={''} />
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
    const isAuthenticated = useAppSelector((state) => state.userID)
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export default App
