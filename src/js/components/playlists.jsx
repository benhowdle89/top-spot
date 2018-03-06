import React from 'react'
import Playlist from './playlist'
const Playlists = ({ progress, playlists }) => {
    return <div className="h-100 flex items-center justify-center">
        {/* {(progress > 0) && <p>Analysing your tracks {progress}%</p>} */}
        <div className="playlists relative">{playlists.map((playlist, index) => <Playlist playlist={playlist} index={index} />)}</div>
    </div>
}
export default Playlists
