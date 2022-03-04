import React from 'react'
import styled from 'styled-components'
import Logo from '../Atoms/Logo'
import Controller from '../Molecules/Controller'

const StyledWrapper = styled.div`
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
`

const Sidebar = () => {
    return (
        <StyledWrapper>
            <Logo />
            <Controller />
        </StyledWrapper>
    )
}

export default Sidebar
