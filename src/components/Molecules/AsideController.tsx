import React, { useContext } from 'react'
import styled from 'styled-components'
import githubLogo from '../../../public/assets/icon-github.svg'
import logoutIcon from '../../../public/assets/logout-icon.svg'
import Icon from '../Atoms/Icon'
import moonIcon from '../../../public/assets/icon-moon.svg'
import sunIcon from '../../../public/assets/icon-sun.svg'
import PageContext from '../../context/pageContext'
import { useAppDispatch } from '../../store/hooks/hooks'
import { logout } from '../../store/actions'

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
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 900px) {
        flex-direction: row;
        & > div {
            display: flex;
        }
    }
`

const AsideController: React.FC = () => {
    const { activeTheme, toggleTheme } = useContext(PageContext)
    const dispatch = useAppDispatch()

    return (
        <StyledWrapper>
            <div>
                <div onClick={() => dispatch(logout())}>
                    <Icon themectx={activeTheme} src={logoutIcon} />
                </div>
                <Icon
                    themectx={activeTheme}
                    src={activeTheme === 'light' ? moonIcon : sunIcon}
                    onClick={toggleTheme}
                />
            </div>

            <Divider />
            <a href="https://github.com/GrabowskiKamil112" target="_blank" rel="noreferrer">
                <GithubLogo src={githubLogo} alt="githubLogo" />
            </a>
        </StyledWrapper>
    )
}

export default AsideController
