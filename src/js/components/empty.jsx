import React from 'react'

const Empty = ({ message }) => {
    return <div className="empty max-width-2 mx-auto flex items-center justify-center flex-column h-100">
        <h2>{message}</h2>
        <a href="/">Start over?</a>
    </div>
}
export default Empty
