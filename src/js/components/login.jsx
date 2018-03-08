import React from 'react'
import Footer from './footer'
import Button from './button'
const Login = ({ authenticate }) => {
    return <div className="login h-100">
        <div className="splash">
            <h1 className="logo h-100 center">Top Spo<i className="logo-arrow">&uarr;</i></h1>
        </div>
        <div className="deets max-width-1 pt4 mx-auto">
            <div className="intro mb2">
                <h2>Find the tracks you've added most to your playlists</h2>
            </div>
            <Button onClick={authenticate} text="Log in with" />
        </div>
        <Footer />
    </div>
}
export default Login
