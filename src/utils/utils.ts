import theme from '../theme/theme'
import * as Yup from 'yup'

export const themeNavigator = (path: string) => {
    return path.split('.').reduce<any>((a, b) => {
        return a && a[b]
    }, theme)
}

export const generateInfo = (invoiceFilter: string, amount = 1) => {
    return `There ${amount > 1 ? 'are' : 'is'} ${amount} ${invoiceFilter} ${
        amount > 1 ? 'invoices' : 'invoice'
    }`
}

export function calculateTotal(quantity?: string, price?: string): number {
    if (quantity && price) {
        return parseFloat(price) * parseFloat(quantity)
    }
    return 0
}

export function getWindowWidth(): number {
    const { innerWidth } = window
    return innerWidth
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
