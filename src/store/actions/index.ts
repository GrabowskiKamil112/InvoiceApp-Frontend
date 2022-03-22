export const CHANGE_FILTER = 'CHANGE_FILTER'
export const ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS';
export const ADD_INVOICE_FAILURE = 'ADD_INVOICE_FAILURE';
export const ADD_INVOICE_REQUEST = 'ADD_INVOICE_REQUEST';
export const REMOVE_INVOICE_SUCCESS = 'REMOVE_INVOICE_SUCCESS';
export const REMOVE_INVOICE_FAILURE = 'REMOVE_INVOICE_FAILURE';
export const REMOVE_INVOICE_REQUEST = 'REMOVE_INVOICE_REQUEST';

export const changeFilter = (filter: string) => ({
    type: CHANGE_FILTER,
    payload: { filter },
})

export const removeWithID = (id) => (dispatch) => ({

})
