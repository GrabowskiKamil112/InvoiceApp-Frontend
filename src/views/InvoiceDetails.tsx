import axios from 'axios'
import React, { createRef, ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'
import styled from 'styled-components'
import Button from '../components/Atoms/Button'
import arrowLeft from '../../public/assets/icon-arrow-left.svg'
import DetailsController from '../components/Molecules/DetailsController'
import { Invoice } from '../Types/Invoice'
import DetailsBody from '../components/Molecules/DetailsBody'
import { getWindowWidth } from '../utils/utils'
import { useOnClickOutsideForm } from '../utils/hooks'
import InvoiceForm from '../components/Organisms/InvoiceForm'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 635px;
    height: auto;
    margin: auto;
`

const InvoiceDetails: React.FC = () => {
    // const { id } = useParams()
    const [invoice, setInvoice] = useState<Invoice>()
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const invoiceFormRef = createRef<HTMLDivElement>()

    useOnClickOutsideForm(invoiceFormRef, isFormOpen, () => setIsFormOpen(false))

    const fetchSingleInvoice = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:9001/api/invoice/624c7b0076aa981474d44bf0`
            )
            console.log(data)

            return data as Invoice
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const inside = await fetchSingleInvoice()
            setInvoice(inside)
        }

        fetch()

        function handleResize() {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function getButtons(type: string): ReactNode {
        return (
            <>
                <Button
                    disabled={isFormOpen}
                    color="rgb(37, 41, 69)"
                    onClick={() => setIsFormOpen(true)}>
                    Edit
                </Button>
                <Button disabled={isFormOpen} color="rgb(236, 87, 87)">
                    Delete
                </Button>
                {type !== 'paid' && (
                    <Button disabled={isFormOpen} color="rgb(124, 93, 250)">
                        Mark As Paid
                    </Button>
                )}
            </>
        )
    }

    return (
        <>
            {isFormOpen && (
                <InvoiceForm
                    isEdit
                    invoice={invoice}
                    ref={invoiceFormRef}
                    closeFn={() => setIsFormOpen(false)}
                />
            )}
            <NavigationTemplate>
                <NavLink to={`/home`}>
                    <Button disabled={isFormOpen} variant="back">
                        <img src={arrowLeft} alt="arrow-left"></img>
                        <span>Go back</span>
                    </Button>
                </NavLink>
                {invoice ? (
                    <>
                        <StyledWrapper>
                            <DetailsController
                                type={invoice.type}
                                getButtons={() => getButtons(invoice.type)}
                                windowWidth={windowWidth}
                            />

                            <DetailsBody invoice={invoice} />
                        </StyledWrapper>
                        {windowWidth < 650 && getButtons(invoice.type)}
                    </>
                ) : (
                    <StyledWrapper>No invoice :c</StyledWrapper>
                )}
            </NavigationTemplate>
        </>
    )
}

export default InvoiceDetails
