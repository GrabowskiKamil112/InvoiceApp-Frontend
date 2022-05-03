import { memo, useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'
import Logo from '../Atoms/Logo'
import AsideController from '../Molecules/AsideController'

const StyledWrapper = styled.aside<{ themectx: string }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.sidebar.bg`)};
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
    const { activeTheme } = useContext(PageContext)
    return (
        <StyledWrapper id="sidebar" themectx={activeTheme}>
            <Logo />
            <AsideController />
        </StyledWrapper>
    )
}

export default memo(Sidebar)
