const initialState = {
    playlists: [],
    fetching: false,
    fetched: false,
    fetchingTracks: false,
    topTracks: [],
    trackFetchingProgress: 0,
    userID: null,
    createdUrl: null,
    creatingPlaylist: false
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
                topTracks: action.tracks,
                fetchingTracks: false
            }
        case 'TRACKS_FETCH':
            return {
                ...state,
                fetchingTracks: true
            }
        case 'TRACK_FETCH_PROGRESS':
            const percent = Math.ceil((action.index / state.playlists.length) * 100)
            return {
                ...state,
                trackFetchingProgress: percent
            }
        case 'FETCH_INIT':
            return {
                ...state,
                fetching: true
            }
        case 'SET_USER_ID':
            return {
                ...state,
                userID: action.userID
            }
        case 'CREATED_PLAYLIST':
            return {
                ...state,
                createdUrl: action.url,
                creatingPlaylist: false
            }
        case 'CREATING_PLAYLIST':
            return {
                ...state,
                creatingPlaylist: true
            }
        case 'FETCHED':
            return {
                ...state,
                fetching: false,
                fetched: true
            }
        case 'SPOTIFY_ERROR':
            return {
                ...state,
                fetching: false,
                fetchingTracks: false
            }
        default:
            return {
                ...initialState,
                ...state
            }
    }
}
