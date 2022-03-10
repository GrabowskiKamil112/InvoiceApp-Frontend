import React from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'

const StyledWrapper = styled.div`
    margin-bottom: 64px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const InvoiceControllerBar = () => {
    return (
        <StyledWrapper>
            <div>
                <h3>header</h3>
                <Paragraph>asdfdasdf</Paragraph>
            </div>
            <div>
                <div>fil;terbystatus</div>
                <Button>btn</Button>
            </div>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
