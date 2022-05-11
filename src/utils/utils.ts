import theme from '../theme/theme'
import { ItemsListEntity } from '../Types/Invoice'

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

export const getTotalPriceOfItemInForm = (item: ItemsListEntity): string => {
    const { price, quantity } = item || {}
    const numRegex = /(?!^0*$)(?!^0*\.0*$)^\d{1,5}(\.\d{1,2})?$/

    if (price && quantity && [price, quantity].every((s) => s.match(numRegex))) {
        return (parseFloat(quantity) * parseFloat(price)).toFixed(2) + '$'
    }
    return 'NaN'
}

export function calculateTotalOfItem(quantity?: string, price?: string): number {
    if (quantity && price) {
        const result = parseFloat(price) * parseFloat(quantity)
        return parseFloat(result.toFixed(2))
    }

    return 0
}

export function calculateTotalOfInvoice(items: ItemsListEntity[]): number {
    const totalAmount = items.reduce((acc, { price, quantity }) => {
        return (acc += calculateTotalOfItem(quantity, price))
    }, 0)

    return parseFloat(totalAmount.toFixed(2))
}

export function addCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getWindowWidth(): number {
    return window.innerWidth
}
