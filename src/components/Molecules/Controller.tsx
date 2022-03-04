import React from 'react'
import styled from 'styled-components'
import githubLogo from '../../../public/assets/icon-github.svg'

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgb(73, 78, 110);
`
const GithubLogo = styled.img`
    width: 40px;
    margin: 10px 0 10px 0;
`
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Controller() {
    return (
        <StyledWrapper>
            <Divider />
            <a href="https://github.com/GrabowskiKamil112" target="_blank" rel="noreferrer">
                <GithubLogo src={githubLogo} />
            </a>
        </StyledWrapper>
    )
}

export default Controller
