import React from 'react'
import styled from 'styled-components'
import Logo from '../Atoms/Logo'
import AsideController from '../Molecules/AsideController'

const StyledWrapper = styled.aside`
    background-color: ${({ theme }) => theme.dark.sidebar.bg};
    justify-content: space-between;
    border-radius: 0 20px 20px 0;
    flex-direction: column;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    width: 110px;
    height: 100%;
    display: flex;
    z-index: 995;

    @media (max-width: 900px) {
        border-radius: 0;
        flex-direction: row;
        height: 80px;
        width: 100%;
    }
`

const Sidebar = () => {
    return (
        <StyledWrapper>
            <Logo />
            <AsideController />
        </StyledWrapper>
    )
}

export default Sidebar
