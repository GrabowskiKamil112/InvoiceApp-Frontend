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

interface From {
    street_address?: string
    city?: string
    post_code?: string
    country?: string
}
interface To {
    name?: string
    email?: string
    city?: string
    street_address?: string
    post_code?: string
    country?: string
}
export interface ItemsListEntity {
    name?: string
    quantity?: string
    price?: string
}

export interface newInvoice extends Invoice {
    userID: string
}
