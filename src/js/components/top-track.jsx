import React from 'react'
import defaultImage from './../../images/tape.jpg'

const colours = ['green', 'red-purple', 'retro', 'blue-light', 'blue', 'dark-red', 'flat-retro', 'teal', 'purple', 'pink', 'yellow', 'orange', 'blue-red', 'gold']

const TopTrack = ({ track: trackObj }) => {
    const { track, occurrences } = trackObj
    const s = occurrences > 1 ? 's' : ''
    const { artists = [], name, album } = track
    const { images } = album
    const [large, medium = {}, small] = images
    const [mainArtist = {}] = artists
    const randomColour = colours[Math.floor(Math.random() * colours.length)]
    const imageClassName = `playlist-image-${randomColour}`
    return <div className="top-track flex relative justify-center items-center" key={track.id}>
        <div className={`${imageClassName} playlist-image relative p1 inline-block`}>
            <img src={medium.url || defaultImage} alt="" />
            <div className="track-meta p2">
                <p className="track-name">{name}</p>
                <p className="artist-name">{mainArtist.name}</p>
                <p className="track-occurrences mt2">added {occurrences} time{s}</p>
            </div>
        </div>
    </div>
}
export default TopTrack
