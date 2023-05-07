import React, { useEffect, useState } from 'react'
import { addCommas, calculateTotalOfInvoice, getWindowWidth } from '../../utils/utils'
import Header from '../Atoms/Header'
import Status from '../Atoms/Status'
import arrowRight from '../../../public/assets/icon-arrow-right.svg'
import { Invoice } from '../../Types/Invoice'
import moment from 'moment'
import { InvoiceShortTemplate } from '../../templates/InvoiceShortTemplate'

interface Props {
    content: Invoice
    transitionDelay: number
}
const InvoiceShort: React.FC<Props> = ({ content, transitionDelay }) => {

    const { type, invoiceId, payment_term, to, items_list } = content
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <InvoiceShortTemplate transitionDelay={transitionDelay} id={invoiceId}>
            <Header size="small">
                <span>#</span>
                {invoiceId?.toString().substring(0, 6)}
            </Header>
            <div>{payment_term && 'Due' + moment(payment_term).format('DD MMM YYYY')}</div>
            <div>{to?.name}</div>
            <Header size="medium">
                &#163;
                {items_list ? `${addCommas(calculateTotalOfInvoice(items_list))}` : ''}
            </Header>
            <Status type={type}>{type}</Status>
            {windowWidth > 750 && <img src={arrowRight} alt="arrowRight" />}
        </InvoiceShortTemplate>
    )
}

export default React.memo(InvoiceShort)
