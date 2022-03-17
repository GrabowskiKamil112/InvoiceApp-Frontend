import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'
import Header from '../Atoms/Header'
import FilterBy from '../Atoms/FilterBy'
import { useAppDispatch } from '../../store/hooks/hooks'
import { changeFilter } from '../../store/actions'
import { generateInfo } from '../../utils/utils'

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

    const dispatch = useAppDispatch()

    const handleRadioInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement
        if (invoiceFilter === value) {
            ;(e.target as HTMLInputElement).checked = false
            setInvoiceFilter('total')
            return
        }

        setInvoiceFilter(value)
    }

    useEffect(() => {
        dispatch(changeFilter(invoiceFilter))
    }, [dispatch, invoiceFilter])

    return (
        <StyledWrapper>
            <div>
                <Header size="big">Invoices</Header>
                <Paragraph>{generateInfo(invoiceFilter, 1)}</Paragraph>
            </div>
            <StyledDiv>
                <FilterBy handleRadioInput={handleRadioInput} />
                <StyledButton width="140px">btn</StyledButton>
            </StyledDiv>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
