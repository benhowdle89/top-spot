import React from 'react'
import Button from './button'
const Login = ({ authenticate }) => {
    return <div className="login max-width-3 mx-auto flex justify-center items-center h-100">
        <div className="intro">
            <h1 className="logo mb1">Top <span>Spot</span></h1>
            <h2>Find the tracks you've added most to your playlists</h2>
        </div>
        <Button onClick={authenticate} text="Log in with" />
    </div>
}
export default Login
