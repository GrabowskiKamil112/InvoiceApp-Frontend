import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Atoms/Input'
import LoginRegisterTemplate from '../templates/LoginRegisterTemplate'
import { Formik, Form } from 'formik'
import { SignupSchema } from '../utils/utils'
import Button from '../components/Atoms/Button'
import Paragraph from '../components/Atoms/Paragraph'
import PageContext from '../context/pageContext'
import { authenticate, registration } from '../store/actions'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store/hooks/hooks'
import { Navigate } from 'react-router-dom'

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
    const [state, setState] = useState({ isRegister: false, redirect: false })
    const [numOfErrors, setNumOfErrors] = useState<number>(0)
    const { activeTheme } = useContext(PageContext)
    const formRef = useRef<HTMLFormElement>(null)

    const userID = useAppSelector((state) => state.userID)

    const dispatch = useDispatch()

    const handleNumOfErrors = () => {
        setTimeout(() => {
            const numOfErrors = formRef.current?.getElementsByTagName('label').length
            setNumOfErrors(numOfErrors ? numOfErrors : 0)
        }, 1)
    }

    const handleModalAfterRegistration = (username: string) => {
        console.log('userrrrr', username)

        setState({ ...state, ['redirect']: true })
    }

    if ((userID && !state.isRegister) || state.redirect) {
        return <Navigate to="/home" />
    }

    return (
        <LoginRegisterTemplate numOfErrors={numOfErrors} isRegister={state.isRegister}>
            <StyledHeader>{state.isRegister ? 'Create your account' : 'welcome'}</StyledHeader>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={state.isRegister ? SignupSchema : undefined}
                onSubmit={async (values: Values) => {
                    const { username, email, password } = values

                    !state.isRegister
                        ? dispatch(authenticate(username, password))
                        : await dispatch(registration(username, email, password)).then(
                              (username: string) => {
                                  if (username) {
                                      handleModalAfterRegistration(username)
                                  }
                              }
                          )
                }}>
                {({ errors, values }) => (
                    <StyledForm ref={formRef}>
                        <Input
                            validationError={errors.username}
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={values.username}
                        />
                        {state.isRegister && (
                            <Input
                                validationError={errors.email}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                            />
                        )}
                        <Input
                            validationError={errors.password}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                        />
                        {state.isRegister && (
                            <Input
                                validationError={errors.passwordConfirm}
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm password"
                                value={values.passwordConfirm}
                            />
                        )}

                        <Button type="submit" variant="submit">
                            <MagicDiv onClick={() => handleNumOfErrors()}>Submit</MagicDiv>
                        </Button>
                    </StyledForm>
                )}
            </Formik>
            <Paragraph themeCtx={activeTheme}>Don&apos;t have an account?</Paragraph>
            <Button
                variant="loginToggle"
                onClick={() => {
                    return setState({ ...state, ['isRegister']: !state.isRegister })
                }}>
                Sign up
            </Button>
        </LoginRegisterTemplate>
    )
}

export default LoginRegister
