import { Field, getIn, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

interface inputProps {
    themectx: string
    validationerror?: string
}
interface labelProps extends inputProps {
    wideSpan: boolean
}
const StyledInput = styled(Field)<inputProps>`
    transition: border-color 0.3s ease;
    margin-top: 10px;
    padding: 16px 20px;
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.form.fieldBg`)};
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    color: ${({ themectx }) => themeNavigator(`${themectx}.text.bodyB`)};
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
export const StyledLabel = styled.label<labelProps>`
    color: ${({ themectx }) => themeNavigator(`${themectx}.text.formLabel`)};
    transition: color 0.3s ease;
    font-size: 1.2rem;
    font-weight: 400;
    height: auto;

    ${({ validationerror }) =>
        validationerror &&
        css`
            color: #ec5757;
        `};
    ${({ wideSpan }) =>
        wideSpan &&
        css`
            grid-column: 1 / span 3;
        `};

    &:focus-within {
        color: ${({ themectx }) => themeNavigator(`${themectx}.text.formLabel`)};
        & input {
            border-color: #9277ff;
        }
    }
`

interface InputProps {
    validationerror?: string
    value?: string
    type: string
    label?: string
    name: string
    wideSpan?: boolean
    placeholder?: string
    isSelect?: boolean
}
const FormInput: React.FC<InputProps> = ({
    type,
    label,
    name,
    value,
    wideSpan = false,
    placeholder,
}) => {
    const { activeTheme } = useContext(PageContext)
    const { errors } = useFormikContext()
    const thisInputError = errors[name]

    console.log('thisinputeerrror',thisInputError,name);
    

    return (
        <>
            <StyledLabel
                wideSpan={wideSpan}
                themectx={activeTheme}
                validationerror={thisInputError}
                htmlFor={name}>
                {label}

                <StyledInput
                    placeholder={placeholder || ' '}
                    validationerror={thisInputError}
                    themectx={activeTheme}
                    type={type}
                    name={name}
                    value={value}
                    autoComplete="off"
                />
            </StyledLabel>
        </>
    )
}

export default FormInput
