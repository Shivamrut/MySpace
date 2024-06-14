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
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}  `} aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}  `} to="/about">
                                    About
                                </Link>
                            </li> */}
                            {/* <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Another action
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Something else here
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" aria-disabled="true">
                                    Disabled
                                </Link>
                            </li>*/}
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