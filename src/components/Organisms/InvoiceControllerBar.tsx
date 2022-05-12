import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Atoms/Button'
import Paragraph from '../Atoms/Paragraph'
import Header from '../Atoms/Header'
import FilterBy from '../Atoms/FilterBy/FilterBy'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { changeFilter } from '../../store/actions'
import { generateInfo, getWindowWidth } from '../../utils/utils'
import plusIcon from '../../../public/assets/icon-plus.svg'
import PageContext from '../../context/pageContext'

const StyledWrapper = styled.div`
    margin-bottom: 54px;
    height: 58px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    & > div > header {
        margin-bottom: 8px;
        @media (max-width: 550px) {
            margin-bottom: -2px;
        }
    }

    @media (max-width: 550px) {
        margin-bottom: 44px;
    }
`

const StyledButton = styled(Button)`
    text-shadow: 0px 0px 1px #ffffff;
    text-transform: none;
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 18px 0 8px;
    transition: background-color 0.3s ease;

    & img {
        background-color: white;
        padding: 10px;
        border-radius: 50%;
    }

    & span {
        height: 31px;
        margin-right: 10px;
    }

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: default;
            &:hover::after {
                    display: none;
                }
            }
        `};
`

const StyledDiv = styled.div`
    display: flex;
`

const InvoiceControllerBar = ({
    openFormFn,
    isFormOpen,
}: {
    openFormFn: () => void
    isFormOpen: boolean
}) => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())
    const { activeTheme } = useContext(PageContext)
    const ref1 = useRef<HTMLDivElement>(null)

    const [invoiceFilter, setInvoiceFilter] = useState<string>(
        useAppSelector((state) => state.filterBy) || 'total'
    )

    const numOfInvoicesByFilter = useAppSelector((state) =>
        state.invoices.filter((e) => (invoiceFilter !== 'total' ? e.type === invoiceFilter : true))
    ).length

    const dispatch = useAppDispatch()

    const handleRadioInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement
        if (invoiceFilter === value) {
            ;(e.target as HTMLInputElement).checked = false
            setInvoiceFilter('total')
            return
        }

        setInvoiceFilter(value)
    }

    useEffect(() => {
        dispatch(changeFilter(invoiceFilter))

        const handleResize = () => {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [dispatch, invoiceFilter])

    useLayoutEffect(() => {})

    return (
        <StyledWrapper ref={ref1}>
            <div>
                <Header windowWidth={windowWidth} size="big">
                    Invoices
                </Header>
                <Paragraph themeCtx={activeTheme}>
                    {generateInfo(invoiceFilter, numOfInvoicesByFilter)}
                </Paragraph>
            </div>
            <StyledDiv>
                <FilterBy shorter={windowWidth > 550} handleRadioInput={handleRadioInput} />
                <StyledButton
                    color="hsl(251, 94%, 67%)"
                    onClick={() => openFormFn()}
                    disabled={isFormOpen}>
                    <span>
                        <img src={plusIcon} alt="plus" />
                    </span>
                    <Header size="small">New {windowWidth > 550 && 'Invoice'}</Header>
                </StyledButton>
            </StyledDiv>
        </StyledWrapper>
    )
}

export default InvoiceControllerBar
