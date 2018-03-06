import React from 'react'
import spotifyLogoImage from './../../images/spotify-logo.png'
const Login = ({ authenticate }) => {
    return <div className="login max-width-2 mx-auto flex justify-center items-center flex-column h-100">
        <h1 className="logo">Top <span>Spot</span></h1>
        <h2></h2>
        <div className="login-button px2 py1 flex items-center justify-center" onClick={authenticate}>
            <span className="mr1">Log in with</span>
            <img className="spotify-logo" src={spotifyLogoImage} alt="Spotify Logo" />
        </div>
    </div>
}
export default Login
