import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../store'
import NavigationTemplate from '../templates/NavigationTemplate'

const Div = styled.button<{ visible: boolean }>`
    transition: all 0.6s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    transform: scale(2.5);
    background-color: ${({ theme }) => theme.dark.body.bg};
    &::before {
        content: 'NOW LOADING';
        color: white;
        transform: translateY(20px);
    }
`

const Home: React.FC = () => {
    const [isLoading, toggleLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            toggleLoading(!isLoading)
        }, 1000)
    }, [])

    return (
        <NavigationTemplate>
            <Div visible={isLoading} className="button  is-loading  is-large" />
            UserId: {useAppSelector((state) => state.userID)}
        </NavigationTemplate>
    )
}

export default Home
