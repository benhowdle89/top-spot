const initialState = {
    accessToken: null,
    user: null
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATED':
            const { accessToken } = action
            return {
                ...state,
                accessToken
            }
        default:
            return {
                ...initialState,
                ...state
            }
    }
}
