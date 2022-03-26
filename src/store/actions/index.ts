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
    FETCH_SUCCES = 'FETCH_SUCCES',
    FETCH_FAILURE = 'FETCH_FAILURE',
}
export type Action = IAddItem | IRemoveItem | IChangeCompletion | IRemoveCompleted

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
