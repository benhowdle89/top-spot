const initialState = {
    accessToken: null
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATED':
            const { accessToken } = action
            return {
                ...state,
                accessToken
            }
        case 'SPOTIFY_ERROR':
            return {
                ...state,
                accessToken: null
            }
        default:
            return {
                ...initialState,
                ...state
            }
    }
}
