const testItems = [
    { name: 'somasdename', quantity: '234', price: '234' },
    { name: 'nafghjme' },
    { name: 'somename', quantity: '234' },
]

const initialState = {
    type: 'draft',
    from: {
        street: 'wyszynskikiego11a',
        city: 'oswiecim',
        post_code: '32-626',
        country: 'polamnd',
    },
    to: {
        name: 'kamil',
        email: 'abc$123',
        city: 'warsaw',
        post_code: '32-626',
        country: 'ukraine',
    },
    invoice_date: '55.34.1212',
    payment_term: '12.12.2222',
    description: 'reeeeeeeeeeeeeeeeee',
    items_list: testItems,
    userID: '621bb49dab967326a06a880c',
    created: 'now',
}

const rootReducer = (state = initialState, action: any) => {
    return { ...state }
}

export default rootReducer
