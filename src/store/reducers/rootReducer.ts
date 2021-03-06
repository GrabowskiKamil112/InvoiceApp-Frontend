import { Invoice } from '../../Types/Invoice'
import { ActionType } from '../actions'

const initialState = {
    filterBy: 'total',
    username: null,
    userID: sessionStorage.getItem('userID') || null,
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

    switch (type) {
        case ActionType.CHANGE_FILTER:
            return {
                ...state,
                filterBy: action.payload.filter,
            }

        case ActionType.ADD_INVOICE_SUCCESS:
            const newInvoice = payload.data

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
            return {
                ...state,
                invoices: [
                    ...state.invoices.filter((invoice) => invoice._id !== payload.data._id),
                    payload.data,
                ],
            }

        case ActionType.REMOVE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices.filter((item) => item._id !== payload.id)],
            }

        case ActionType.REGISTER_SUCCESS:
            const { data: dataRegister } = payload

            return {
                ...state,
                userID: dataRegister._id,
                username: dataRegister.username,
            }

        case ActionType.LOGOUT:
            return {
                ...state,
                userID: null,
                username: null,
                invoices: [],
            }

        case ActionType.AUTH_SUCCESS:
            const { data: dataAuth } = payload
            const adminInvoices = ('invoices' in dataAuth && [...dataAuth.invoices]) || []

            return {
                ...state,
                userID: dataAuth._id,
                username: dataAuth.username,
                invoices: [...state.invoices, ...adminInvoices],
            }

        default:
            return { ...state }
    }
}

export default rootReducer
