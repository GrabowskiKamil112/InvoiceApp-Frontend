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
    gap: 10px;
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
`

const FilterBy = () => {
    const [isFilterOpen, toggleFilterOpen] = useState<boolean>(false)
    const [invoiceFilter, setInvoiceFilter] = useState<string>('')
    const { activeTheme } = useContext(PageContext)

    const onChangeFunc = ({ target }: { target: HTMLInputElement }) => {
        const { value } = target
        if (invoiceFilter === value) {
            target.checked = false
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
                            onClick={(e) => onChangeFunc(e)}
                        />
                        Paid
                    </label>
                    <label htmlFor="pending">
                        <StyledInput
                            type="radio"
                            value="pending"
                            id="pending"
                            name="invoiceFilter"
                            onClick={(e) => onChangeFunc(e)}
                        />
                        Pending
                    </label>
                    <label htmlFor="draft">
                        <StyledInput
                            type="radio"
                            value="draft"
                            id="draft"
                            name="invoiceFilter"
                            onClick={(e) => onChangeFunc(e)}
                        />
                        Draft
                    </label>
                </Dropdown>
            )}
        </StyledWrapper>
    )
}

export default FilterBy
