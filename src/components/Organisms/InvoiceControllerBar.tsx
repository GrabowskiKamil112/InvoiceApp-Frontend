import React from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'
import Header from '../Atoms/Header'
import FilterBy from '../Atoms/FilterBy'

const StyledWrapper = styled.div`
    margin-bottom: 64px;
    height: 58px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    & > div > header {
        margin-bottom: 5px;
    }
`
const StyledButton = styled(Button)`
    //display: inline-block;
`
const StyledDiv = styled.div`
    display: flex;
`

const InvoiceControllerBar = () => {
    return (
        <StyledWrapper>
            <div>
                <Header size="big">Invoices</Header>
                <Paragraph>There are 2 total invoices.</Paragraph>
            </div>
            <StyledDiv>
                <FilterBy />
                <StyledButton width="140px">btn</StyledButton>
            </StyledDiv>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
