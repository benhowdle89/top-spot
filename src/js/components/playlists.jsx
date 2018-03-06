import React from 'react'
import Playlist from './playlist'
const Playlists = ({ progress, playlists }) => {
    return <div>
        {(progress > 0) && <p>Analysing your tracks {progress}%</p>}
        <div className="playlists">{playlists.map(playlist => <Playlist playlist={playlist} />)}</div>
    </div>
}
export default Playlists
