import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'
import Header from '../Atoms/Header'
import FilterBy from '../Atoms/FilterBy'

const StyledWrapper = styled.div`
    margin-bottom: 64px;
    height: 58px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    & > div > header {
        margin-bottom: 5px;
    }
`
const StyledButton = styled(Button)`
    //display: inline-block;
`
const StyledDiv = styled.div`
    display: flex;
`

const InvoiceControllerBar = () => {
    const [invoiceFilter, setInvoiceFilter] = useState<string>('total')

    const handleRadioInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement
        if (invoiceFilter === value) {
            ;(e.target as HTMLInputElement).checked = false
            setInvoiceFilter('total')
            return
        }

        setInvoiceFilter(value)
    }

    return (
        <StyledWrapper>
            <div>
                <Header size="big">Invoices</Header>
                <Paragraph>{`There are 2 ${invoiceFilter} invoices.`}</Paragraph>
            </div>
            <StyledDiv>
                <FilterBy handleRadioInput={handleRadioInput} />
                <StyledButton width="140px">btn</StyledButton>
            </StyledDiv>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
