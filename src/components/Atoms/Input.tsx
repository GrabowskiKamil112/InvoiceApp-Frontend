import styled, { css } from 'styled-components'
import React, { useEffect, useState } from 'react'
import usernameIcon from '../../../public/assets/user.png'
import emailIcon from '../../../public/assets/arroba.png'
import passwordIcon from '../../../public/assets/lock.png'
import { Field } from 'formik'
import { CSSTransition } from 'react-transition-group'

const StyledLabel = styled.label`
    color: #c90000;
    font-size: 1.1rem;
    margin-top: 4px;
    &.fade-enter {
        opacity: 0;
        transition: opacity 900ms;
    }
    &.fade-enter-active {
        opacity: 1;
    }
    &.fade-exit {
        opacity: 1;
        transition: opacity 900ms;
    }
    &.fade-exit-active {
        opacity: 0;
    }
`
const StyledInput = styled(Field)`
    font-size: ${({ theme }) => theme.sizes.l};
    font-weight: 700;
    margin-top: 18px;
    height: 38px;
    width: 260px;
    color: #dfe3fa;
    background-color: #17192e;
    border: none;
    background-image: url(${usernameIcon});
    background-size: 15px;
    background-position: 15px 50%;
    background-repeat: no-repeat;
    padding: 10px 20px 10px 40px;
    position: relative;
    &:hover + div {
        transform: scaleX(1);
    }

    &::placeholder {
        font-weight: 500;
    }

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

const FancyBar = styled.div`
    margin: 0;
    width: 260px;
    height: 1px;
    background-color: #d86074;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease-in-out;
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
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (active) {
            return
        }

        setActive(!active)
    }, [validationError])

    return (
        <>
            <StyledInput
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                autocomplete="off"
            />
            <FancyBar />
            {validationError && (
                <CSSTransition in={active} classNames="fade" timeout={900} unmountOnExit>
                    <StyledLabel htmlFor={name}>{validationError}</StyledLabel>
                </CSSTransition>
            )}
        </>
    )
}

export default Input
