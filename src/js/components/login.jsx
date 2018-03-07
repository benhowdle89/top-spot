import React from 'react'
import Button from './button'
const Login = ({ authenticate }) => {
    return <div className="login max-width-2 mx-auto flex justify-center items-center flex-column h-100">
        <h1 className="logo">Top <span>Spot</span></h1>
        <h2></h2>
        <Button onClick={authenticate} text="Log in with" />
    </div>
}
export default Login
