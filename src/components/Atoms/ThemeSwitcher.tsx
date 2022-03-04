import React, { useContext } from 'react'
import sunIcon from '../../../public/assets/icon-sun.svg'
import PageContext from '../../context/pageContext'
import moonIcon from '../../../public/assets/icon-moon.svg'
import Icon from './Icon'

function ThemeSwitcher() {
    const { activeTheme } = useContext(PageContext)

    return <Icon src={activeTheme === 'light' ? moonIcon : sunIcon} />
}

export default ThemeSwitcher
