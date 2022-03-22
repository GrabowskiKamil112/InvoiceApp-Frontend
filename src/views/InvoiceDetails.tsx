import React from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'

const InvoiceDetails = () => {

    let { id } = useParams();
  useEffect(() => {
    const fetchedInvoice = await fetchInvoice(id);
  }, [location]);

    
    return 
    <StyledWrapper>
<div></div>
    </StyledWrapper>
}

export default InvoiceDetails
