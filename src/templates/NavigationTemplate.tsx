import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Organisms/Sidebar'

const StyledWrapper = styled.div`
    margin-left: 110px;
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
