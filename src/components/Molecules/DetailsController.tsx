import React, { useContext } from 'react'
import styled from 'styled-components'
import PageContext from '../../context/pageContext'
import { themeNavigator } from '../../utils/utils'
import Status from '../Atoms/Status'
import Button from '../Atoms/Button'

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
`

interface Props {
    type?: 'draft' | 'paid' | 'pending'
}
const DetailsController: React.FC<Props> = ({ type = 'draft' }) => {
    const { activeTheme } = useContext(PageContext)
    console.log('type:', type)

    return (
        <StyledWrapper themeCtx={activeTheme}>
            <Container themeCtx={activeTheme}>
                <span>Status</span>
                <Status type={type}>{type}</Status>
            </Container>
            <Container>
                <Button width="74px" color="rgb(37, 41, 69)">
                    Edit
                </Button>
                <Button width="91px" color="rgb(236, 87, 87)">
                    Delete
                </Button>
                {type !== 'paid' && (
                    <Button width="137px" color="rgb(124, 93, 250)">
                        Mark As Paid
                    </Button>
                )}
            </Container>
        </StyledWrapper>
    )
}

export default DetailsController
