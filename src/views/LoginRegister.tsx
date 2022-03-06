import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Atoms/Input'
import LoginRegisterTemplate from '../templates/LoginRegisterTemplate'
import { Formik, Form } from 'formik'
import { SignupSchema } from '../utils/utils'

const StyledHeader = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    word-spacing: 0.25rem;
`
const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 8px;
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
            <StyledHeader>Create your account</StyledHeader>
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
                            placeholder="username"
                            value={values.username}
                        />
                        <Input
                            validationError={errors.email}
                            type="email"
                            name="email"
                            placeholder="email"
                            value={values.email}
                        />
                        <Input
                            validationError={errors.password}
                            type="password"
                            name="password"
                            placeholder="password"
                            value={values.password}
                        />
                        <Input
                            validationError={errors.passwordConfirm}
                            type="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="passwordConfirm"
                            value={values.passwordConfirm}
                        />

                        <button type="submit">Submit</button>
                    </StyledForm>
                )}
            </Formik>{' '}
            <button onClick={() => toggleRegister(!isRegister)}>registertoggle</button>
        </LoginRegisterTemplate>
    )
}
