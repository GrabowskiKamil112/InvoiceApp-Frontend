import styled, { css } from 'styled-components'
import React, { useEffect, useState } from 'react'
import usernameIcon from '../../../public/assets/user.png'
import emailIcon from '../../../public/assets/arroba.png'
import passwordIcon from '../../../public/assets/lock.png'
import { Field } from 'formik'
import { CSSTransition } from 'react-transition-group'

const StyledLabel = styled.label`
    font-size: 1rem;
    // enter from
    &.fade-enter {
        opacity: 0;
        transition: opacity 900ms;
    }

    // enter to
    &.fade-enter-active {
        opacity: 1;
        transition: opacity 900ms;
    }

    // exit from
    &.fade-exit {
        opacity: 1;
        transition: opacity 900ms;
    }

    // exit to
    &.fade-exit-active {
        opacity: 0;
        transition: opacity 900ms;
    }
`
const StyledInput = styled(Field)`
    margin-top: 10px;
    height: 38px;
    width: 220px;
    background-color: #bdbdbd;
    border-radius: 50px;
    border: none;
    background-image: url(${usernameIcon});
    background-size: 15px;
    background-position: 15px 50%;
    background-repeat: no-repeat;
    padding: 10px 20px 10px 40px;

    ${({ name }) =>
        name !== 'username' &&
        (name === 'email'
            ? css`
                  background-image: url(${emailIcon});
              `
            : css`
                  background-image: url(${passwordIcon});
              `)}
`

interface InputProps {
    validationError?: string
    value?: string
    id?: string
    type: string
    placeholder: string
    name: string
}

const Input: React.FC<InputProps> = ({ type, placeholder, name, validationError, value }) => {
    const [active, setActive] = useState(true)

    useEffect(() => {
        setActive(!active)
    }, [validationError])

    return (
        <>
            <StyledInput type={type} placeholder={placeholder} name={name} value={value} />
            {validationError && (
                <CSSTransition in={active} classNames="fade" timeout={900} unmountOnExit>
                    <StyledLabel htmlFor={name}>{validationError}</StyledLabel>
                </CSSTransition>
            )}
        </>
    )
}

export default Input
