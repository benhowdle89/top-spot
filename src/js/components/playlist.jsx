import React from 'react'
import defaultImage from './../../images/tape.jpg'

const colours = ['green', 'red-purple', 'retro', 'blue-light', 'blue', 'dark-red', 'flat-retro', 'teal', 'purple', 'pink', 'yellow', 'orange', 'blue-red', 'gold']

const Playlist = ({ playlist, index }) => {
    const { images = [] } = playlist
    const [large, medium = {}, small] = images
    const randomColour = colours[Math.floor(Math.random() * colours.length)]
    const imageClassName = `playlist-image-${randomColour}`
    return <div className="playlist inline-block">
        <div className={`${imageClassName} playlist-image relative p1`}>
            <img
                src={medium.url || defaultImage}
            />
        </div>

    </div>
}
export default Playlist
