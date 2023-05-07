import { AppThunk } from './../index'
import axios from 'axios'
import { Invoice, invoiceTypes, ItemsListEntity } from '../../Types/Invoice'
import { axelote } from '../../views/App'
import { AxeloteError,  QueryBuilderResult, AxeloteResponse, AxeloteTransaction} from '@axelote/js'
import { mapData, mapDataToSend, mapInvoiceToStore } from '../../utils/utils'
import { FilterType } from '../../components/Organisms/InvoiceControllerBar'
import { repository } from './axeloteRepository'

export interface Params{type?: FilterType, user_id: number}
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

const API_URL = 'http://localhost:8074'
const TestInvoices = [
    {
        invoiceId: '1234',
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
        invoiceId: '123EG5',
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
        invoiceId: 'E1235',
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
        invoiceId: '125G35',
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
        invoiceId: '124G35',
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
        invoiceId: '12G335',
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
        invoiceId: '12G352',
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
    async (dispatch) => {
        dispatch({ type: ActionType.AUTH_REQUEST })

        if (username == 'admin' && password == 'admin') {
            sessionStorage.setItem('userID', '2211')
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

        }

        return axios
            .post(`${API_URL}/api/auth/login`, {
                username,
                password,
            })
            .then((payload) => {
                sessionStorage.setItem('userID', payload.data._id)

                dispatch({ type: ActionType.AUTH_SUCCESS, payload })
                return true
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: ActionType.AUTH_FAILURE })
                return err
            })
    }

export const registration = (username: string, email: string, password: string): AppThunk => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionType.REGISTER_REQUEST })

        return axios
            .post(`${API_URL}/api/auth/register`, {
                username,
                password,
            })
            .then((payload) => {
                dispatch({ type: ActionType.REGISTER_SUCCESS, payload })

                // const promises = TestInvoices.map((invoice) => {
                //     return axios.post(`${API_URL}/invoice`, {
                //         userID: getState().userID,
                //         ...invoice,
                //     })
                // })

                // Promise.all(promises).then((results) => {
                //     results.forEach((result) => {
                //         dispatch({
                //             type: ActionType.ADD_INVOICE_SUCCESS,
                //             payload: { data: result.data },
                //         })
                //     })
                // })

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

export const changeFilter = (filter: string): AppThunk => (dispatch) => {
    dispatch({ type: ActionType.CHANGE_FILTER, payload: { filter } })
}

export const addItem = (invoiceContent: Invoice): AppThunk => async (dispatch) => {
    dispatch({ type: ActionType.ADD_INVOICE_REQUEST });

    const invoiceData = structuredClone(invoiceContent);
    const invoiceItems: ItemsListEntity[] = mapDataToSend(invoiceData, true);
    const user_id: number = Number(sessionStorage.getItem('userID'));

    const queryInvoice: QueryBuilderResult = repository.get('createInvoice');
    const queryItem: QueryBuilderResult = repository.get('createItem');

    let tx: AxeloteTransaction = axelote.transaction();

    const resultWithId: AxeloteResponse<any> = await tx.returning<any>(queryInvoice, {
        ...invoiceData,
        ...{user_id: user_id}
    });

    if(resultWithId instanceof AxeloteError) {
        tx.rollback;
        return;
    }

    let result: any = null;

    await Promise.all(invoiceItems.map(async (item) => {
        
        if(result instanceof AxeloteError) {
            tx.rollback;
            return;
        }

        result = await tx.void(queryItem, {
            ...item,
            ...{invoice_id: resultWithId[0].invoiceId}
        });
    }))
    
    await tx.commit();

    dispatch({
        type: ActionType.ADD_INVOICE_SUCCESS,
        payload: { data: null },
    });
}
    
export const updateItem = (invoiceContent: Invoice, invoiceId: string, markAsPaid = false, createItems?: boolean): AppThunk => async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_INVOICE_REQUEST })
    
    if(markAsPaid){
        const query = repository.get('markAsPaid');
        await axelote.void(query, {invoice_id: parseInt(invoiceId)});
        dispatch({ type: ActionType.UPDATE_INVOICE_SUCCESS, payload: { invoiceContent } });
        return;
    }

    const invoiceData = structuredClone(invoiceContent);
    const invoiceItems: ItemsListEntity[] = mapDataToSend(invoiceData);

    const invoiceQuery = repository.get('updateInvoice', invoiceData);
    
    let tx: AxeloteTransaction = axelote.transaction();
    
    let result = await tx.void(invoiceQuery, {
        ...invoiceData,
        ...{invoice_id: Number(invoiceId)}
    });
    
    await Promise.all(invoiceItems.map(async (item) => {
        const invoiceUpdateItemsQuery = repository.get('updateItem', item);
        const invoiceCreateItemQuery = repository.get('createItem', item);
        const itemId = Number(item.itemId);
        delete item.itemId;

        if(result instanceof AxeloteError) {
            dispatch({ type: ActionType.UPDATE_INVOICE_FAILURE });
            tx.rollback;
            return;
        }

        result = await tx.void(createItems ? invoiceCreateItemQuery : invoiceUpdateItemsQuery, {
            ...item,
            ...(!createItems && {item_id: itemId}),
            ...(createItems && {invoice_id: Number(invoiceId)})
        });

    }))
    
    await tx.commit();

    dispatch({ type: ActionType.UPDATE_INVOICE_SUCCESS, payload: { invoiceContent } });       
}

export const deleteItem = (invoiceId: string): AppThunk =>
    async (dispatch) => {
        dispatch({ type: ActionType.REMOVE_INVOICE_REQUEST })
        try {
            const query = repository.get('deleteInvoice');
            await axelote.void(query, {invoice_id: Number(invoiceId)});

            dispatch({ type: ActionType.REMOVE_INVOICE_SUCCESS, payload: { id: invoiceId } })
        } catch (err) {
            dispatch({ type: ActionType.REMOVE_INVOICE_FAILURE })
        }
    }

export const fetchInvoices = (): AppThunk => async (dispatch, getState) => {
    dispatch({ type: ActionType.FETCH_INVOICES_REQUEST })

    try{
        await axios.get(`${API_URL}/api/test`);
    }catch(err){
        console.error(err)
    }    

    try {
        const params: Params = {
            user_id: Number(sessionStorage.getItem('userID')),
            type: getState().filterBy,
        }

        let query: QueryBuilderResult = repository.get('getShortInvoices', params);

        const data: AxeloteResponse<Array<Invoice>> = await axelote.returning<Array<Invoice>>(query, params)
    
        if(data instanceof AxeloteError) return;
        
        mapData(data);

        dispatch({ type: ActionType.FETCH_INVOICES_SUCCESS, payload: { data } })
    } catch (err) {
        console.log('fetchInvoices error: ' + err)
        dispatch({ type: ActionType.FETCH_INVOICES_FAILURE })
    }
}

export const fetchInvoiceDetails = async (invoiceId: string): Promise<Invoice> => {
    
    try {
        let invoiceDetails: QueryBuilderResult = repository.get('getInvoiceDetails');
        let items: QueryBuilderResult = repository.get('getInvoiceItems');

        const invoiceData: AxeloteResponse<Invoice> = await axelote.returningOne<Invoice>(invoiceDetails, {invoice_id: parseInt(invoiceId)});
        const itemsData: AxeloteResponse<Array<ItemsListEntity>> = await axelote.returning<Array<ItemsListEntity>>(items, {invoice_id: parseInt(invoiceId)});
        
        if(invoiceData instanceof AxeloteError || itemsData instanceof AxeloteError) return {} as Invoice;
        
        mapData(invoiceData, itemsData);
        
        return invoiceData
    } catch (err) {
        return {} as Invoice;
    }

}
