export interface Invoice {
    _id: string
    type: 'draft' | 'pending' | 'paid'
    from?: From
    to?: To
    invoice_date?: string
    payment_term?: string
    description?: string
    items_list?: ItemsListEntity[] | null
    created: string
}

interface From {
    street?: string
    city?: string
    post_code?: string
    country?: string
}
interface To {
    name?: string
    email?: string
    city?: string
    post_code?: string
    country?: string
}
interface ItemsListEntity {
    name: string
    quantity: string | number
    price: string
}

export interface newInvoice extends Invoice {
    userID: string
}
