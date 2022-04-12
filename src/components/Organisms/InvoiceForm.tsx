import { Form, Formik } from 'formik'
import React, { useContext, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import PageContext from '../../context/pageContext'
import { Invoice } from '../../Types/Invoice'
import { themeNavigator, validateForm } from '../../utils/utils'
import Button from '../Atoms/Button'
import DropdownSelect from '../Atoms/DropdownSelect'
import FormInput from '../Atoms/FormInput'
import Header from '../Atoms/Header'
import Errors from '../Atoms/Errors'
import FormItem from '../Molecules/FormItem'

const StyledWrapper = styled.div`
    position: fixed;
    height: 100vh;
    background-color: #00000071;
    width: 100vw;
    z-index: 990;
    top: 0;
    left: 0;
`
const StyledForm = styled(Form)<{ themectx: string }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.form.bg`)};
    border-radius: 0 20px 20px 0;
    padding: 56px 32px 0 166px;
    max-width: 750px;
    height: 100%;

    @media (max-width: 900px) {
        padding-left: 60px;
    }
`
const StyledFormSection = styled.div<{ dates?: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 24px;

    ${({ dates }) =>
        dates &&
        css`
            grid-template-columns: repeat(2, 1fr);
        `};
`
const Div = styled.div`
    margin-top: 48px;
    height: 556px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    scroll-behavior: smooth;
    overflow-y: scroll;
    padding: 0 32px 16px 0;
    & > fieldset > legend {
        color: #7c5dfa;
        font-size: 1.2rem;
        font-weight: 900;
        margin-bottom: 24px;
    }
`
const ButtonsContainer = styled.div<{ isEdit: boolean }>`
    height: 47px;
    flex-direction: row;
    gap: 8px;
    justify-content: right;
    margin-top: 38px;
    height: 556px;
    display: flex;
    ${({ isEdit }) =>
        !isEdit &&
        css`
            & > button:nth-child(1) {
                margin-right: auto;
            }
        `};
`

type props = {
    isEdit?: boolean
    invoice?: Invoice
    closeFn: () => void
}
const InvoiceForm = React.forwardRef<HTMLDivElement, props>(
    ({ isEdit = false, invoice, closeFn }, ref) => {
        const { activeTheme } = useContext(PageContext)
        const [numOfitems, setNumOfItems] = useState<number>(0)
        const formToScrollRef = useRef<HTMLDivElement>(null)

        const {
            type,
            from = {},
            to = {},
            created,
            payment_due,
            description,
            _id: id,
            items_list,
        } = invoice || {}
        console.log('itemslist in form', items_list)

        return (
            <StyledWrapper ref={ref}>
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={{
                        _id: '',
                        type: type || '',
                        street_address: from.street_address || '',
                        city: from.city || '',
                        post_code: from.post_code || '',
                        country: from.country || '',
                        clients_name: to.name || '',
                        clients_email: to.email || '',
                        clients_country: to.country || '',
                        clients_post_code: to.post_code || '',
                        clients_city: to.city || '',
                        clients_street_address: to.street_address || '',
                        description: description || '',
                        created: created || '',
                        payment_terms: payment_due || '',
                        items_list: [],
                    }}
                    validate={async (values) => {
                        const errors = await validateForm(values as Invoice)
                        if (Object.keys(errors).length !== 0) {
                            const form = formToScrollRef.current
                            form!.scrollTop = form!.scrollHeight
                        }
                        return errors
                    }}
                    onSubmit={(values: any) => {
                        if (isEdit) {
                            console.log('EDITED')
                        }
                        console.log('gotowy:', JSON.stringify(values, null, 2))
                    }}>
                    {({ values, setFieldValue }) => (
                        <StyledForm themectx={activeTheme}>
                            <Header fontSize="2.4" size={'big'}>
                                {isEdit ? (
                                    <span>
                                        Edit
                                        <span style={{ color: '#88EB0' }}>#</span>
                                        {id?.substring(0, 6).toUpperCase()}
                                    </span>
                                ) : (
                                    'Create Invoice'
                                )}
                            </Header>
                            <Div ref={formToScrollRef}>
                                <fieldset>
                                    <legend>Bill From</legend>
                                    <StyledFormSection>
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Street Address"
                                            name="street_address"
                                            value={values.street_address}
                                        />
                                        <FormInput
                                            type="text"
                                            label="City"
                                            name="city"
                                            value={values.city}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Post Code"
                                            name="post_code"
                                            value={values.post_code}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Country"
                                            name="country"
                                            value={values.country}
                                        />
                                    </StyledFormSection>
                                </fieldset>
                                <fieldset>
                                    <legend>Bill To</legend>
                                    <StyledFormSection>
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Client's Name"
                                            name="clients_name"
                                            value={values.clients_name}
                                        />
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Client's Email"
                                            name="clients_email"
                                            placeholder="e.g email@example.com"
                                            value={values.clients_email}
                                        />
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Street Address"
                                            name="clients_street_address"
                                            value={values.clients_street_address}
                                        />
                                        <FormInput
                                            type="text"
                                            label="City"
                                            name="clients_city"
                                            value={values.clients_city}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Post Code"
                                            name="clients_post_code"
                                            value={values.clients_post_code}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Country"
                                            name="clients_country"
                                            value={values.clients_country}
                                        />
                                    </StyledFormSection>
                                </fieldset>
                                <fieldset>
                                    <legend>Dates</legend>
                                    <StyledFormSection dates>
                                        <FormInput
                                            type="date"
                                            label="Invoice Date"
                                            name="created"
                                            value={values.created}
                                        />
                                        <DropdownSelect
                                            onChange={(value: string) =>
                                                setFieldValue('payment_terms', value)
                                            }
                                            label="Payment Terms"
                                            name="payment_terms"
                                            value={values.payment_terms}
                                            options={[
                                                { value: 'developer', label: 'Software Developer' },
                                                { value: 'chef', label: 'Chef' },
                                                { value: 'enginner', label: 'Enginner' },
                                                { value: 'painter', label: 'Painter' },
                                            ]}
                                        />
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Description"
                                            name="description"
                                            placeholder="e.g Graphic Design Service"
                                            value={values.description}
                                        />
                                    </StyledFormSection>
                                </fieldset>
                                <fieldset>
                                    <legend>ItemList</legend>
                                    {Array.from({ length: numOfitems }, (_, i) => (
                                        <FormItem
                                            key={i}
                                            index={i}
                                            removeItemFn={() =>
                                                setNumOfItems(numOfitems - 1)
                                            }></FormItem>
                                    ))}
                                    <Button
                                        themeCtx={activeTheme}
                                        variant="addNewItem"
                                        type="button"
                                        onClick={() => setNumOfItems(numOfitems + 1)}
                                        color={activeTheme == 'dark' ? '#252945' : '#f9fafe'}>
                                        + Add New Item
                                    </Button>
                                </fieldset>
                                <Errors />
                            </Div>
                            <ButtonsContainer isEdit={isEdit}>
                                {isEdit ? (
                                    <>
                                        <Button
                                            type="button"
                                            color="#363B53"
                                            onClick={() => closeFn()}>
                                            Cancel
                                        </Button>
                                        <Button
                                            color="#7c5dfa"
                                            type="submit"
                                            onClick={() => {
                                                setFieldValue('type', 'pending')
                                            }}>
                                            Save Changes
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            type="button"
                                            onClick={() => closeFn()}
                                            color={activeTheme == 'dark' ? '#252945' : '#f9fafe'}>
                                            Discard
                                        </Button>
                                        <Button
                                            color="#363B53"
                                            type="submit"
                                            onClick={() => {
                                                setFieldValue('type', 'draft')
                                            }}>
                                            Save as Draft
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setFieldValue('type', 'pending')
                                            }}
                                            color="#7c5dfa"
                                            type="submit">
                                            Save & Send
                                        </Button>
                                    </>
                                )}
                            </ButtonsContainer>
                        </StyledForm>
                    )}
                </Formik>
            </StyledWrapper>
        )
    }
)

export default InvoiceForm
