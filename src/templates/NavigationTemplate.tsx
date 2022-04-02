import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Organisms/Sidebar'

const StyledWrapper = styled.div`
    margin-left: 110px;
    padding: 6% 8% 10% 8%;
    position: relative;

    @media (max-width: 900px) {
        margin: 80px 0 0 0;
    }
`
const StyledContainer = styled.div`
    max-width: 730px;
    margin: auto;
`

const NavigationTemplate: React.FC = ({ children }) => {
    return (
        <StyledWrapper>
            <Sidebar />
            <StyledContainer>{children}</StyledContainer>
        </StyledWrapper>
    )
}

export default NavigationTemplate
