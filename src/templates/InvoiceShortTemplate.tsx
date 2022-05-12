import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import PageContext from '../context/pageContext'
import { themeNavigator } from '../utils/utils'

const StyledNavLink = styled(NavLink)<{ themectx: string; transitionDelay: number }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.invoiceItem.bg`)};
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
    @media (max-width: 750px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50% 1fr 1fr;
        gap: 0;
        height: 111px;
        margin-bottom: 10px;
    }

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
        color: ${({ themectx }) => themeNavigator(`${themectx}.invoiceStatus.text`)};

        &:nth-child(2),
        &:nth-child(3) {
            color: ${({ themectx }) => themeNavigator(`${themectx}.text.bodyA`)};
        }

        @media (max-width: 750px) {
            &:nth-of-type(1) {
                grid-column: 1;
                align-self: start;
            }
            &:nth-of-type(2) {
                grid-area: 1/2;
                justify-self: end;
                align-self: start;
            }
        }
    }
    &:hover {
        outline: 1px solid #7c5dfa;
    }
    & h2 {
        margin-right: 20px;
    }
    & > header {
        @media (max-width: 750px) {
            align-self: start;
        }

        & h3 {
            text-transform: uppercase;
            &::first-letter {
                color: #7e88c3;
            }
        }
    }
`
type props = {
    id: string
    transitionDelay: number
}
export const InvoiceShortTemplate: React.FC<props> = ({ children, id, transitionDelay }) => {
    const { activeTheme } = useContext(PageContext)
    return (
        <StyledNavLink
            transitionDelay={transitionDelay}
            themectx={activeTheme}
            to={`/invoice/${id}`}>
            {children}
        </StyledNavLink>
    )
}
