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

export function saveUser(userID) {
    return {
        type: 'SET_USER_ID',
        userID
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

const createPlaylist = async (accessToken, userID) => {
    const header = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    const playlist = await fetch.post(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        name: 'Top Spot'
    }, {
            headers: {
                ...header
            }
        })
    const { data } = playlist
    return {
        id: data.id,
        url: data.external_urls.spotify
    }
}

const addTracksToPlaylist = async (accessToken, userID, playlistID, tracks) => {
    const header = {
        'Authorization': `Bearer ${accessToken}`
    }
    await fetch.post(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        uris: tracks
    }, {
            headers: {
                ...header
            }
        })
}

export function addPlaylist() {
    return async (dispatch, getState) => {
        const { accessToken } = getState().auth
        const { userID, topTracks } = getState().spotify
        const { id: playlistID, url } = await createPlaylist(accessToken, userID)
        const tracks = topTracks.map(t => t.track.uri)
        await addTracksToPlaylist(accessToken, userID, playlistID, tracks)
        dispatch({
            type: 'CREATED_PLAYLIST',
            url
        })
    }
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
            const tracks = current.tracks.map(t => t.track && t.track.id)
            tracks.forEach(t => {
                accum[t] = (accum[t] !== undefined) ? accum[t] + 1 : 0
            })
            return accum
        }, {})
        const ordered = Object.keys(occurrences).sort((a, b) => {
            return occurrences[b] - occurrences[a]
        }).slice(0, 50)
        const allTracks = flatten(playlists.map(p => p.tracks))
        const tracks = ordered.map(id => {
            return allTracks.find(t => t.track.id === id)
        }).filter(Boolean)
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
        dispatch(saveUser(userID))
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
                // await sleep(750)
                // await fetchNextPlaylists(data.next)
            }
        }

        const data = await fetchNextPlaylists("https://api.spotify.com/v1/me/playlists?limit=25")
        dispatch({
            type: 'FETCHED'
        })
        const playlists = getState().spotify.playlists
        for (let playlist of playlists) {
            const tracks = await fetchTracksForPlaylist(playlist.tracks.href, accessToken)
            await sleep(750)
            dispatch(addTracks(tracks, playlist.id))
        }
        dispatch(findTopXTracks())
    }
}
