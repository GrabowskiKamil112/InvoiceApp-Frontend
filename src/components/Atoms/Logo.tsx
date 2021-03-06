import React from 'react'
import styled from 'styled-components'
import logo from '../../../public/assets/logo.svg'

const StyledWrapper = styled.div`
    background-color: rgb(124, 93, 250);
    height: 110px;
    border-radius: 0 0 20px 0;
    position: relative;
    ::before {
        content: '';
        width: 100%;
        height: 55px;
        background-color: rgb(146, 119, 255);
        position: absolute;
        bottom: 0;
        border-radius: 20px 0 20px 0;
    }

    @media (max-width: 900px) {
        height: 80px;
        width: 80px;
        border-radius: 0 20px 20px 0;
        ::before {
            content: '';
            height: 40px;
        }
    }
`
const Img = styled.img`
    width: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 900px) {
        width: 31px;
    }
`

const Logo: React.FC = () => {
    return (
        <StyledWrapper>
            <Img src={logo} />
        </StyledWrapper>
    )
}

export default Logo
