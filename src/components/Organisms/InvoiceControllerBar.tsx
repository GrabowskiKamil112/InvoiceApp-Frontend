import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'
import Header from '../Atoms/Header'
import FilterBy from '../Atoms/FilterBy'
import { useAppDispatch } from '../../store/hooks/hooks'
import { changeFilter } from '../../store/actions'
import { generateInfo } from '../../utils/utils'
import plusIcon from '../../../public/assets/icon-plus.svg'
import PageContext from '../../context/pageContext'

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
    text-shadow: 0px 0px 1px #ffffff;
    text-transform: none;
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 2px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgb(146, 119, 255);
    }
`
const Img = styled.img`
    background-color: white;
    padding: 10px;
    border-radius: 50%;
`
const Span = styled.span`
    height: 31px;
    margin-right: 10px;
`
const StyledDiv = styled.div`
    display: flex;
`

const InvoiceControllerBar = () => {
    const [invoiceFilter, setInvoiceFilter] = useState<string>('total')
    const [numOfInvoices, setNumOfInvoices] = useState<number>()
    const { activeTheme } = useContext(PageContext)
    const ref1 = useRef<HTMLDivElement>(null)

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        setNumOfInvoices(ref1.current?.nextElementSibling?.getElementsByTagName('a').length)
    })

    return (
        <StyledWrapper ref={ref1}>
            <div>
                <Header size="big">Invoices</Header>
                <Paragraph themeCtx={activeTheme}>
                    {generateInfo(invoiceFilter, numOfInvoices)}
                </Paragraph>
            </div>
            <StyledDiv>
                <FilterBy handleRadioInput={handleRadioInput} />
                <StyledButton color="hsl(251, 94%, 67%)" width="140px">
                    <Span>
                        <Img src={plusIcon} alt="plus" />
                    </Span>
                    <Header size="small">New Invoice</Header>
                </StyledButton>
            </StyledDiv>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
