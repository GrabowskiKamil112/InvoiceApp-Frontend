export interface Invoice {
    type: 'draft' | 'pending' | 'paid'
    id: string
    from?: From
    to?: To
    invoice_date?: string
    payment_term?: string
    description?: string
    items_list?: ItemsListEntity[] | null
    user_id: string
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
