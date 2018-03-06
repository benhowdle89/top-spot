import React from 'react'
const Share = ({ url }) => {
    const encoded = {
        url: encodeURIComponent(url),
        text: 'Check out my 🔝 Top Spot playlist on Spotify, created with https://top-spot.stream'
    }
    return <div>
        <a href={url} target="_BLANK">View playlist</a>
        <a href={`https://twitter.com/share?url=${encoded.url}&text=${encoded.text}`}>
            Tweet
        </a>
    </div>
}
export default Share
