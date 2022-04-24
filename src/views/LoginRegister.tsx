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
    const { activeTheme } = useContext(PageContext)
    const [isRegister, toggleRegister] = useState<boolean>(false)
    const [numOfErrors, setNumOfErrors] = useState(0)
    const formRef = useRef<HTMLFormElement>(null)

    const dispatch = useDispatch()
    const userID = useAppSelector((state) => state.userID)

    const handleNumOfErrors = () => {
        setTimeout(() => {
            const numOfErrors = formRef.current?.getElementsByTagName('label').length
            setNumOfErrors(numOfErrors ? numOfErrors : 0)
        }, 1)
    }

    if (userID) {
        return <Navigate to="/home" />
    }

    return (
        <LoginRegisterTemplate numOfErrors={numOfErrors} isRegister={isRegister}>
            <StyledHeader>{isRegister ? 'Create your account' : 'welcome'}</StyledHeader>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={isRegister ? SignupSchema : undefined}
                onSubmit={async (values: Values) => {
                    console.log(isRegister, values)
                    const { username, email, password } = values
                    let result = (await !isRegister)
                        ? dispatch(authenticate(username, password))
                        : dispatch(registration(username, email, password))

                    result.then((data: string) => console.log('result:', data))

                    alert(JSON.stringify(values, null, 2))
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
                        {isRegister && (
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
                        {isRegister && (
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
                    return toggleRegister(!isRegister)
                }}>
                Sign up
            </Button>
        </LoginRegisterTemplate>
    )
}

export default LoginRegister
