import { memo, useContext } from 'react'
import { Invoice } from '../../../Types/Invoice'
import PageContext from '../../../context/pageContext'
import Header from '../../Atoms/Header'
import ItemsList from '../ItemsList'
import Paragraph from '../../Atoms/Paragraph'
import { Address1, Address2, Dates, Email, StyledWrapper, Title } from './DetailsBody-styling'



const DetailsBody: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
    const {
        from = {},
        to = {},
        items_list,
        payment_term,
        invoice_date,
        description,
        _id: id,
    } = invoice
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
                        {id.substring(id.length - 6).toUpperCase()}
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
                        <Header size="medium">{invoice_date}</Header>
                    </div>
                    <div>
                        {P('Payment Due')}
                        <Header size="medium">{payment_term}</Header>
                    </div>
                </Dates>
                <Address2>
                    {P('Bill to', true)}
                    <Header size="medium">{to?.name}</Header>

                    {(Object.keys(to) as Array<keyof typeof to>).map((keyName) => {
                        return keyName == 'name' ? '' : P(to[keyName], true, keyName)
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
