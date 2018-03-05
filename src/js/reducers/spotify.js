const initialState = {
    playlists: [],
    fetching: false,
    topTracks: []
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'PLAYLISTS_ADD':
            const { playlists } = action
            return {
                ...state,
                playlists: [
                    ...state.playlists,
                    ...playlists
                ]
            }
        case 'TRACKS_ADD':
            const { tracks, id } = action
            return {
                ...state,
                playlists: [
                    ...state.playlists.map(playlist => {
                        if (playlist.id !== id) return playlist
                        return {
                            ...playlist,
                            tracks
                        }
                    })
                ]
            }
        case 'TOP_TRACKS':
            return {
                ...state,
                topTracks: action.tracks
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
