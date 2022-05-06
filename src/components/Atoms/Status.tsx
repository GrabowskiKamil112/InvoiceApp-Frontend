import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import PageContext from '../../context/pageContext'

interface Props {
    type: 'draft' | 'pending' | 'paid'
}
const switchColor = (type: string) => {
    switch (type) {
        case 'paid':
            return '#33d69f'
        case 'pending':
            return '#ff8f00'
        case 'draft':
            return useContext(PageContext).activeTheme === 'light' ? 'rgb(55, 59, 83);' : '#dfe3fa'
    }
}
const StyledInfo = styled.div<{ type: string; themectx: string }>`
    height: 40px;
    width: 104px;
    display: flex;

    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-weight: 700;
    font-size: ${({ theme }) => theme.sizes.m};

    & > span {
        transform: translateX(5px);
        color: ${({ type }) => switchColor(type)};
        position: relative;
        &::first-letter {
            text-transform: uppercase;
        }
        &::before {
            border-radius: 5px;
            content: '';
            width: 8px;
            height: 8px;
            background-color: ${({ type }) => switchColor(type)};
            top: 1px;
            left: -14px;
            position: absolute;
        }
    }

    ${({ type }) =>
        type === 'pending' &&
        css`
            background-color: #ff910011;
            color: #ff8f00;
        `};
    ${({ type }) =>
        type === 'draft' &&
        css`
            background-color: #dfe3fa18;
            color: #dfe3fa;
        `};
    ${({ type }) =>
        type === 'paid' &&
        css`
            background-color: #33d6a021;
            color: #33d69f;
        `};

    @media (max-width: 750px) {
        grid-column: 2;
        grid-row: 2 / span 2;
        justify-self: end;
    }
`
const Status: React.FC<Props> = ({ type, children }) => {
    const { activeTheme } = useContext(PageContext)
    return (
        <StyledInfo type={type} themectx={activeTheme}>
            <span>{children}</span>
        </StyledInfo>
    )
}

export default Status
