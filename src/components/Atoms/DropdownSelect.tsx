import { useContext } from 'react'
import Select from 'react-select'
import PageContext from '../../context/pageContext'
import { StyledLabel } from './FormInput'
import styled from 'styled-components'
import { themeNavigator } from '../../utils/utils'

const StyledSelect = styled(Select)<{ themeCtx: string }>`
    margin-top: 10px;
    height: 47px;
    width: 110%;
    &:hover,
    &:focus {
        border: none;
        outline: none;
    }
    & > option {
        background-color: red;
    }
    & > div {
        background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.form.fieldBg`)};
        border: none;
        height: 47px;
        border: 1px solid rgb(37, 41, 69);
        & > div > div {
            color: white;
            font-weight: 700;
        }
    }
    & > div:nth-of-type(2) {
        background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.form.fieldBg`)};
        height: auto;
        & > div > div:hover {
            //  background-color: #0044ff;
            &::selection {
                background-color: red;
            }
        }
    }
`
type Option = Record<'value' | 'label', string>

const DropdownSelect = ({
    onChangeFn,
    options,
    value,
    label,
    name,
}: {
    onChangeFn: (arg: string) => any
    options: Option[]
    value: string
    label: string
    name: string
}) => {
    const { activeTheme } = useContext(PageContext)
    const defaultValue = (options: Option[], value: String) => {
        return options ? options.find((option: Option) => option.value === value) : ''
    }
    const customTheme = (theme: { colors: any }) => {
        return {
            ...theme,
            ...theme.colors,
            primary25: 'orange',
            primary: 'green',
            neutral90: 'pink',
        }
    }

    return (
        <StyledLabel wideSpan={false} themectx={activeTheme} htmlFor={name}>
            {label}
            <StyledSelect
                theme={customTheme}
                themeCtx={activeTheme}
                value={defaultValue(options, value)}
                onChange={(option: Option) => onChangeFn(option.value)}
                options={options}
            />
        </StyledLabel>
    )
}

export default DropdownSelect
