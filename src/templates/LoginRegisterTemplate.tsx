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
interface IStyledContainer {
    isRegister: boolean
    numOfErrors: number
}
const StyledContainer = styled.div<IStyledContainer>`
    font-family: 'Poppins', sans-serif;
    transition: max-height 0.5s ease;
    width: 85%;
    max-width: 400px;
    overflow-y: hidden;
    max-height: ${({ isRegister, numOfErrors }) => {
        return isRegister ? `${440 + numOfErrors * 17}px` : `${310 + numOfErrors * 17}px`
    }};

    transform: scaleY(4);
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
interface ILoginRegisterTemplate {
    isRegister: boolean
    numOfErrors: number
}
const LoginRegisterTemplate: React.FC<ILoginRegisterTemplate> = ({
    children,
    isRegister,
    numOfErrors,
}) => {
    return (
        <StyledBg>
            <StyledContainer numOfErrors={numOfErrors} isRegister={isRegister}>
                {children}
            </StyledContainer>
        </StyledBg>
    )
}

export default LoginRegisterTemplate
