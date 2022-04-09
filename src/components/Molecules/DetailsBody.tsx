import { memo, useContext } from 'react'
import { Invoice } from '../../Types/Invoice'
import styled from 'styled-components'
import { themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'
import Header from '../Atoms/Header'
import ItemsList from './ItemsList'
import Paragraph from '../Atoms/Paragraph'

const StyledWrapper = styled.section<{ themeCtx: string }>`
    width: 100%;
    margin: auto;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    padding: 24px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;
    grid-template-areas:
        'title title from'
        'dates to email'
        'items items items';
`
const Title = styled.div`
    grid-area: title;

    & p {
        margin-top: 6px;
    }
    & h2 span {
        color: rgb(126, 136, 195);
    }
`
const Address1 = styled.address`
    display: flex;
    flex-direction: column;
    grid-area: from;
    justify-items: end;
    & p {
        text-align: right;
        display: block;
        margin-bottom: 4px;
        float: right;
    }
`
const Address2 = styled.address`
    display: flex;
    flex-direction: column;
    grid-area: to;
    justify-items: end;
    & h2 {
        margin: 8px 0 6px 0;
    }

    & p {
        margin-bottom: 4px;
        display: block;
        float: right;
    }
`
const Dates = styled.div`
    padding-bottom: 20px;
    grid-area: dates;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & p {
        margin-bottom: 6px;
    }
`
const Email = styled.div`
    grid-area: email;
    & p {
        margin-bottom: 8px;
    }
`

const DetailsBody: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
    console.log(invoice)
    const { from = {}, to = {}, items_list, created, payment_due, description, _id: id } = invoice
    const { activeTheme } = useContext(PageContext)

    const P = (text?: string, small = false, key?: string) => (
        <Paragraph smal={small} themeCtx={activeTheme} key={key}>
            {text}
        </Paragraph>
    )

    return (
        <>
            <StyledWrapper themeCtx={activeTheme}>
                <Title>
                    <Header size="medium">
                        <span>#</span>
                        {id.substring(0, 6)}
                    </Header>
                    {P(description)}
                </Title>
                <Address1>
                    {(Object.keys(from) as Array<keyof typeof from>).map((keyName) => {
                        return P(from[keyName], true, keyName)
                    })}
                </Address1>
                <Dates>
                    <div>
                        {P('Invoice Date')}
                        <Header size="medium">{created}</Header>
                    </div>
                    <div>
                        {P('Payment Due')}
                        <Header size="medium">{payment_due}</Header>
                    </div>
                </Dates>
                <Address2>
                    {P('Bill to', true)}
                    <Header size="medium">{to?.name}</Header>

                    {(Object.keys(to) as Array<keyof typeof to>).map((keyName) => {
                        return P(to[keyName], true, keyName)
                    })}
                </Address2>
                <Email>
                    {P('Sent to')}
                    <Header size="medium">{to?.email}</Header>
                </Email>
                {ItemsList && <ItemsList items={items_list} />}
            </StyledWrapper>
        </>
    )
}
// DetailsBody.propTypes = {
//     content: PropTypes.shape({
//         _id: PropTypes.number,
//         title: PropTypes.string,
//         content: PropTypes.string,
//         created: PropTypes.string,
//     }),
// }

// DetailsBody.defaultProps = {
//     notes: [],
// }

export default memo(DetailsBody)
