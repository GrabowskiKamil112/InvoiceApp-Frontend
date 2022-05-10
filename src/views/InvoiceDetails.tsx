import axios from 'axios'
import React, { createRef, ReactNode, useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import NavigationTemplate from '../templates/NavigationTemplate'
import styled, { css } from 'styled-components'
import Button from '../components/Atoms/Button'
import arrowLeft from '../../public/assets/icon-arrow-left.svg'
import DetailsController from '../components/Molecules/DetailsController'
import { Invoice } from '../Types/Invoice'
import DetailsBody from '../components/Molecules/DetailsBody/DetailsBody'
import { getWindowWidth, themeNavigator } from '../utils/utils'
import { useOnClickOutsideForm } from '../utils/hooks'
import InvoiceForm from '../components/Organisms/InvoiceForm/InvoiceForm'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import { deleteItem, updateItem } from '../store/actions'
import ConfirmDeleteModal from '../components/Molecules/ConfirmDeleteModal'
import PageContext from '../context/pageContext'
import { CSSTransition } from 'react-transition-group'
import { motion } from 'framer-motion'

const StyledWrapper = styled.div`
    flex-direction: column;
    max-width: 635px;
    display: flex;
    height: auto;
    margin: auto;
    width: 100%;
`
const StyledReturnButton = styled(Button)`
    justify-content: flex-start;
    align-items: center;
    padding-left: 0;
    display: flex;
    & > span {
        transform: translateY(15%);
        white-space: nowrap;
        margin-left: 10px;
    }
`

const StyledButton = styled(Button)<{ themectx: string }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.btn.quaternary.bg`)};
    color: ${({ themectx }) => themeNavigator(`${themectx}.btn.quaternary.text`)};
    ${({ themectx }) =>
        themectx === 'light' &&
        css`
            &:hover::after {
                background-color: #13131347;
            }
        `}
`

const ButtonsWrapper = styled.div<{ themectx: string }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.sidebar.bg`)};
    padding: 24px;
    width: 100%;
    display: flex;
    justify-content: end;

    & > button {
        margin-right: 10px;
    }
`

const InvoiceDetails: React.FC = () => {
    const { id } = useParams()
    const { activeTheme } = useContext(PageContext)
    const [invoice, setInvoice] = useState<Invoice>()
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
    const [fetchAgain, toggleFetchAgain] = useState<boolean>(false)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const invoiceFormRef = createRef<HTMLDivElement>()

    const dispatch = useAppDispatch()
    const invoicesForAdmin=useAppSelector(state=>state.invoices)

    useOnClickOutsideForm(invoiceFormRef, isFormOpen, () => setIsFormOpen(false))

    const fetchSingleInvoice = async () => {
        try {
            const { data } = await axios.get(`http://localhost:9001/api/invoice/${id}`)

            return data as Invoice
        } catch (e) {
            const res =invoicesForAdmin.filter(invoice=>invoice._id == id)          
            
            console.error(e)
            return res[0]
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const inside = await fetchSingleInvoice()
            setInvoice(inside)
        }

        fetch()

        function handleResize() {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [fetchAgain, isFormOpen])

    const handleDelete = () => {
        id && dispatch(deleteItem(id))
    }

    const markAsPaid = () => {
        const paidInvoice = Object.assign({}, invoice)
        paidInvoice.type = 'paid'
        dispatch(updateItem(paidInvoice, id as string))
    }

    function getButtons(type: string): ReactNode {
        return (
            <>
                <StyledButton
                    themectx={activeTheme}
                    disabled={isFormOpen}
                    color="rgb(37, 41, 69)"
                    onClick={() => setIsFormOpen(true)}>
                    Edit
                </StyledButton>
                <Button
                    disabled={isFormOpen}
                    color="rgb(236, 87, 87)"
                    onClick={() => setIsDeleteModal(true)}>
                    Delete
                </Button>
                {type === 'pending' && (
                    <Button
                        disabled={isFormOpen}
                        onClick={() => {
                            markAsPaid()
                            toggleFetchAgain(!fetchAgain)
                        }}
                        color="rgb(124, 93, 250)">
                        Mark As Paid
                    </Button>
                )}
            </>
        )
    }

    const invoiceDetailsMotion = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
    }

    return (
        <>
            <CSSTransition in={isDeleteModal} timeout={200} classNames="fade" unmountOnExit>
                <ConfirmDeleteModal
                    invoiceId={invoice?._id}
                    cancelFn={() => setIsDeleteModal(false)}
                    deleteFn={() => {
                        handleDelete()
                        setIsDeleteModal(false)
                    }}
                />
            </CSSTransition>
            {isFormOpen && (
                <InvoiceForm
                    isEdit
                    invoice={invoice}
                    ref={invoiceFormRef}
                    closeFn={() => setIsFormOpen(false)}
                />
            )}
            <NavigationTemplate>
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={invoiceDetailsMotion}>
                    <NavLink to={`/home`}>
                        <StyledReturnButton disabled={isFormOpen} variant="back">
                            <img src={arrowLeft} alt="arrow-left"></img>
                            <span>Go back</span>
                        </StyledReturnButton>
                    </NavLink>
                    {invoice ? (
                        <>
                            <StyledWrapper>
                                <DetailsController
                                    type={invoice.type}
                                    getButtons={() => getButtons(invoice.type)}
                                    windowWidth={windowWidth}
                                />

                                <DetailsBody invoice={invoice} />
                            </StyledWrapper>
                        </>
                    ) : (
                        <StyledWrapper> No invoice / Something went wrong </StyledWrapper>
                    )}
                </motion.div>
            </NavigationTemplate>
            {invoice && windowWidth < 650 && (
                <ButtonsWrapper themectx={activeTheme}>{getButtons(invoice.type)}</ButtonsWrapper>
            )}
        </>
    )
}

export default InvoiceDetails
