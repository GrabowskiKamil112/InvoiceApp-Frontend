import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'
import styled from 'styled-components'
import Button from '../components/Atoms/Button'
import arrowLeft from '../../public/assets/icon-arrow-left.svg'
import DetailsController from '../components/Molecules/DetailsController'
import { Invoice } from '../Types/Invoice'
import DetailsBody from '../components/Molecules/DetailsBody'
import { getWindowWidth } from '../utils/utils'

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

    const fetchSingleInvoice = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:9001/api/invoice/62460e74f852671c74005433`
            )
            console.log(data)

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

        function handleResize() {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function getButtons(type: string): ReactNode {
        return (
            <>
                <Button color="rgb(37, 41, 69)">Edit</Button>
                <Button color="rgb(236, 87, 87)">Delete</Button>
                {type !== 'paid' && <Button color="rgb(124, 93, 250)">Mark As Paid</Button>}
            </>
        )
    }

    return (
        <NavigationTemplate>
            {invoice && (
                <>
                    <StyledWrapper>
                        <NavLink to={`/home`}>
                            <Button variant="back">
                                <img src={arrowLeft} alt="arrow-left"></img>
                                <span>Go back</span>
                            </Button>
                        </NavLink>

                        <DetailsController
                            type={invoice.type}
                            getButtons={() => getButtons(invoice.type)}
                            windowWidth={windowWidth}
                        />

                        <DetailsBody content={invoice} />
                    </StyledWrapper>
                    {windowWidth < 650 && getButtons(invoice.type)}
                </>
            )}
        </NavigationTemplate>
    )
}

export default InvoiceDetails
