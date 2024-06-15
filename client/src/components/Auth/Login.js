import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from '../../context/auth/AuthContext'

function Login(props) {
    const { showAlert } = props
    const context = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = context
    const navigate = useNavigate();
    const handleLogin = async (target) => {
        target.preventDefault()
        const res = await login({ email, password })
        if (res.success) navigate("/")
        else showAlert("danger", res.error[0])
    }
    return (
        <>
            <div className="d-flex justify-content-center flex-column align-items-center mt-5" >

                <h2 className='my-3 text-align-center'>Login</h2>
                <form  onSubmit={handleLogin}>
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
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
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
                            onChange={(e) => { setPassword(e.target.value) }}
                            minLength={5}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login