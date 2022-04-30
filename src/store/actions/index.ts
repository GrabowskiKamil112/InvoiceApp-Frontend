import { AppThunk } from './../index'
import axios from 'axios'
import { Invoice } from '../../Types/Invoice'

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
                    },
                },
            })
        }

        return axios
            .post('http://localhost:9001/api/user/login', {
                username,
                password,
            })
            .then((payload) => {
                console.log('payload', payload)

                sessionStorage.setItem('userID', payload.data._id)

                dispatch({ type: ActionType.AUTH_SUCCESS, payload })
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.AUTH_FAILURE })
            })
    }

export const registration = (username: string, email: string, password: string): AppThunk => {
    return async (dispatch) => {
        dispatch({ type: ActionType.REGISTER_REQUEST })

        return axios
            .post('http://localhost:9001/api/user/register', {
                username,
                password,
            })
            .then((payload) => {
                console.log(payload, 'email:', email)

                dispatch({ type: ActionType.REGISTER_SUCCESS, payload })

                return payload.data.username
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.REGISTER_FAILURE })
            })
    }
}

export const logout = (): AppThunk => (dispatch, getState) => {
    console.log(getState)
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
            const { data } = await axios.post(`http://localhost:9001/api/invoice`, {
                userID: getState().userID,
                ...invoiceContent,
            })
            console.log('data', data)

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
            const { data } = await axios.put(`http://localhost:9001/api/invoice/${invoiceId}`, {
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
            await axios.delete(`http://localhost:9001/api/invoice/${invoiceId}`)

            dispatch({ type: ActionType.REMOVE_INVOICE_SUCCESS, payload: { id: invoiceId } })
        } catch (err) {
            console.log('error:' + err)
            dispatch({ type: ActionType.REMOVE_INVOICE_FAILURE })
        }
    }

export const fetchInvoices = (): AppThunk => async (dispatch, getState) => {
    dispatch({ type: ActionType.FETCH_INVOICES_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:9001/api/invoices`, {
            params: { userID: getState().userID || sessionStorage.getItem('userID') },
        })
        console.log('fetched invpoices:', data)
        dispatch({ type: ActionType.FETCH_INVOICES_SUCCESS, payload: { data } })
    } catch (err) {
        console.log('error:' + err)
        dispatch({ type: ActionType.FETCH_INVOICES_FAILURE })
    }
}
