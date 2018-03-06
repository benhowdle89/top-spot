import React from 'react'
import TopTrack from './top-track'
const TopTracks = ({ tracks }) => {
    return <div>
        <ul>
            {tracks.map(track => <TopTrack track={track} />)}
        </ul>
    </div>
}
export default TopTracks
