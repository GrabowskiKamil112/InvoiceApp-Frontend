export interface Invoice {
    _id: string
    type: 'draft' | 'pending' | 'paid'
    from?: From
    to?: To
    invoice_date?: string
    payment_term?: string
    description?: string
    items_list?: ItemsListEntity[]
    created: string
    payment_due?: string
}

type From = {
    street_address?: string
    city?: string
    post_code?: string
    country?: string
}
type To = {
    name?: string
    email?: string
    city?: string
    street_address?: string
    post_code?: string
    country?: string
}
export type ItemsListEntity = {
    name?: string
    quantity?: string
    price?: string
}

export type newInvoice = Omit<Required<Invoice>, 'from' | 'to' | ' items_list'> & {
    userID: string
    from: Required<From>
    to: Required<To>
    items_list: Required<ItemsListEntity>[]
}
export interface newDraftInvoice extends Invoice {
    userID: string
}
