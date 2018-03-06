import React from 'react'
const TopTrack = ({ track }) => <li>{track.track.name} ({track.occurrences})</li>
export default TopTrack
