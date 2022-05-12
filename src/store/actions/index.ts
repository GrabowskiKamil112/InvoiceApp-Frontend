import { AppThunk } from './../index'
import axios from 'axios'
import { Invoice, invoiceTypes } from '../../Types/Invoice'

export interface IAddItem {
    type: 'ADD_ITEM'
    payload: Invoice
}
export interface IRemoveItem {
    type: 'REMOVE_ITEM'
    payload: string
}
export interface IRemoveCompleted {
    type: 'REMOVE_COMPLETED'
}
export interface IChangeCompletion {
    type: 'CHANGE_COMPLETION'
    payload: string
}

export enum ActionType {
    LOGOUT = 'LOGOUT',
    CHANGE_FILTER = 'CHANGE_FILTER',
    REMOVE_INVOICE_SUCCESS = 'REMOVE_INVOICE_SUCCESS',
    REMOVE_INVOICE_FAILURE = 'REMOVE_INVOICE_FAILURE',
    REMOVE_INVOICE_REQUEST = 'REMOVE_INVOICE_REQUEST',
    ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS',
    ADD_INVOICE_FAILURE = 'ADD_INVOICE_FAILURE',
    ADD_INVOICE_REQUEST = 'ADD_INVOICE_REQUEST',
    FETCH_INVOICES_REQUEST = 'FETCH_INVOICES_REQUEST',
    FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS',
    FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE',
    UPDATE_INVOICE_REQUEST = 'UPDATE_INVOICE_REQUEST',
    UPDATE_INVOICE_SUCCESS = 'UPDATE_INVOICE_SUCCESS',
    UPDATE_INVOICE_FAILURE = 'UPDATE_INVOICE_FAILURE',
    AUTH_REQUEST = 'AUTH_REQUEST',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILURE = 'AUTH_FAILURE',
    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',
}

export type Action = IAddItem | IRemoveItem | IChangeCompletion | IRemoveCompleted

const API_URL = 'https://anotherinvoiceapp-backend.herokuapp.com/api'
const TestInvoices = [
    {
        _id: '1234',
        type: 'pending' as invoiceTypes,
        from: {
            street: 'Piotrowska 7A',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'USA',
        },
        to: {
            name: 'John Marston',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Jawiszowice',
            street: 'Wyszyńskiego 44F',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-04-19',
        items_list: [
            {
                name: 'milk',
                quantity: '46.4',
                price: '95.9',
            },
        ],
    },
    {
        _id: '123EG5',
        type: 'paid' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'Arthur Morgan',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '29',
                price: '6.5',
            },
        ],
    },
    {
        _id: 'E1235',
        type: 'draft' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'Jan Kowalski',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '9',
                price: '6',
            },
        ],
    },
    {
        _id: '125G35',
        type: 'draft' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'Lidl',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '55',
                price: '1.50',
            },
        ],
    },
    {
        _id: '124G35',
        type: 'paid' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'Kamil Grabowski',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '29',
                price: '5',
            },
        ],
    },
    {
        _id: '12G335',
        type: 'paid' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'Asdf-BsdfB-CsdfC',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '29',
                price: '9.9',
            },
        ],
    },
    {
        _id: '12G352',
        type: 'pending' as invoiceTypes,
        from: {
            street: 'Borelowskiego 6B',
            city: 'Jawiszowice',
            post_code: '32-626',
            country: 'Polska',
        },
        to: {
            name: 'AAA-BBB-CCC',
            email: 'grabowskikamil@vp.pl',
            country: 'Poland',
            post_code: '32-626',
            city: 'Oświęcim',
            street: 'Wyszyńskiego',
        },
        description: 'description about invoice details',
        invoice_date: '2022-05-01',
        payment_term: '2022-05-15',
        items_list: [
            {
                name: 'bread',
                quantity: '29',
                price: '6.79',
            },
        ],
    },
]

export const authenticate =
    (username: string, password: string): AppThunk =>
    (dispatch) => {
        dispatch({ type: ActionType.AUTH_REQUEST })

        if (username == 'admin' && password == 'admin') {
            sessionStorage.setItem('userID', '1234')
            dispatch({
                type: ActionType.AUTH_SUCCESS,
                payload: {
                    data: {
                        _id: 1234,
                        username: 'admin',
                        invoices: [...TestInvoices],
                    },
                },
            })

            return
        }

        return axios
            .post(`${API_URL}/user/login`, {
                username,
                password,
            })
            .then((payload) => {
                sessionStorage.setItem('userID', payload.data._id)

                dispatch({ type: ActionType.AUTH_SUCCESS, payload })
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.AUTH_FAILURE })
            })
    }

export const registration = (username: string, email: string, password: string): AppThunk => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionType.REGISTER_REQUEST })

        return axios
            .post(`${API_URL}/user/register`, {
                username,
                password,
            })
            .then((payload) => {
                dispatch({ type: ActionType.REGISTER_SUCCESS, payload })

                const promises = TestInvoices.map((invoice) => {
                    return axios.post(`${API_URL}/invoice`, {
                        userID: getState().userID,
                        ...invoice,
                    })
                })

                Promise.all(promises).then((results) => {
                    results.forEach((result) => {
                        dispatch({
                            type: ActionType.ADD_INVOICE_SUCCESS,
                            payload: { data: result.data },
                        })
                    })
                })

                return payload.data.username
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.REGISTER_FAILURE })
            })
    }
}

export const logout = (): AppThunk => (dispatch, getState) => {
    sessionStorage.removeItem('userID')
    dispatch({ type: ActionType.LOGOUT })
}

export const changeFilter =
    (filter: string): AppThunk =>
    (dispatch) => {
        dispatch({ type: ActionType.CHANGE_FILTER, payload: { filter } })
    }

export const addItem =
    (invoiceContent: Invoice): AppThunk =>
    async (dispatch, getState) => {
        dispatch({ type: ActionType.ADD_INVOICE_REQUEST })

        try {
            const { data } = await axios.post(`${API_URL}/invoice`, {
                userID: getState().userID,
                ...invoiceContent,
            })

            dispatch({
                type: ActionType.ADD_INVOICE_SUCCESS,
                payload: { data },
            })
        } catch (err) {
            console.log('error:' + err)
            dispatch({ type: ActionType.ADD_INVOICE_FAILURE })
        }
    }
export const updateItem =
    (invoiceContent: Invoice, invoiceId: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch({ type: ActionType.UPDATE_INVOICE_REQUEST })
        try {
            const { data } = await axios.put(`${API_URL}/invoice/${invoiceId}`, {
                userID: getState().userID,
                ...invoiceContent,
            })

            dispatch({ type: ActionType.UPDATE_INVOICE_SUCCESS, payload: { data } })
        } catch (err) {
            console.log('error:' + err)
            dispatch({ type: ActionType.UPDATE_INVOICE_FAILURE })
        }
    }

export const deleteItem =
    (invoiceId: string): AppThunk =>
    async (dispatch) => {
        dispatch({ type: ActionType.REMOVE_INVOICE_REQUEST })
        try {
            await axios.delete(`${API_URL}/invoice/${invoiceId}`)

            dispatch({ type: ActionType.REMOVE_INVOICE_SUCCESS, payload: { id: invoiceId } })
        } catch (err) {
            console.log('error:' + err)
            dispatch({ type: ActionType.REMOVE_INVOICE_FAILURE })
        }
    }

export const fetchInvoices = (): AppThunk => async (dispatch, getState) => {
    dispatch({ type: ActionType.FETCH_INVOICES_REQUEST })

    try {
        const { data } = await axios.get(`${API_URL}/invoices`, {
            params: { userID: getState().userID || sessionStorage.getItem('userID') },
        })
        dispatch({ type: ActionType.FETCH_INVOICES_SUCCESS, payload: { data } })
    } catch (err) {
        console.log('error:' + err)
        dispatch({ type: ActionType.FETCH_INVOICES_FAILURE })
    }
}
