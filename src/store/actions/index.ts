export const CHANGE_FILTER = 'CHANGE_FILTER'
//export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
//export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const changeFilter = (filter: string) => ({
    type: CHANGE_FILTER,
    payload: { filter },
})
