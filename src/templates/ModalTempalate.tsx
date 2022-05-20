import React, { useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../context/pageContext'
import { themeNavigator } from '../utils/utils'

const StyledBackground = styled.div`
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99998;
    background-color: #00000073;
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledModal = styled.div<{ themeCtx: string }>`
    margin: auto;
    margin-left: 36px;
    width: 480px;
    z-index: 99999;
    left: 50vw;
    top: 50vh;
    margin-top: -126px; /* Negative half of height. */
    margin-left: -220px; /* Negative half of width. */
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 253px;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.popup.bg`)};
    border-radius: 8px;
    padding: 48px;
    transition: all 0.2s;

    @media (max-width: 450px) {
        height: 230px;
        width: 340px;
        margin-top: -115px;
        margin-left: -170px;
    }

    &.fade-enter {
        transform: scale(0.4);
    }

    // enter to
    &.fade-enter-active {
        transform: scale(1);
    }

    // exit from
    &.fade-exit {
        transform: scale(1);
    }

    // exit to
    &.fade-exit-active {
        transform: scale(0);
    }
    & > p {
        margin: 34px 0 24px 0;
        line-height: 160%;
    }

    & > div {
        margin-top: auto;
        & > button {
            float: right;
            margin-top: auto;
            &:nth-of-type(2) {
                margin-right: 8px;
            }
        }
    }
`

interface Props {
   
}

const ModalTemplate: React.FC<Props> = ({children}) => {
    const { activeTheme } = useContext(PageContext)
    return (
        <>
            <StyledModal themeCtx={activeTheme}>
                {children}
            </StyledModal>
            <StyledBackground />
        </>
    )
}

export default ModalTemplate