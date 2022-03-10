import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InvoiceShort from '../components/Molecules/InvoiceShort'
import InvoiceControllerBar from '../components/Organisms/InvoiceControllerBar'
import NavigationTemplate from '../templates/NavigationTemplate'

const Loading = styled.button<{ visible: boolean }>`
    transition: all 0.6s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transform: scale(2.5);
    background-color: ${({ theme }) => theme.dark.body.bg};
    &::before {
        content: 'NOW LOADING';
        color: #e0e0e0e2;
        transform: translateY(20px);
    }
`
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`
const mockedInvoices = [
    {
        type: 'asdf', // draft, pending, paid
        from: {
            street: 'asdf',
            city: 'asdf',
            post_code: 'asdf',
            country: 'asdf',
        },
        to: {
            name: 'fghjvbngh',
            email: 'fghjvbngh',
            city: 'fghjvbngh',
            post_code: 'dfgxcvbxc',
            country: 'dfgxcvbxc',
        },
        invoice_date: 'dfgxcvbxc',
        payment_term: 'asdf',
        description: 'asdf',
        items_list: [],
        userID: 'asdf',
        created: 'asdf',
    },
    {
        type: 'asdf', // draft, pending, paid
        from: {
            street: 'asdf',
            city: 'asdf',
            post_code: 'asdf',
            country: 'asdf',
        },
        to: {
            name: 'aaaaaaaaa',
            email: 'fghjvbngh',
            city: 'fghjvbngh',
            post_code: 'dfgxcvbxc',
            country: 'dfgxcvbxc',
        },
        invoice_date: 'dfgxcvbxc',
        payment_term: 'asdf',
        description: 'asdf',
        items_list: [],
        userID: 'asdf',
        created: 'asdf',
    },
]
const Home: React.FC = () => {
    const [isLoading, toggleLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            toggleLoading(!isLoading)
        }, 500)
    }, [])

    return (
        <>
            <Loading visible={isLoading} className="button  is-loading  is-large" />
            <NavigationTemplate>
                <InvoiceControllerBar />
                <StyledWrapper>
                    {mockedInvoices.map((invoice) => (
                        <InvoiceShort key={mockedInvoices.indexOf(invoice)}>
                            {invoice.to.name}
                        </InvoiceShort>
                    ))}
                </StyledWrapper>
            </NavigationTemplate>
        </>
    )
}

export default Home
