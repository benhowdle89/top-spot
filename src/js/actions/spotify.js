import fetch from './../etc/fetch'

export function fetchInit() {
    return {
        type: 'FETCH_INIT'
    }
}

export function totalPlaylists(total) {
    return {
        type: 'PLAYLISTS_TOTAL',
        total
    }
}

export function addPlaylists(playlists) {
    return {
        type: 'PLAYLISTS_ADD',
        playlists
    }
}

export function fetchUserPlaylists() {
    return async (dispatch, getState) => {
        dispatch(fetchInit())
        const header = {
            'Authorization': `Bearer ${getState().auth.accessToken}`
        }
        const playlists = await fetch('/me/playlists', {
            headers: {
                ...header
            }
        })
        const { data } = playlists
        dispatch(totalPlaylists(data.total))
        dispatch(addPlaylists(data.items))
    }
}
