import React from 'react'
const TopTrack = ({ track: trackObj }) => {
    const { track, occurrences } = trackObj
    const { artists = [], name } = track
    const [mainArtist = {}] = artists
    return <div className="top-track">
        <p>{name} - {mainArtist.name}</p>
    </div>
}
export default TopTrack
