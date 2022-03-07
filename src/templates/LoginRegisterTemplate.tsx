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
    font-family: 'Poppins', sans-serif;
    width: 85%;
    max-width: 400px;
    box-shadow: 0px 0px 11px 3px #1e213988;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.dark.sidebar.bg};
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
