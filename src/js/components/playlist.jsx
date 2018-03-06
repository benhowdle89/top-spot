import React from 'react'
import defaultImage from './../../images/tape.jpg'
const Playlist = ({ playlist }) => {
    const { images = [] } = playlist
    const [large, medium = {}, small] = images
    return <div className="playlist">
        <img className="playlist-image" src={medium.url || defaultImage} alt="" />
        <div className="playlist-name-panel p2">
            <p className="playlist-name center">
                {playlist.name}
            </p>
        </div>
    </div>
}
export default Playlist
