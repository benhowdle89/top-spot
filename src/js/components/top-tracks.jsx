import React from 'react'
import TopTrack from './top-track'

const TopTracks = ({ tracks }) => {
    return <div className="top-tracks mt2">
        {tracks.map(track => <TopTrack track={track} />)}
    </div>
}
export default TopTracks
