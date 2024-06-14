import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {

    const context = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register } = context
    const navigate = useNavigate();
    const handleRegister = async () => {
        const res = await register({username, email, password })
        console.log(res);
        if (res) navigate("/")
    }

    return (
        <>
            <h1>Register</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                    />
                </div>
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

                <div  className="btn btn-primary" onClick={handleRegister}>
                    Submit
                </div>
            </form>
        </>
    )
}

export default Register