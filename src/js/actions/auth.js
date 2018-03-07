export function authenticate() {
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
    const SPOTIFY_REDIRECT_URI = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)
    const scopes = 'playlist-modify-private playlist-read-private playlist-read-collaborative'
    const redirect = `https://accounts.spotify.com/authorize?response_type=token&client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${scopes}`
    window.location.href = redirect
}

export function authenticated(accessToken) {
    return {
        type: 'AUTHENTICATED',
        accessToken
    }
}
