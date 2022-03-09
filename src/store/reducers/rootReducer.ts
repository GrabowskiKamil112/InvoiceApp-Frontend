const initialState = { userID: '1234' }

export interface IRootState {
    [key: string]: string | null
}
const rootReducer = (state: IRootState = initialState, action: any): any => {
    return { ...state }
}

export default rootReducer
