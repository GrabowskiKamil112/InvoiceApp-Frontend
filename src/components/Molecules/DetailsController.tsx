import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'
import Status from '../Atoms/Status'

const StyledWrapper = styled.div<{ themeCtx: string }>`
    width: 100%;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    height: 95px;
    margin: 32px 0 24px 0;
    padding: 24px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Container = styled.div<{ themeCtx?: string }>`
    display: flex;
    gap: 8px;
    align-items: center;
    & > span {
        font-size: ${({ theme }) => theme.sizes.m};
        margin-right: 8px;
        color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.btn.tertiary.text`)};
    }

    @media (max-width: 650px) {
        width: 100%;
        justify-content: space-between;
    }
`

interface Props {
    type?: 'draft' | 'paid' | 'pending'
    getButtons: () => ReactNode
    windowWidth: number
}
const DetailsController: React.FC<Props> = ({ type = 'draft', getButtons, windowWidth }) => {
    const { activeTheme } = useContext(PageContext)

    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Container themeCtx={activeTheme}>
                <span>Status</span>
                <Status type={type}>{type}</Status>
            </Container>
            {windowWidth > 650 && <Container>{getButtons()}</Container>}
        </StyledWrapper>
    )
}

export default DetailsController
