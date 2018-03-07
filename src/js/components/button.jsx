import React from 'react'
import spotifyLogoImage from './../../images/spotify-logo.png'
const Button = ({ text, onClick }) => <div className="spotify-button px2 py1 items-center justify-center" onClick={onClick}>
    <span className="mr1">{text}</span>
    <img className="spotify-logo" src={spotifyLogoImage} alt="Spotify Logo" />
</div>
export default Button
