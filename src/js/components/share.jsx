import React from 'react'
import Button from './button'
const Share = ({ url }) => {
    const encoded = {
        url: encodeURIComponent(url),
        text: 'Check out my Top Spot playlist on Spotify, created with https://top-spot.stream'
    }
    return <div className="share max-width-3 mx-auto flex justify-center items-center h-100">
        <h1 className="logo"><a href="/">Top <span>Spo</span><i className="logo-arrow">&uarr;</i></a></h1>
        <Button href={url} text="View playlist" />
        <Button href={`https://twitter.com/share?url=${encoded.url}&text=${encoded.text}`} text="Share your playlist" twitter={true} />
    </div>
}
export default Share
