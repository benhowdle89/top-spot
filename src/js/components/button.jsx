import React from 'react'
import spotifyLogoImage from './../../images/spotify-logo.png'
import twitterLogoImage from './../../images/twitter-logo.png'
const Button = ({ text, onClick, href, twitter = false }) => <div className="spotify-button px2 py1" onClick={!href ? onClick : () => { }}>
    {!!href && (
        <a href={href} target="_BLANK" className="flex items-center justify-center">
            <span className="mr1">{text}</span>
            <img className={`${twitter ? 'twitter' : 'spotify'}-logo`} src={twitter ? twitterLogoImage : spotifyLogoImage} alt="Spotify Logo" />
        </a>
    )}
    {!href && (
        <span className="flex items-center justify-center">
            <span className="mr1">{text}</span>
            <img className='spotify-logo' src={spotifyLogoImage} alt="Spotify Logo" />
        </span>
    )}
</div>
export default Button
