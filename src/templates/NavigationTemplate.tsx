import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Organisms/Sidebar'

const StyledWrapper = styled.div`
    margin-left: 110px;
    height: 100%;
    padding: 0 10% 0 10%;
    @media (max-width: 900px) {
        margin: 110px 0 0 0;
    }
`
const StyledContainer = styled.div`
    max-width: 730px;
    padding: 8% 0 0 0;
    margin: auto;
    height: 100%;
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
