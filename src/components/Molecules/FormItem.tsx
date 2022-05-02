import React, { useContext } from 'react'
import styled from 'styled-components'
import FormInput from '../Atoms/FormInput'
import binIcon from '../../../public/assets/icon-delete.svg'
import SVG from 'react-inlinesvg'
import { getTotalPriceOfItemInForm, themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'
import { useFormikContext } from 'formik'

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
        color: #888eb0;
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

    & > span {
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

type props = { index: number; removeItemFn: () => void }

const FormItem: React.FC<props> = ({ index, removeItemFn }) => {
    const { activeTheme } = useContext(PageContext)
    const {
        values: { items_list },
    } = useFormikContext()

    return (
        <StyledWrapper themeCtx={activeTheme}>
            <FormInput
                type="text"
                name={`items_list[${index}].name`}
                value={items_list[index]?.name}
            />
            <FormInput
                type="text"
                name={`items_list[${index}].price`}
                value={items_list[index]?.price}
            />
            <FormInput
                type="text"
                name={`items_list[${index}].quantity`}
                value={items_list[index]?.quantity}
            />

            <div>{getTotalPriceOfItemInForm(items_list[index])}</div>

            <span>
                <DeleteIcon src={binIcon} onClick={() => removeItemFn()}></DeleteIcon>
            </span>
        </StyledWrapper>
    )
}

export default FormItem
