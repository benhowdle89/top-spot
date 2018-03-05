import fetch from 'axios'
import { resolve } from 'path';

const sleep = async amount => new Promise(resolve => setTimeout(resolve, amount))

export function fetchInit() {
    return {
        type: 'FETCH_INIT'
    }
}

export function addPlaylists(playlists) {
    return {
        type: 'PLAYLISTS_ADD',
        playlists
    }
}


export function addTracks(tracks, id) {
    return {
        type: 'TRACKS_ADD',
        tracks,
        id
    }
}

const fetchCurrentUser = async accessToken => {
    const header = {
        'Authorization': `Bearer ${accessToken}`
    }
    const user = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            ...header
        }
    })
    const { data } = user
    return data.id
}

const fetchTracksForPlaylist = async (url, accessToken) => {
    const header = {
        'Authorization': `Bearer ${accessToken}`
    }
    const tracks = await fetch(url, {
        headers: {
            ...header
        }
    })
    const { data } = tracks
    return data.items
}

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

export function findTopXTracks() {
    return (dispatch, getState) => {
        const { playlists } = getState().spotify
        const occurrences = playlists.reduce((accum, current) => {
            const tracks = current.tracks.map(t => t.track.id)
            tracks.forEach(t => {
                accum[t] = (accum[t] !== undefined) ? accum[t] + 1 : 0
            })
            return accum
        }, {})
        const ordered = Object.keys(occurrences).sort((a, b) => {
            return occurrences[b] - occurrences[a]
        }).slice(0, 10)
        const allTracks = flatten(playlists.map(p => p.tracks))
        const tracks = ordered.map(id => {
            return allTracks.find(t => t.track.id === id)
        })
        dispatch({
            type: 'TOP_TRACKS',
            tracks
        })
    }
}

export function fetchUserPlaylists() {
    return async (dispatch, getState) => {
        const { accessToken } = getState().auth
        dispatch(fetchInit())
        const userID = await fetchCurrentUser(accessToken)
        const fetchNextPlaylists = async url => {
            const header = {
                'Authorization': `Bearer ${accessToken}`
            }
            const playlists = await fetch(url, {
                headers: {
                    ...header
                }
            })
            const { data } = playlists
            dispatch(addPlaylists(data.items.filter(playlist => playlist.owner.id === userID)))
            if (data.next) {
                await sleep(750)
                await fetchNextPlaylists(data.next)
            }
        }

        const data = await fetchNextPlaylists("https://api.spotify.com/v1/me/playlists", )
        const playlists = getState().spotify.playlists
        for (let playlist of playlists) {
            const tracks = await fetchTracksForPlaylist(playlist.tracks.href, accessToken)
            await sleep(750)
            dispatch(addTracks(tracks, playlist.id))
        }
    }
}
