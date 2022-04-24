import { ActionType } from '../actions'

const testItems = [
    { name: 'somasdename', quantity: '234', price: '234' },
    { name: 'nafghjme' },
    { name: 'somename', quantity: '234' },
]

const initialState = {
    filterBy: 'total',
    userID: null,
    invoices: [
        {
            _id: '2zf8dj90dp',
            userID: 'asdf',
            type: 'paid', // draft, pending, paid

            to: {
                name: 'fghjvbngh',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '06 Mar 2022',
            description: 'asdf',
            items_list: [testItems],
            created: 'asdf',
        },

        {
            _id: '2zf8dj90dp',
            userID: 'asdf',
            type: 'paid', // draft, pending, paid
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'fghjvbngh',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '05 Mar 2022',
            description: 'asdf',
            items_list: [testItems],
            created: 'asdf',
        },
        {
            _id: '2zf8dj90dp',
            userID: 'asdf',
            type: 'paid', // draft, pending, paid
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'fghjvbngh',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '05 Mar 2022',
            description: 'asdf',
            items_list: [testItems],
            created: 'asdf',
        },
        {
            _id: '2zf8dj90dp',
            userID: 'asdf',
            type: 'paid', // draft, pending, paid
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'fghjvbngh',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '05 Mar 2022',
            description: 'asdf',
            items_list: [testItems],
            created: 'asdf',
        },
    ],
}

const rootReducer = (state = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case ActionType.CHANGE_FILTER:
            return {
                ...state,
                filterBy: action.payload.filter,
            }

        case ActionType.ADD_INVOICE_SUCCESS:
            const newInvoice = payload.data
            console.log(newInvoice)

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
            }

        case ActionType.REMOVE_INVOICE_SUCCESS:
            console.log(action.type)

            //  const newInvoices = state.invoices.filter((invoice) => invoice.id !== payload.id)
            return {
                ...state,
            }

        case ActionType.REGISTER_SUCCESS:
            console.log(type)

            return {
                ...state,
                userID: payload.data._id,
                username: payload.data.username,
            }

        case ActionType.AUTH_SUCCESS:
            console.log(type)
            return {
                ...state,
                userID: payload.data._id,
                username: payload.data.username,
            }

        default:
            console.log('cached in default:', type)

            return { ...state }
    }
}

export default rootReducer
