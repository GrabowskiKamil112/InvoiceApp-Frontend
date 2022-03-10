import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Organisms/Sidebar'

const StyledWrapper = styled.div`
    margin-left: 110px;
    padding: 50px;
    height: 100%;
    @media (max-width: 900px) {
        margin: 110px 0 0 0;
    }
`

const NavigationTemplate: React.FC = ({ children }) => {
    return (
        <StyledWrapper>
            <Sidebar />
            {children}
        </StyledWrapper>
    )
}

export default NavigationTemplate
