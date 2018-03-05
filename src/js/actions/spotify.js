import fetch from 'axios'
import { resolve } from 'path';

const sleep = async amount => new Promise(resolve => setTimeout(resolve, amount))

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

        const fetchNextPlaylists = async url => {
            const header = {
                'Authorization': `Bearer ${getState().auth.accessToken}`
            }
            const playlists = await fetch(url, {
                headers: {
                    ...header
                }
            })
            const { data } = playlists
            dispatch(totalPlaylists(data.total))
            dispatch(addPlaylists(data.items))
            if (data.next) {
                await sleep(1000)
                await fetchNextPlaylists(data.next)
            }
        }

        const data = await fetchNextPlaylists("https://api.spotify.com/v1/me/playlists", )

    }
}
