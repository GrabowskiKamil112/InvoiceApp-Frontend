export type invoiceTypes = 'draft' | 'pending' | 'paid'

export interface Invoice {
    invoiceId?: string
    invoice_id?: number
    _id?: string
    type: invoiceTypes
    invoice_date: string
    addressFrom?: string
    addressTo?: string
    address_from?: string
    address_to?: string
    from?: From
    to?: To
    payment_term?: string
    paymentTerm?: string
    description?: string
    items_list?: ItemsListEntity[]
}

type From = {
    street?: string
    city?: string
    post_code?: string
    country?: string
}

type To = {
    name?: string
    email?: string
    city?: string
    street?: string
    post_code?: string
    country?: string
}

export type ItemsListEntity = {
    itemId?: number
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
