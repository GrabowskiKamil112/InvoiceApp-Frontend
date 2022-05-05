import { FieldArray, Formik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PageContext from '../../../context/pageContext'
import { Invoice } from '../../../Types/Invoice'
import { getWindowWidth } from '../../../utils/utils'
import Button from '../../Atoms/Button'
import DropdownSelect from '../../Atoms/DropdownSelect'
import FormInput from '../../Atoms/FormInput'
import Header from '../../Atoms/Header'
import Errors from '../../Atoms/Errors'
import FormItem from '../../Molecules/FormItem'
import moment from 'moment'
import { useAppDispatch } from '../../../store/hooks/hooks'
import { addItem, updateItem } from '../../../store/actions'
import {
    ButtonsContainer,
    Div,
    StyledForm,
    StyledFormSection,
    StyledWrapper,
} from './InvoiceForm-styling'
import { validateForm } from '../../../utils/validation'

type props = {
    isEdit?: boolean
    invoice?: Invoice
    closeFn: () => void
}
const InvoiceForm = React.forwardRef<HTMLDivElement, props>(
    ({ isEdit = false, invoice, closeFn }, ref) => {
        const { activeTheme } = useContext(PageContext)
        const [windowWidth, setWindowWidth] = useState(getWindowWidth())
        const formToScrollRef = useRef<HTMLDivElement>(null)

        const dispatch = useAppDispatch()

        const {
            _id,
            type,
            from = {},
            to = {},
            invoice_date,
            payment_term,
            description,
            _id: id,
            items_list,
        } = invoice || {}

        useEffect(() => {
            function handleResize() {
                setWindowWidth(getWindowWidth())
            }

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [windowWidth])

        return (
            <StyledWrapper ref={ref}>
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={{
                        _id: _id || '',
                        type: type || '',
                        from: {
                            street: from.street || '',
                            city: from.city || '',
                            post_code: from.post_code || '',
                            country: from.country || '',
                        },
                        to: {
                            name: to.name || '',
                            email: to.email || '',
                            country: to.country || '',
                            post_code: to.post_code || '',
                            city: to.city || '',
                            street: to.street || '',
                        },
                        description: description || '',
                        invoice_date: invoice_date || moment(new Date()).format('YYYY-MM-DD'),
                        payment_term: payment_term || '1',
                        items_list: items_list || [],
                    }}
                    validate={async (values) => {
                        const errors = await validateForm(values as Invoice)

                        setTimeout(() => {
                            if (Object.keys(errors).length !== 0) {
                                const form = formToScrollRef.current
                                form!.scrollTop = form!.scrollHeight
                            }
                        }, 150)

                        return errors
                    }}
                    onSubmit={(values) => {
                        values.payment_term = moment(
                            moment(values.invoice_date).add(values.payment_term, 'days')
                        ).format('YYYY-MM-DD')

                        closeFn()

                        if (isEdit) {
                            dispatch(updateItem(values as Invoice, values._id))
                            return
                        }
                        console.log('submited: ', values)

                        dispatch(addItem(values as Invoice))
                    }}>
                    {({ values, setFieldValue }) => (
                        <StyledForm themectx={activeTheme}>
                            <Header fontSize="2.4" size={'big'}>
                                {isEdit ? (
                                    <span>
                                        Edit
                                        <span style={{ color: '#88EB0 !important' }}>#</span>
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
                                            name="from.street"
                                            value={values.from.street}
                                        />
                                        <FormInput
                                            type="text"
                                            label="City"
                                            name="from.city"
                                            value={values.from.city}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Post Code"
                                            name="from.post_code"
                                            value={values.from.post_code}
                                        />
                                        <FormInput
                                            wideSpan={windowWidth < 600}
                                            type="text"
                                            label="Country"
                                            name="from.country"
                                            value={values.from.country}
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
                                            name="to.name"
                                            value={values.to.name}
                                        />
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Client's Email"
                                            name="to.email"
                                            placeholder="e.g email@example.com"
                                            value={values.to.email}
                                        />
                                        <FormInput
                                            wideSpan
                                            type="text"
                                            label="Street Address"
                                            name="to.street"
                                            value={values.to.street}
                                        />
                                        <FormInput
                                            type="text"
                                            label="City"
                                            name="to.city"
                                            value={values.to.city}
                                        />
                                        <FormInput
                                            type="text"
                                            label="Post Code"
                                            name="to.post_code"
                                            value={values.to.post_code}
                                        />
                                        <FormInput
                                            wideSpan={windowWidth < 600}
                                            type="text"
                                            label="Country"
                                            name="to.country"
                                            value={values.to.country}
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
                                            onChangeFn={(value: string) => {
                                                setFieldValue('payment_term', value)
                                            }}
                                            label="Payment Terms"
                                            name="payment_term"
                                            value={values.payment_term}
                                            options={[
                                                { value: '1', label: 'Net 1 days' },
                                                { value: '7', label: 'Net 7 days' },
                                                { value: '14', label: 'Net 14 days' },
                                                { value: '30', label: 'Net 30 days' },
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

                                    <FieldArray
                                        name="items_list"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.items_list.map((_item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        index={index}
                                                        removeItemFn={(index: number) => {
                                                            arrayHelpers.remove(index)
                                                        }}></FormItem>
                                                ))}
                                                <Button
                                                    themeCtx={activeTheme}
                                                    variant="addNewItem"
                                                    type="button"
                                                    onClick={() => {
                                                        arrayHelpers.push({})
                                                    }}
                                                    color={
                                                        activeTheme == 'dark'
                                                            ? '#252945'
                                                            : '#f9fafe'
                                                    }>
                                                    + Add New Item
                                                </Button>
                                            </div>
                                        )}
                                    />
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
