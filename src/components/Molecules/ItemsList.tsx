import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ItemsListEntity } from '../../Types/Invoice'
import styled from 'styled-components'
import { calculateTotalPrice, themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'
import Paragraph from '../Atoms/Paragraph'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100%;
    margin: auto;
    padding-top: 32px;
    border-radius: 8px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceTable.bg`)};
    margin-bottom: 50px;
    margin-top: 60px;
    grid-area: items;
`
const Table = styled.table<{ themeCtx: string }>`
    border-collapse: separate !important;
    width: 100%;
    height: auto;

    & > * > tr > *:nth-child(1) {
        text-align: start;
        padding: 0 0 32px 32px;
    }
    & > * > tr > *:nth-child(3) {
        padding-right: 32px;
        text-align: center;
    }
    & > * > tr > *:nth-child(2) {
        text-align: center;
    }

    & > * > tr > *:nth-child(4) {
        text-align: end;
        padding: 0 32px 32px 0;
    }
    & > tfoot > tr > td:nth-child(1) {
        padding: 32px 0 32px 32px;
        height: 80px;
        border-radius: 0 0 0 8px;
    }
    & > tfoot > tr > td {
        padding: 32px 0 32px 32px;
        background-color: black;
    }
    & > tfoot > tr > td:nth-child(4) {
        padding: 32px 32px 32px 0;
        border-radius: 0 0 8px 0;
    }
    @media (max-width: 540px) {
        & > * > tr > *:nth-child(2),
        & > * > tr > *:nth-child(3) {
            display: none;
        }
    }
`

const P = styled(Paragraph)`
    font-weight: 500;
`

const ItemsList = ({ items }: { items: ItemsListEntity[] }) => {
    console.log('items', items)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const { activeTheme } = useContext(PageContext)
    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Table themeCtx={activeTheme}>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>QTY.</th>
                        <th>PRice</th>
                        <th>Total</th>
                    </tr>
                </thead>

                {items.map(({ name, quantity, price }, index) => {
                    const itemTotal = calculateTotalPrice(quantity, price)

                    return (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <P themeCtx={activeTheme}>{name}</P>
                                </td>
                                <td>
                                    <P themeCtx={activeTheme}>{quantity}</P>
                                </td>
                                <td>
                                    <P themeCtx={activeTheme}>{price}</P>
                                </td>
                                <td>
                                    <P themeCtx={activeTheme}>${itemTotal}</P>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
                <tfoot>
                    <tr>
                        <td>Amount Due</td>
                        <td />
                        <td />
                        <td>${totalAmount}</td>
                    </tr>
                </tfoot>
            </Table>
        </StyledWrapper>
    )
}

ItemsList.propTypes = {
    items: PropTypes.shape({
        _id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        created: PropTypes.string,
    }),
}

export default ItemsList