import axios from 'axios'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'

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
            <div ref={ref}></div>
        </NavigationTemplate>
    )
}

export default InvoiceDetails
