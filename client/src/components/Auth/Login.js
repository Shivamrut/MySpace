import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/AuthContext'

function Login() {
    const context = useContext(AuthContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {login} = context
    const handleLogin = ()=>{
        login({email,password})
    }
    return (
        <><h1>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>

                <div type="submit" className="btn btn-primary" onClick={handleLogin}>
                    Submit
                </div>
            </form>
        </>
    )
}

export default Login