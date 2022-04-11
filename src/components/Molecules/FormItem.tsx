import React, { useContext } from 'react'
import styled from 'styled-components'
import FormInput from '../Atoms/FormInput'
import binIcon from '../../../public/assets/icon-delete.svg'
import SVG from 'react-inlinesvg'
import { themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100%;
    grid-template-columns: 2.5fr 66px 1.25fr 0.75fr min-content;
    display: grid;
    margin-bottom: 16px;
    gap: 16px;
    position: relative;
    & > div {
        display: flex;
        align-items: center;
        color: rgb(136, 142, 176);
        font-weight: 700;
        font-size: 1.3rem;
    }
    & > label {
        color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.formLabel`)};
        font-size: 1.2rem;
        font-weight: 400;
        & > input {
            margin: 0;
        }
    }

    & > button {
        background: none;
        border: none;
        position: relative;
    }
`
const DeleteIcon = styled(SVG)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    fill: rgb(136, 142, 176);
    transition: all 0.5 ease;
    &:hover {
        cursor: pointer;
        fill: #cc5353;
    }
`
const FormItem: React.FC = () => {
    const { activeTheme } = useContext(PageContext)

    return (
        <StyledWrapper themeCtx={activeTheme}>
            <FormInput type="text" name="name" />
            <FormInput type="text" name="quantity" />
            <FormInput type="text" name="price" />

            <div>0</div>

            <button type="button">
                <DeleteIcon src={binIcon}></DeleteIcon>
            </button>
        </StyledWrapper>
    )
}

export default FormItem
