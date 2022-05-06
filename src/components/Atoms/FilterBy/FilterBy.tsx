import React, { useContext, useState } from 'react'
import arrowDown from '../../../../public/assets/icon-arrow-down.svg'
import PageContext from '../../../context/pageContext'
import { useAppSelector } from '../../../store/hooks/hooks'
import { Dropdown, StyledButton, StyledImg, StyledInput, StyledWrapper } from './FilterBy-styling'


type FilterByProps = {
    handleRadioInput: (e: React.MouseEvent<HTMLInputElement>) => void
    shorter: boolean
}

const FilterBy = ({ handleRadioInput, shorter }: FilterByProps) => {
    const [isFilterOpen, toggleFilterOpen] = useState<boolean>(false)
    const activeFilter = useAppSelector((state) => state.filterBy)
    const { activeTheme } = useContext(PageContext)

    return (
        <StyledWrapper onClick={() => toggleFilterOpen(!isFilterOpen)}>
            <StyledButton>
                Filter {shorter && 'by status'}
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
                            checked={activeFilter === 'paid'}
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
                            checked={activeFilter === 'pending'}
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
                            checked={activeFilter === 'draft'}
                        />
                        Draft
                    </label>
                </Dropdown>
            )}
        </StyledWrapper>
    )
}

export default FilterBy
