import styled from 'styled-components'
import React, { ReactNode } from 'react'

const StyledHeader = styled.header`
    font-weight: 700;
    margin: 0;
    line-height: 36px;
    color: #ebebeb;

    h1 {
        font-size: 3.2rem;
        font-weight: inherit;
    }
    h2 {
        font-size: 1.6rem;
        font-weight: inherit;
    }
    h3 {
        font-size: 1.2rem;
        font-weight: inherit;
    }
`

interface Props {
    size: string
}
const Header: React.FC<Props> = ({ size, children }) => {
    const renderSwitch = (param: string, child: ReactNode) => {
        switch (param) {
            case 'big':
                return <h1>{child}</h1>
            case 'medium':
                return <h2>{child}</h2>
            case 'small':
                return <h3>{child}</h3>
        }
    }

    return <StyledHeader>{renderSwitch(size, children)}</StyledHeader>
}

export default Header
