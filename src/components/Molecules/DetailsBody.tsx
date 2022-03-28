import React, { useContext } from 'react'
import { Invoice } from '../../Types/Invoice'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { themeNavigator } from '../../utils/utils'
import PageContext from '../../context/pageContext'
import Header from '../Atoms/Header'
import Paragraph from '../Atoms/Paragraph'
import ItemsList from './ItemsList'

const StyledWrapper = styled.section<{ themeCtx: string }>`
    width: 100%;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    min-height: 440px;
    padding: 24px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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

const DetailsBody = ({ content }: { content: Invoice }) => {
    console.log(content)

    const { from, to, items_list, created, payment_due, description, _id: id } = content

    const { activeTheme } = useContext(PageContext)
    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Title>
                <Header size="medium">
                    <span>#</span>
                    {id.substring(0, 6)}
                </Header>
                <Paragraph themeCtx={activeTheme}>{description}</Paragraph>
            </Title>
            <Address1>
                <Paragraph small themeCtx={activeTheme}>
                    {from?.street_address}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {from?.city}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {from?.post_code}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {from?.country}
                </Paragraph>
            </Address1>
            <Dates>
                <div>
                    <Paragraph themeCtx={activeTheme}>Invoice Date</Paragraph>
                    <Header size="medium">{created}</Header>
                </div>
                <div>
                    <Paragraph themeCtx={activeTheme}>Invoice Date</Paragraph>
                    <Header size="medium">{payment_due}</Header>
                </div>
            </Dates>
            <Address2>
                <Paragraph small themeCtx={activeTheme}>
                    Bill to
                </Paragraph>
                <Header size="medium">{to?.name}</Header>
                <Paragraph small themeCtx={activeTheme}>
                    {to?.street_address}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {to?.city}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {to?.post_code}
                </Paragraph>
                <Paragraph small themeCtx={activeTheme}>
                    {to?.country}
                </Paragraph>
            </Address2>
            <Email>
                <Paragraph themeCtx={activeTheme}>Sent to</Paragraph>
                <Header size="medium">{to?.email}</Header>
            </Email>
            {ItemsList && <ItemsList items={items_list} />}
        </StyledWrapper>
    )
}
DetailsBody.propTypes = {
    content: PropTypes.shape({
        _id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        created: PropTypes.string,
    }),
}

DetailsBody.defaultProps = {
    notes: [],
}

export default DetailsBody
