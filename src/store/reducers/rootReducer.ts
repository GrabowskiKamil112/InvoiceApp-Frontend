import { Invoice } from '../../Types/Invoice'
import {
     ADD_INVOICE_REQUEST, ADD_INVOICE_SUCCESS, ADD_INVOICE_FAILURE,
     REMOVE_INVOICE_REQUEST, REMOVE_INVOICE_SUCCESS, REMOVE_INVOICE_FAILURE
} from '../actions'
import { CHANGE_FILTER } from '../actions'

const testItems = [
    { name: 'somasdename', quantity: '234', price: '234' },
    { name: 'nafghjme' },
    { name: 'somename', quantity: '234' },
]

const initialState = {
    filterBy: 'total',
    userID: '1234',
    invoices: [
        {
            type: 'paid', // draft, pending, paid
            id: '2zf8dj90dp',
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
            userID: 'asdf',
            created: 'asdf',
        },
        {
            type: 'pending', // draft, pending, paid
            id: '2zf8dj90dp',
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'aaaaaaaaa',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '08 Mar 2922',
            description: 'asdf',
            items_list: [testItems],
            userID: 'asdf',
            created: 'asdf',
        },
        {
            type: 'pending', // draft, pending, paid
            id: '2zf8dj90dp',
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'aaaaaaaaa',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '08 Mar 2922',
            description: 'asdf',
            items_list: [testItems],
            userID: 'asdf',
            created: 'asdf',
        },
        {
            type: 'draft', // draft, pending, paid
            id: '2zf8dj90dp',
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'aaaaaaaaa',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '08 Mar 2922',
            description: 'asdf',
            items_list: [testItems],
            userID: 'asdf',
            created: 'asdf',
        },
        {
            type: 'paid', // draft, pending, paid
            id: '2zf8dj90dp',
            from: {
                street: 'asdf',
                city: 'asdf',
                post_code: 'asdf',
                country: 'asdf',
            },
            to: {
                name: 'aaaaaaaaa',
                email: 'fghjvbngh',
                city: 'fghjvbngh',
                post_code: 'dfgxcvbxc',
                country: 'dfgxcvbxc',
            },
            invoice_date: 'dfgxcvbxc',
            payment_term: '08 Mar 2922',
            description: 'asdf',
            items_list: [testItems],
            userID: 'asdf',
            created: 'asdf',
        },
    ],
}

const rootReducer = (state:InvoiceType = initialState, action: any) => {
    const {type, payload} = action
    switch (type) {
        case CHANGE_FILTER:
            return {
                ...state,
                filterBy: action.payload.filter,
            }
            
        case ADD_INVOICE_REQUEST:
            const newInvoice = payload.invoice
                return {
                    ...state,
                    [state.invoices.push(newInvoice)]
                }

        case REMOVE_INVOICE_REQUEST:
            const newInvoices = state.invoices.filter((invoice)=> (invoice.id !== payload.id))
                return {
                    ...state,
                    [newInvoices]
                }
        
        default:
            return { ...state }
    }
}

export default rootReducer
