import axios from 'axios'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'
import styled from 'styled-components'
import Button from '../components/Atoms/Button'
import arrowLeft from '../../public/assets/icon-arrow-left.svg'
import DetailsController from '../components/Molecules/DetailsController'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 635px;
    height: 100%;
    margin: auto;
`

const InvoiceDetails = () => {
    const { id } = useParams()
    const ref = useRef(null) as unknown as MutableRefObject<HTMLDivElement>
    console.log(id)

    const fetchSingleInvoice = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:9001/api/invoice/623f48681d70aa28f456e329`
            )
            console.log('data:', data)
            return data
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const inside = await fetchSingleInvoice()

            console.log(inside)
            ref.current.innerText = JSON.stringify(inside)
        }

        fetch()
    }, [])

    return (
        <NavigationTemplate>
            <StyledWrapper>
                <NavLink to={`/home`}>
                    <Button variant="back">
                        <img src={arrowLeft} alt="arrow-left"></img>
                        <span>Go back</span>
                    </Button>
                </NavLink>

                <DetailsController type="pending" />

                <detailsInfo />
                <div ref={ref}></div>
            </StyledWrapper>
        </NavigationTemplate>
    )
}

export default InvoiceDetails
