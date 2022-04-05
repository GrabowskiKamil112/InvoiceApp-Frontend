import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import PageContext from '../../context/pageContext'
import Button from '../Atoms/Button'
import DropdownSelect from '../Atoms/DropdownSelect'
import FormInput from '../Atoms/FormInput'
import Header from '../Atoms/Header'

const StyledWrapper = styled.div`
    position: absolute;
    height: 100vh;
    background-color: #00000071;
    width: 100%;
    z-index: 990;
`
const StyledForm = styled(Form)`
    margin-left: 94px;
    padding: 56px 32px 0 72px;
    max-width: 656px;
    height: 100%;
    background-color: rgb(20, 22, 37);
    border-radius: 0 20px 20px 0;
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
    overflow-y: scroll;
    padding: 0 32px 16px 0;
    & > fieldset > legend {
        color: #7c5dfa;
        font-size: 1.2rem;
        font-weight: 900;
        margin-bottom: 24px;
    }
`
const ButtonsContainer = styled.div`
    margin-top: 48px;
    height: 556px;
    display: flex;
    flex-direction: row;
`
const InvoiceForm = React.forwardRef<HTMLDivElement>((_props, ref) => {
    const { activeTheme } = useContext(PageContext)

    return (
        <StyledWrapper ref={ref}>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                    street_address: '',
                    city: '',
                    post_code: '',
                    country: '',
                    clients_name: '',
                    clients_email: '',
                    clients_country: '',
                    clients_street_address: '',
                    clients_city: '',
                    description: '',
                    invoice_date: '',
                    payment_terms: '',
                }}
                // validationSchema={undefined}
                onSubmit={(values: any) => {
                    alert(JSON.stringify(values, null, 2))
                }}>
                {({ values, setFieldValue }) => (
                    <StyledForm>
                        <Header fontSize="2.4" size={'big'}>
                            Create Invoice
                        </Header>
                        <Div>
                            <fieldset>
                                <legend>Bill From</legend>
                                <StyledFormSection>
                                    <FormInput
                                        wideSpan
                                        validationError="dfgh"
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
                                        type="email"
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
                                        name="Post Code"
                                        value={values.street_address}
                                    />
                                    <FormInput
                                        type="text"
                                        label="Country"
                                        name="country"
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
                                        name="invoice_date"
                                        value={values.invoice_date}
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
                            </fieldset>
                        </Div>
                        <ButtonsContainer>
                            <Button color={activeTheme == 'dark' ? '#252945' : '#f9fafe'}>
                                Discard
                            </Button>
                            <Button color="#363B53">Save as Draft</Button>
                            <Button color="#7c5dfa" type="submit">
                                Save & Send
                            </Button>
                        </ButtonsContainer>
                    </StyledForm>
                )}
            </Formik>
        </StyledWrapper>
    )
})

export default InvoiceForm
function setFieldValue(arg0: string, value: any) {
    throw new Error('Function not implemented.')
}
