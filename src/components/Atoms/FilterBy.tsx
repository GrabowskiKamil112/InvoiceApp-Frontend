import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import arrowDown from '../../../public/assets/icon-arrow-down.svg'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'

const StyledWrapper = styled.div`
    height: 47px;
    margin-right: 40px;
    width: 130px;
    cursor: pointer;
    position: relative;
`
const StyledButton = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-family: inherit;
    font-weight: 700;
    font-size: 1.3rem;
    background: none;
    border: none;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
`
const StyledImg = styled.img<{ isFilterOpen: boolean }>`
    margin-left: 10px;
    transition: transform 0.25s ease-in-out;
    ${({ isFilterOpen }) =>
        isFilterOpen &&
        css`
            transform: rotate(180deg);
        `};
`
const Dropdown = styled.div<{ themeCtx: string }>`
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.dropdown.bg`)};
    box-shadow: rgb(0 0 0 / 25%) 0px 10px 20px;
    cursor: auto;
    position: absolute;
    top: 65px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px;
    border-radius: 8px;
    width: 192px;
    transform: translateX(-50%);
    left: 50%;
    height: 125px;
    justify-content: center;
    & > label {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
    }
`
const StyledInput = styled.input`
    cursor: pointer;
    margin-right: 12px;
    width: 16px;
    height: 16px;
    border: none;
    &[type='radio'] {
        background-color: rgb(30, 33, 57);
        border-radius: 2px;
        overflow: hidden;
        cursor: pointer;
        display: inline-block;
        height: 15px;
        margin-right: 15px;
        position: relative;
        width: 15px;
        -webkit-appearance: none;
        &:hover {
            outline: 1px solid rgb(124, 93, 250);
        }
    }
    &[type='radio']:after {
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;
        color: white;
        width: 100%;
    }
    &[type='radio']:checked:after {
        color: white;
        background-color: rgb(124, 93, 250);
        background-image: url('../../../public/assets/icon-check.svg');
        background-size: 40px 40px;
        height: 40px;
        width: 40px;
    }
`

const FilterBy = () => {
    const [isFilterOpen, toggleFilterOpen] = useState<boolean>(false)
    const [invoiceFilter, setInvoiceFilter] = useState<string>('')
    const { activeTheme } = useContext(PageContext)

    const handleRadioInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement
        if (invoiceFilter === value) {
            ;(e.target as HTMLInputElement).checked = false
            setInvoiceFilter('')
            return
        }

        setInvoiceFilter(value)
    }

    return (
        <StyledWrapper onClick={() => toggleFilterOpen(!isFilterOpen)}>
            <StyledButton>
                Filter by status
                <StyledImg src={arrowDown} alt="arrowdown" isFilterOpen={isFilterOpen}></StyledImg>
            </StyledButton>
            {isFilterOpen && (
                <Dropdown themeCtx={activeTheme} onClick={(e) => e.stopPropagation()}>
                    <label htmlFor="paid">
                        <StyledInput
                            type="radio"
                            value="paid"
                            id="paid"
                            name="invoiceFilter"
                            onClick={(e) => handleRadioInput(e)}
                        />
                        Paid
                    </label>
                    <label htmlFor="pending">
                        <StyledInput
                            type="radio"
                            value="pending"
                            id="pending"
                            name="invoiceFilter"
                            onClick={(e) => handleRadioInput(e)}
                        />
                        Pending
                    </label>
                    <label htmlFor="draft">
                        <StyledInput
                            type="radio"
                            value="draft"
                            id="draft"
                            name="invoiceFilter"
                            onClick={(e) => handleRadioInput(e)}
                        />
                        Draft
                    </label>
                </Dropdown>
            )}
        </StyledWrapper>
    )
}

export default FilterBy
