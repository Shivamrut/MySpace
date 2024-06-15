import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        INoteBook
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {localStorage.getItem("token") && 
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}  `} aria-current="page" to="/">
                                    {localStorage.getItem("username")?localStorage.getItem("username"):"Home"}
                                </Link>
                            </li>}
                            
                        </ul>
                        {!localStorage.getItem("token") ? <>
                            <Link className="btn btn-outline-success m-1 " to="/login">
                                Login

                            </Link>
                            <Link className="btn btn-outline-success m-1 " to="/signup">
                                Sign Up

                            </Link>
                        </> : <Link className="btn btn-outline-success m-1 " onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/login")
                        }}>
                            Logout

                        </Link>}


                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar