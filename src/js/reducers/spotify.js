const initialState = {
    total: 0,
    playlists: [],
    fetching: false
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'PLAYLISTS_TOTAL':
            const { total } = action
            return {
                ...state,
                total
            }
        case 'PLAYLISTS_ADD':
            const { playlists } = action
            return {
                ...state,
                playlists: [
                    ...state.playlists,
                    ...playlists
                ]
            }
        case 'FETCH_INIT':
            return {
                ...state,
                fetching: true
            }
        default:
            return {
                ...initialState,
                ...state
            }
    }
}
