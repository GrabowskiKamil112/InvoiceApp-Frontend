import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'
import styled from 'styled-components'
import Button from '../components/Atoms/Button'
import arrowLeft from '../../public/assets/icon-arrow-left.svg'
import DetailsController from '../components/Molecules/DetailsController'
import { Invoice } from '../Types/Invoice'
import DetailsBody from '../components/Molecules/DetailsBody'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 635px;
    height: 100%;
    margin: auto;
`

const InvoiceDetails = () => {
    const { id } = useParams()
    const [invoice, setInvoice] = useState<Invoice>()
    console.log(id)

    const fetchSingleInvoice = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:9001/api/invoice/6240970ff86c142ab8041416`
            )
            return data
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
    }, [])

    return (
        <NavigationTemplate>
            {invoice && (
                <StyledWrapper>
                    <NavLink to={`/home`}>
                        <Button variant="back">
                            <img src={arrowLeft} alt="arrow-left"></img>
                            <span>Go back</span>
                        </Button>
                    </NavLink>

                    <DetailsController type={invoice.type} />

                    <DetailsBody content={invoice} />
                </StyledWrapper>
            )}
        </NavigationTemplate>
    )
}

export default InvoiceDetails
