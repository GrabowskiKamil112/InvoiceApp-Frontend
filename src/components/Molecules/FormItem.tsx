import React, { useContext } from 'react'
import styled from 'styled-components'
import FormInput from '../Atoms/FormInput'
import binIcon from '../../../public/assets/icon-delete.svg'
import SVG from 'react-inlinesvg'
import { getTotalPriceOfItemInForm } from '../../utils/utils'
import PageContext from '../../context/pageContext'
import { FormikValues, useFormikContext } from 'formik'

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
        overflow-x: hidden;
    }
    & > label {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 200%;

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
    transform: translateY(-50%);
    fill: rgb(136, 142, 176);
    transition: all 0.5 ease;
    position: absolute;
    top: 50%;
    &:hover {
        cursor: pointer;
        fill: #cc5353;
    }
`

type props = { index: number; removeItemFn: (index: number) => void }

const FormItem: React.FC<props> = ({ index, removeItemFn }) => {
    const { activeTheme } = useContext(PageContext)
    const {
        values: { items_list },
    } = useFormikContext() as FormikValues

    return (
        <StyledWrapper themeCtx={activeTheme}>
            <FormInput
                label={index == 0 ? 'Item Name' : undefined}
                type="text"
                name={`items_list[${index}].name`}
                value={items_list[index]?.name}
            />
            <FormInput
                label={index == 0 ? 'Qty.' : undefined}
                type="text"
                name={`items_list[${index}].price`}
                value={items_list[index]?.price}
            />
            <FormInput
                label={index == 0 ? 'Price' : undefined}
                type="text"
                name={`items_list[${index}].quantity`}
                value={items_list[index]?.quantity}
            />

            <div>{getTotalPriceOfItemInForm(items_list[index])}</div>

            <span>
                <DeleteIcon src={binIcon} onClick={() => removeItemFn(index)}></DeleteIcon>
            </span>
        </StyledWrapper>
    )
}

export default FormItem
