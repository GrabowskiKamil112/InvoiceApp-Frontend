import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import NavigationTemplate from '../templates/NavigationTemplate'

const StyledWrapper = styled.div`
    background-color: purple;
`
const InvoiceDetails = () => {
    const { id } = useParams()

    return (
        <NavigationTemplate>
            <div></div>
        </NavigationTemplate>
    )
}

export default InvoiceDetails
