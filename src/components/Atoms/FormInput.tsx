import { Field } from 'formik'
import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

interface inputProps {
    themeCtx: string
    validationError?: string
}
interface labelProps extends inputProps {
    wideSpan: boolean
}
const StyledInput = styled(Field)<inputProps>`
    margin-top: 10px;
    padding: 16px 20px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.form.fieldBg`)};
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    font-weight: 700;
    height: 47px;
    width: 100%;
    border: 1px solid rgb(37, 41, 69);
    ${({ validationError }) =>
        validationError &&
        css`
            border-color: #ec5757;
        `};
`
const StyledLabel = styled.label<labelProps>`
    height: auto;
    font-size: 1.2rem;
    font-weight: 400;
    color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.formLabel`)};

    ${({ validationError }) =>
        validationError &&
        css`
            color: #ec5757;
        `};
    ${({ wideSpan }) =>
        wideSpan &&
        css`
            grid-column: 1 / span 3;
        `};

    &:focus-within {
        color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.formLabel`)};
        & input {
            border-color: #9277ff;
        }
    }
`

interface InputProps {
    validationError?: string
    value?: string
    type: string
    label: string
    name: string
    wideSpan?: boolean
}
const FormInput: React.FC<InputProps> = ({
    type,
    label,
    name,
    validationError,
    value,
    wideSpan = false,
}) => {
    const { activeTheme } = useContext(PageContext)
    return (
        <>
            <StyledLabel
                wideSpan={wideSpan}
                themeCtx={activeTheme}
                validationError={validationError}
                htmlFor={name}>
                {label}
                <StyledInput
                    validationError={validationError}
                    themeCtx={activeTheme}
                    type={type}
                    name={name}
                    value={value}
                    autocomplete="off"
                />
            </StyledLabel>
        </>
    )
}

export default FormInput
