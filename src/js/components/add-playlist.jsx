import React from 'react'
import Button from './button'
import Loader from './loader'
const AddPlaylist = ({ addPlaylist, creatingPlaylist }) => {
    if (creatingPlaylist) return <Loader />
    return <div>
        <Button onClick={addPlaylist} text="Create this playlist" />
    </div>
}
export default AddPlaylist
