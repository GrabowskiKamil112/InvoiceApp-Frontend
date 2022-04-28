type invoiceTypes = 'draft' | 'pending' | 'paid'

export interface Invoice {
    _id: string
    type: invoiceTypes
    invoice_date: string
    from?: From
    to?: To
    payment_term?: string
    description?: string
    items_list?: ItemsListEntity[]
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
