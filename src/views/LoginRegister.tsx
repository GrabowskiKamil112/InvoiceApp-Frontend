import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Atoms/Input'
import LoginRegisterTemplate from '../templates/LoginRegisterTemplate'
import { Formik, Form } from 'formik'
import { SignupSchema } from '../utils/validation'
import Button from '../components/Atoms/Button'
import Paragraph from '../components/Atoms/Paragraph'
import PageContext from '../context/pageContext'
import { authenticate, registration } from '../store/actions'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import { Navigate } from 'react-router-dom'
import UserCreatedModal from '../components/Molecules/UserCreatedModal'
import faviconLoading from '../../public/assets/favicon.ico'

const StyledHeader = styled.h3`
    font-family: 'Poppins', sans-serif;
    color: #dfe3fa;
    font-size: 2rem;
    font-weight: 700;
    word-spacing: 0.25rem;
`
const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
`
const MagicDiv = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface Values {
    username: string
    email: string
    password: string
    passwordConfirm: string
}

const LoginRegister: React.FC = () => {
    const [state, setState] = useState({
        isRegister: false,
        isRedirect: false,
        isLoading: false,
        isAuthFailed: false,
        isSuccesModal: false,
    })
    const [numOfErrors, setNumOfErrors] = useState<number>(0)
    const { activeTheme } = useContext(PageContext)
    const formRef = useRef<HTMLFormElement>(null)

    const userID = useAppSelector((state) => state.userID)
    const dispatch = useAppDispatch()

    const handleNumOfErrors = (): void => {
        setTimeout(() => {
            const numOfErrors = formRef.current?.getElementsByTagName('label').length
            setNumOfErrors(numOfErrors ? numOfErrors : 0)
        }, 1)
    }

    const toggleStateProp = (property: keyof typeof state) => {
        setState((prevState) => ({ ...prevState, [property]: !state[property] }))
    }

    if ((userID && !state.isRegister) || state.isRedirect) {
        return <Navigate to="/home" />
    }

    return (
        <>
            {state.isSuccesModal && <UserCreatedModal />}
            <LoginRegisterTemplate numOfErrors={numOfErrors} isRegister={state.isRegister}>
                <StyledHeader>{state.isRegister ? 'Create your account' : 'welcome'}</StyledHeader>
                <Formik
                    validateOnChange={true}
                    validateOnBlur={false}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    validationSchema={state.isRegister ? SignupSchema : undefined}
                    onSubmit={async (values: Values) => {
                        toggleStateProp('isLoading')

                        setTimeout(async () => {
                            const { username, email, password } = values

                            !state.isRegister
                                ? await dispatch(authenticate(username, password)).then(
                                      (result?: Error) => {
                                          toggleStateProp('isLoading')
                                          if (result instanceof Error) {
                                              toggleStateProp('isAuthFailed')
                                          }
                                      }
                                  )
                                : await dispatch(registration(username, email, password)).then(
                                      (username: string) => {
                                          if (username) {
                                              toggleStateProp('isSuccesModal')
                                              setTimeout(() => {
                                                  toggleStateProp('isRedirect')
                                              }, 1000)
                                          } else {
                                              toggleStateProp('isAuthFailed')
                                              toggleStateProp('isLoading')
                                          }
                                      }
                                  )
                        }, 1100)
                    }}>
                    {({ errors, values, touched }) => (
                        <StyledForm ref={formRef} noValidate>
                            <Input
                                validationError={touched.username && errors.username}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={values.username}
                            />
                            {state.isRegister && (
                                <Input
                                    validationError={touched.email && errors.email}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                />
                            )}
                            <Input
                                validationError={touched.password && errors.password}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                            />
                            {state.isRegister && (
                                <Input
                                    validationError={
                                        touched.passwordConfirm && errors.passwordConfirm
                                    }
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm password"
                                    value={values.passwordConfirm}
                                />
                            )}

                            <Button type="submit" variant="submit" disabled={state.isLoading}>
                                <MagicDiv onClick={() => handleNumOfErrors()}>Submit</MagicDiv>
                            </Button>
                        </StyledForm>
                    )}
                </Formik>
                <Paragraph themeCtx={activeTheme}>
                    {state.isRegister ? 'Already' : "Don't"} have an account?
                </Paragraph>
                <Button
                    variant="loginToggle"
                    onClick={() => {
                        toggleStateProp('isRegister')
                    }}>
                    Sign {state.isRegister ? 'in' : 'up'}
                </Button>
            </LoginRegisterTemplate>
        </>
    )
}

export default LoginRegister
