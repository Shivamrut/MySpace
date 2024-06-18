import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register(props) {
    const { showAlert } = props
    const context = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register } = context
    const navigate = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault()
        const res = await register({ username, email, password })
        if (res.success) navigate("/")
        else showAlert("danger", res.error[0])
    }

    return (
        <>
            <div className="d-flex justify-content-center flex-column align-items-center mt-5" >
                <h2 className='my-3 text-align-center'>Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            minLength={5}
                            required
                            autoComplete='off'
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
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            autoComplete='off'
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
                            autoComplete='off'
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

export default Register