import React, { useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'
import Header from '../Atoms/Header'
import Status from '../Atoms/Status'
import arrowRight from '../../../public/assets/icon-arrow-right.svg'
import { Invoice } from '../../Types/Invoice'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100%;
    height: 74px;
    border-radius: 8px;
    cursor: pointer;
    gap: 10px;
    display: grid;
    align-items: center;
    grid-template-columns: 80px 144px 35% repeat(3, auto);
    transition: all 250ms ease-out;
    outline: 1px solid rgba(124, 93, 250, 0);
    padding: 16px 24px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    font-size: 1.2rem;
    color: white;
    & > div:nth-child(2) {
        color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceStatus.text`)};
    }
    &:hover {
        outline: 1px solid #7c5dfa;
    }
    & h3 {
        text-transform: uppercase;
        &::first-letter {
            color: #7e88c3;
        }
    }
`
interface Props {
    content: Invoice
}
const InvoiceShort: React.FC<Props> = ({ content }) => {
    const { activeTheme } = useContext(PageContext)
    const { type, id, payment_term, to } = content
    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Header size="small">
                <span>#</span>
                {id.substring(0, 6)}
            </Header>
            <div>Due {payment_term}</div>
            <div>{to?.name}</div>
            <Header size="medium">&#163;345</Header>
            <Status type={type}>{type}</Status>
            <img src={arrowRight} alt="arrowRight" />
        </StyledWrapper>
    )
}

export default InvoiceShort
