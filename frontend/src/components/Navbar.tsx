import React, { FC, useContext, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { NoteContext } from "../context/notes/NoteContext";

const Navbar: FC = () => {
  const location = useLocation();
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("Navbar must be used within a NoteProvider");
  }
  const { tag, setTag, tags, setNotes } = context;
  const handleTag = (e: MouseEvent<HTMLAnchorElement>) => {
    setTag(e.currentTarget.textContent || "ALL");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTag("ALL");
    setNotes([]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MySpace<i className="fa-solid fa-house mx-2"></i>
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
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }  `}
                    aria-current="page"
                    to="/"
                  >
                    {localStorage.getItem("username")
                      ? localStorage.getItem("username")
                      : "Home"}
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {"Tag: " + tag}
                  </Link>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link
                        key="ALL"
                        className="dropdown-item"
                        onClick={() => {
                          setTag("ALL");
                        }}
                        to="/"
                      >
                        ALL
                      </Link>
                    </li>
                    {tags.map((i: string) => {
                      return (
                        <li>
                          <Link
                            key={i}
                            className="dropdown-item"
                            onClick={handleTag}
                            to="/"
                          >
                            {i}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn btn-outline-success m-1 " to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success m-1 " to="/signup">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                className="btn btn-outline-success m-1 "
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
