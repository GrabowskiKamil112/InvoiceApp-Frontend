import React, { useContext } from 'react'
import styled from 'styled-components'
import githubLogo from '../../../public/assets/icon-github.svg'
import logoutIcon from '../../../public/assets/logout-icon.svg'
import Icon from '../Atoms/Icon'
import moonIcon from '../../../public/assets/icon-moon.svg'
import sunIcon from '../../../public/assets/icon-sun.svg'
import PageContext from '../../context/pageContext'

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgb(73, 78, 110);
`
const GithubLogo = styled.img`
    width: 46px;
    margin: 20px 0 20px 0;
`
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Controller() {
    const { activeTheme, toggleTheme } = useContext(PageContext)

    return (
        <StyledWrapper>
            <Icon src={logoutIcon} />
            <Icon src={activeTheme === 'light' ? moonIcon : sunIcon} onClick={toggleTheme} />
            <Divider />
            <a href="https://github.com/GrabowskiKamil112" target="_blank" rel="noreferrer">
                <GithubLogo src={githubLogo} />
            </a>
        </StyledWrapper>
    )
}

export default Controller
