import React from 'react'
import MainTemplate from '../templates/mainTemplate'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import Home from './Home'
import { store } from '../store'
import { connect, Provider } from 'react-redux'
import { IRootState } from '../store/reducers/rootReducer'
import 'bulma/css/bulma.min.css'

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
                                <ProtectedRoute redirectTo="/login" userID={null}>
                                    <Home />
                                </ProtectedRoute>
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
    userID: string | null
}
const RequireAuth = ({ children, redirectTo, userID }: RequireAuthProps) => {
    const child = React.cloneElement(children, { user: userID })
    return userID ? child : <Navigate to={redirectTo} />
}

const mapStateToProps = (state: IRootState) => {
    const { userID } = state
    return { userID }
}

const ProtectedRoute = connect(mapStateToProps, null)(RequireAuth)
export default App
