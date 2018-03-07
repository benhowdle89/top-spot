import React from 'react'
import Playlist from './playlist'
const Playlists = ({ playlists }) => {
    return <div className="h-100">
        <div className="playlists relative">{playlists.map((playlist, index) => <Playlist key={playlist.id} playlist={playlist} index={index} />)}</div>
    </div>
}
export default Playlists
