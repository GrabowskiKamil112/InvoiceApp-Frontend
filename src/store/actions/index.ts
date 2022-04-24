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
    CHANGE_FILTER = 'CHANGE_FILTER',
    REMOVE_INVOICE_SUCCESS = 'REMOVE_INVOICE_SUCCESS',
    REMOVE_INVOICE_FAILURE = 'REMOVE_INVOICE_FAILURE',
    REMOVE_INVOICE_REQUEST = 'REMOVE_INVOICE_REQUEST',
    ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS',
    ADD_INVOICE_FAILURE = 'ADD_INVOICE_FAILURE',
    ADD_INVOICE_REQUEST = 'ADD_INVOICE_REQUEST',
    FETCH_REQUEST = 'FETCH_REQUEST',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_FAILURE = 'FETCH_FAILURE',
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

        return axios
            .post('http://localhost:9001/api/user/login', {
                username,
                password,
            })
            .then((payload) => {
                console.log('payload', payload)
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
                console.log(payload)

                dispatch({ type: ActionType.REGISTER_SUCCESS, payload })

                return payload.data.username
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.REGISTER_FAILURE })
            })
    }
}

export const changeFilter =
    (filter: string): AppThunk =>
    (dispatch, getState) => {
        console.log(getState())
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
