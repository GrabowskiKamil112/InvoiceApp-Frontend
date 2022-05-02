import theme from '../theme/theme'
import * as Yup from 'yup'
import { Invoice, ItemsListEntity } from '../Types/Invoice'

export const themeNavigator = (path: string): string => {
    return path.split('.').reduce<any>((a, b) => {
        return a && a[b]
    }, theme)
}

export const generateInfo = (invoiceFilter: string, amount = 1): string => {
    return `There ${amount > 1 ? 'are' : 'is'} ${amount} ${invoiceFilter} ${
        amount > 1 ? 'invoices' : 'invoice'
    }`
}

export function calculateTotalOfItem(quantity?: string, price?: string): number {
    if (quantity && price) {
        return parseFloat(price) * parseFloat(quantity)
    }
    return 0
}

export function calculateTotalOfInvoice(items: ItemsListEntity[]): number {
    const totalAmount = items.reduce((acc, { price, quantity }) => {
        return (acc += calculateTotalOfItem(quantity, price))
    }, 0)

    return totalAmount
}

export function getWindowWidth(): number {
    const { innerWidth } = window
    return innerWidth
}

export const getTotalPriceOfItemInForm = (item: ItemsListEntity): string => {
    const { price, quantity } = item || {}

    if (price && quantity && [price, quantity].every((s) => s.match(/^\d+$/))) {
        return (parseInt(quantity) * parseInt(price)).toString() + '$'
    }
    return '0'
}

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short! Minimum is 4 signs')
        .max(24, 'Too Long! Maximum is 24 signs')
        .required('Username is required'),
    email: Yup.string()
        .min(4, 'Too Short! Minimum is 4 signs')
        .max(24, 'Too Long! Maximum is 24 signs')
        .required('email is required'),
    password: Yup.string()
        .min(4, 'Too Short! Minimum is 4 signs')
        .max(24, 'Too Long! Maximum is 24 signs')
        .matches(/[a-zA-Z]/, 'Password must also contain Latin letters.')
        .required('password is required'),
    passwordConfirm: Yup.string().test(
        'passwords-match',
        'Passwords must match',
        (value, { parent: { password } }) => value === password
    ),
})

// const test={
//     "type": "pending",
//     "street_address": "Wyszyńskiego",
//     "city": "Jawiszowice",
//     "post_code": "32-626",
//     "country": "Polska",
//     "clients_name": "fghfghff",
//     "clients_email": "grabowskikamil@vp.pl",
//     "clients_country": "fghfgh",
//     "clients_post_code": "fgh",
//     "clients_city": "fghfgh",
//     "clients_street_address": "fghfgh",
//     "description": "fghfghfgh",
//     "invoice_date": "2022-03-30",
//     "payment_terms": "enginner"
//   }

export const draftInvoice = Yup.object().shape({
    type: Yup.string().oneOf(['draft']).required(),
    from: Yup.object().shape({
        street: Yup.string(),
        city: Yup.string(),
        post_code: Yup.string(),
        country: Yup.string(),
    }),
    to: Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { message: 'email is incorrect', excludeEmptyString: true }
        ),
        country: Yup.string(),
        post_code: Yup.string(),
        city: Yup.string(),
        street: Yup.string(),
    }),
    payment_term: Yup.string(),
    description: Yup.string(),
    invoice_date: Yup.string(),
    items_list: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            quantity: Yup.number(),
            price: Yup.number(),
        })
    ),
})

export const normalInvoice = Yup.object().shape({
    type: Yup.string().oneOf(['pending', 'paid']).required(),
    from: Yup.object().shape({
        street: Yup.string().required(),
        city: Yup.string().required(),
        post_code: Yup.string().required(),
        country: Yup.string().required(),
    }),
    to: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                { message: 'email is incorrect', excludeEmptyString: true }
            )
            .required(),
        country: Yup.string().required(),
        post_code: Yup.string().required(),
        city: Yup.string().required(),
        street: Yup.string().required(),
    }),
    payment_term: Yup.string().required(),
    description: Yup.string().required(),
    invoice_date: Yup.string().required(),
    items_list: Yup.array()
        .min(1)
        .of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.number().required(),
                price: Yup.number().required(),
            })
        ),
})

export const validateForm = async (values: Invoice) => {
    const errorsList: Record<string, string> = {}
    console.log('values', values)

    const { type } = values

    if (type === 'draft') {
        await draftInvoice
            .validate(values, { abortEarly: false })
            .then(() => {})
            .catch((errors) => {
                errors.inner.forEach((e: Yup.ValidationError) => {
                    if (e.path) {
                        errorsList[e.path] = e.message
                    }
                })
            })
    } else {
        await normalInvoice
            .validate(values, { abortEarly: false })
            .then(() => {
                // Success
            })
            .catch((errors) => {
                errors.inner.forEach((e: Yup.ValidationError) => {
                    if (e.path) {
                        errorsList[e.path] = e.message
                    }
                })
            })
    }

    console.log('list of errors', errorsList)
    return errorsList
}
