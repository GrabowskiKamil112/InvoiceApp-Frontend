import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import PageContext from '../../context/pageContext'
import { calculateTotalOfInvoice, themeNavigator } from '../../utils/utils'
import Header from '../Atoms/Header'
import Status from '../Atoms/Status'
import arrowRight from '../../../public/assets/icon-arrow-right.svg'
import { Invoice } from '../../Types/Invoice'
import moment from 'moment'

const StyledNavLink = styled(NavLink)<{ themeCtx: string; transitionDelay: number }>`
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    grid-template-columns: 80px 144px minmax(auto, 35%) 1fr repeat(2, auto);
    transition: opacity 400ms ease-out ${({ transitionDelay }) => `${transitionDelay}ms`},
        outline 0.3s ease;
    outline: 1px solid rgba(124, 93, 250, 0);
    align-items: center;
    border-radius: 8px;
    padding: 16px 24px;
    font-size: 1.2rem;
    color: #ffffff;
    cursor: pointer;
    width: 100%;
    height: 74px;
    display: grid;
    gap: 10px;

    &.item-enter {
        opacity: 0;
    }
    &.item-enter-active {
        opacity: 1;
    }
    &.item-exit {
        opacity: 1;
    }
    &.item-exit-active {
        opacity: 0;
    }

    & > div {
        color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceStatus.text`)};
        &:nth-child(2),
        &:nth-child(3) {
            color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.text.bodyA`)};
        }
    }
    &:hover {
        outline: 1px solid #7c5dfa;
    }
    & h2 {
        margin-right: 20px;
    }
    & h3 {
        text-transform: uppercase;
        &::first-letter {
            color: #7e88c3;
        }
    }
`
interface Props {
    content: Invoice & { _id: string }
    transitionDelay: number
}
const InvoiceShort: React.FC<Props> = ({ content, transitionDelay }) => {
    const { activeTheme } = useContext(PageContext)
    const { type, _id: id, payment_term, to, items_list } = content

    return (
        <StyledNavLink
            themeCtx={activeTheme}
            transitionDelay={transitionDelay}
            to={`/invoice/${id}`}>
            <Header size="small">
                <span>#</span>
                {id.substring(id.length - 6)}
            </Header>
            <div>Due {moment(payment_term).format('DD MMM YYYY')}</div>
            <div>{to?.name}</div>
            <Header size="medium">
                &#163;
                {items_list ? `${calculateTotalOfInvoice(items_list)}` : ''}
            </Header>
            <Status type={type}>{type}</Status>
            <img src={arrowRight} alt="arrowRight" />
        </StyledNavLink>
    )
}

export default InvoiceShort
