import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import InvoiceShort from '../components/Molecules/InvoiceShort'
import InvoiceControllerBar from '../components/Organisms/InvoiceControllerBar'
import InvoiceForm from '../components/Organisms/InvoiceForm'
import { RootState } from '../store'
import { fetchInvoices } from '../store/actions'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import NavigationTemplate from '../templates/NavigationTemplate'
import { Invoice } from '../Types/Invoice'
import { useOnClickOutsideForm } from '../utils/hooks'

const Loading = styled.button<{ visible: boolean; display: boolean }>`
    background-color: ${({ theme }) => theme.dark.body.bg};
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transition: all 0.6s ease-in;
    transform: scale(2.5);
    position: absolute;
    height: 100vh;
    z-index: 999;
    width: 100%;
    top: 0;
    left: 0;
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
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const invoiceFormRef = React.createRef<HTMLDivElement>()

    const numOfInvoicesInStore = useAppSelector((state) => state.invoices).length
    const dispatch = useAppDispatch()

    useOnClickOutsideForm(invoiceFormRef, isFormOpen, () => setIsFormOpen(false))

    useEffect(() => {
        numOfInvoicesInStore === 0 && dispatch(fetchInvoices())
    }, [])

    return (
        <>
            {isFormOpen && (
                <InvoiceForm ref={invoiceFormRef} closeFn={() => setIsFormOpen(false)} />
            )}
            {!invoices && <Loading visible display={false} />}
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
