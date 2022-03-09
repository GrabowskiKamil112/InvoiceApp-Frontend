const initial = { userID: '123' }

const rootReducer = (state: any = initial, action: any): any => {
    return { ...state }
}

export default rootReducer
