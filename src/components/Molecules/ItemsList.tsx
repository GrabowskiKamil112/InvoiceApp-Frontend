import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ItemsListEntity } from '../../Types/Invoice'
import styled from 'styled-components'
import { calculateTotalPrice, themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    height: auto;
    width: 100%;
    padding-top: 32px;
    border-radius: 8px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceTable.bg`)};
    min-height: 160px;
    grid-area: items;
`
const Tr = styled.tr``
const Table = styled.table``
const ItemsList = ({ items }: { items: ItemsListEntity[] }) => {
    console.log('items', items)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const { activeTheme } = useContext(PageContext)
    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Table>
                <Tr>
                    <th>Item Name</th>
                    <th>QTY.</th>
                    <th>PRice</th>
                    <th>Total</th>
                </Tr>

                {items.map(({ name, quantity, price }, index) => {
                    const itemTotal = calculateTotalPrice(quantity, price)

                    return (
                        <Tr key={index}>
                            <td>{name}</td>
                            <td>{quantity}</td>
                            <td>{price}</td>
                            <td>{itemTotal}</td>
                        </Tr>
                    )
                })}
                <tfoot>
                    <tr>
                        <td>Amount Due</td>
                        <td>{totalAmount}</td>
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
