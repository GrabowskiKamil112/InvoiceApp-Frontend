import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import InvoiceShort from '../components/Molecules/InvoiceShort'
import InvoiceControllerBar from '../components/Organisms/InvoiceControllerBar'
import { RootState } from '../store'
import NavigationTemplate from '../templates/NavigationTemplate'
import { Invoice } from '../Types/Invoice'

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

interface HomeProps {
    invoices: Array<Invoice>
    filterBy: string
}

const Home: React.FC<HomeProps> = ({ invoices, filterBy }) => {
    console.log('rerender')

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
                    {invoices
                        .filter(({ type }: { type: string }) =>
                            filterBy !== 'total' ? type === filterBy : true
                        )
                        .map((invoice: Invoice) => (
                            <InvoiceShort key={invoices.indexOf(invoice)} content={invoice} />
                        ))}
                </StyledWrapper>
            </NavigationTemplate>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    const { invoices, filterBy } = state
    return { invoices, filterBy }
}

export default connect(mapStateToProps, null)(Home)
