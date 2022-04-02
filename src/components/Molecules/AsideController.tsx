import React, { useContext } from 'react'
import styled from 'styled-components'
import githubLogo from '../../../public/assets/icon-github.svg'
import logoutIcon from '../../../public/assets/logout-icon.svg'
import Icon from '../Atoms/Icon'
import moonIcon from '../../../public/assets/icon-moon.svg'
import sunIcon from '../../../public/assets/icon-sun.svg'
import PageContext from '../../context/pageContext'
import { Link } from 'react-router-dom'

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgb(73, 78, 110);
    @media (max-width: 900px) {
        height: 100%;
        width: 1px;
    }
`
const GithubLogo = styled.img`
    width: 46px;
    margin: 20px 0 20px 0;
    @media (max-width: 900px) {
        margin: 0 20px 0 20px;
    }
`
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 900px) {
        flex-direction: row;
    }
`

const AsideController: React.FC = () => {
    const { activeTheme, toggleTheme } = useContext(PageContext)

    return (
        <StyledWrapper>
            <Link to="/login">
                <Icon src={logoutIcon} />
            </Link>
            <Icon src={activeTheme === 'light' ? moonIcon : sunIcon} onClick={toggleTheme} />
            <Divider />
            <a href="https://github.com/GrabowskiKamil112" target="_blank" rel="noreferrer">
                <GithubLogo src={githubLogo} />
            </a>
        </StyledWrapper>
    )
}

export default AsideController
