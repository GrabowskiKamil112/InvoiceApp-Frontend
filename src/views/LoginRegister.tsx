import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Atoms/Input'
import LoginRegisterTemplate from '../templates/LoginRegisterTemplate'
import { Formik, Form } from 'formik'
import { SignupSchema } from '../utils/utils'
import Button from '../components/Atoms/Button'
import Paragraph from '../components/Atoms/Paragraph'

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
interface Values {
    username: string
    email: string
    password: string
    passwordConfirm: string
}

export default function LoginRegister() {
    const [isRegister, toggleRegister] = useState<boolean>(false)

    return (
        <LoginRegisterTemplate>
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
                validationSchema={SignupSchema}
                onSubmit={(values: Values) => {
                    alert(JSON.stringify(values, null, 2))
                }}>
                {({ errors, values }) => (
                    <StyledForm>
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

                        <Button width="150px" type="submit">
                            Submit
                        </Button>
                    </StyledForm>
                )}
            </Formik>
            <Paragraph>Don't have an account?</Paragraph>
            <Button loginToggle onClick={() => toggleRegister(!isRegister)}>
                Sign up
            </Button>
        </LoginRegisterTemplate>
    )
}
