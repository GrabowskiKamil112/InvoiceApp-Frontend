import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import InvoiceShort from '../components/Molecules/InvoiceShort'
import InvoiceControllerBar from '../components/Organisms/InvoiceControllerBar'
import InvoiceForm from '../components/Organisms/InvoiceForm'
import { RootState } from '../store'
import NavigationTemplate from '../templates/NavigationTemplate'
import { Invoice } from '../Types/Invoice'
import { useOnClickOutsideForm } from '../utils/hooks'

const Loading = styled.button<{ visible: boolean; display: boolean }>`
    transition: all 0.6s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    height: 100vh;
    width: 100%;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transform: scale(2.5);
    background-color: ${({ theme }) => theme.dark.body.bg};
    &::before {
        content: 'NOW LOADING';
        color: #e0e0e0e2;
        transform: translateY(20px);
    }

    ${({ display }) =>
        display &&
        css`
            display: none;
        `}
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`

interface HomeProps {
    invoices?: Array<Invoice>
    filterBy: 'total' | 'pending' | 'draft' | 'paid'
}

const Home: React.FC<HomeProps> = ({ invoices, filterBy }) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true)
    const invoiceFormRef = React.createRef<HTMLDivElement>()

    useOnClickOutsideForm(invoiceFormRef, () => setIsFormOpen(false))

    useLayoutEffect(() => {
        const rootHTML = document.getElementsByTagName('html')[0]
        if (isFormOpen) {
            rootHTML.style.overflowY = 'hidden'
        } else {
            rootHTML.style.overflowY = 'auto'
        }
    }, [isFormOpen])

    return (
        <>
            {isFormOpen && <InvoiceForm ref={invoiceFormRef} />}
            <NavigationTemplate>
                <InvoiceControllerBar
                    openFormFn={() => setIsFormOpen(true)}
                    isFormOpen={isFormOpen}
                />
                <StyledWrapper>
                    {invoices
                        ?.filter(({ type }: { type: string }) =>
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
