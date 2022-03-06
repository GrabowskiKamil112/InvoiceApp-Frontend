import styled from 'styled-components'
import React from 'react'
import bg from '../../public/assets/signup-bg.jpg'

const StyledBg = styled.div`
    background: url(${bg}) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: relative;
`
const StyledContainer = styled.div`
    width: 85%;
    max-width: 360px;
    box-shadow: 0px 0px 11px 3px rgba(66, 68, 90, 0.5);
    border-radius: 15px;
    background-color: ${({ theme }) => theme.light.body.bg};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

const LoginRegisterTemplate: React.FC = ({ children }) => {
    return (
        <StyledBg>
            <StyledContainer>{children}</StyledContainer>
        </StyledBg>
    )
}

export default LoginRegisterTemplate
