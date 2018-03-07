import React from 'react'
import Loader from './loader'

const PlaylistsLoading = ({ message, progress }) => {
    return <div className="playlists-loading px4 py3 flex items-center justify-center flex-column">
        <p className="playlist-loading-text">{message}</p>
        {(progress > 0) && <div className="progress-container mt2">
            <span className="progress-bar" style={{
                width: `${progress}%`
            }}></span>
        </div>}
        {(!progress) && <Loader />}
    </div>
}
export default PlaylistsLoading
