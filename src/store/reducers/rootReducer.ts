const initialState = {
    userID: '1234',
    invoices: [
        {
            BillTo: 'kamil',
            sentTo: 'me',
        },
        {
            BillTo: 'kamdsfgdfgil',
            sentTo: 'medfgdfg',
        },
    ],
}

const rootReducer = (state = initialState, action: any) => {
    return { ...state }
}

export default rootReducer
