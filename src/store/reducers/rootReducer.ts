import { Invoice } from '../../Types/Invoice'
import { ActionType } from '../actions'

const initialState = {
    filterBy: 'draft',
    username: null,
    userID: null,
    invoices: [],
}
interface State {
    username: string | null
    userID: string | null
    filterBy: string
    invoices: Invoice[]
}

const rootReducer = (state: State = initialState, action: any) => {
    const { type, payload } = action
    console.log(type)

    switch (type) {
        case ActionType.CHANGE_FILTER:
            return {
                ...state,
                filterBy: action.payload.filter,
            }

        case ActionType.ADD_INVOICE_SUCCESS:
            const newInvoice = payload.data
            console.log('newinvoice in reducer', payload)

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
            }

        case ActionType.FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices, ...payload.data],
            }
        case ActionType.UPDATE_INVOICE_SUCCESS:
            console.log(payload)

            return {
                ...state,
                invoices: [...state.invoices],
            }

        case ActionType.REMOVE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices.filter((item) => item._id !== payload.id)],
            }

        case ActionType.REGISTER_SUCCESS:
            return {
                ...state,
                userID: payload.data._id,
                username: payload.data.username,
            }

        case ActionType.LOGOUT:
            return {
                ...state,
                userID: null,
                username: null,
            }

        case ActionType.AUTH_SUCCESS:
            console.log('payload in reducer', payload.data)
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
