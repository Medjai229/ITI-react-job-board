import * as React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/Logo 1.png";

export default function NavBar() {
  let token = localStorage.getItem("UserToken");
  if (!token) {
    token = sessionStorage.getItem("UserToken");
  }

  return (
    <>
      <div style={{ backgroundColor: "#4640DE" }}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* Logo on the left side */}
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Logo" style={{ width: "150px" }} />
            </Link>

            {/* Navbar links on the right */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav" style={{}}>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-job" className="nav-link text-white">
                    Post Job
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/CompanyHome" className="nav-link text-white">
                    Companies
                  </Link>
                </li>
              </ul>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {token ? (
                    <>
                      <li className="nav-item">
                        <Link to="/profile" className="nav-link text-white">
                          Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/login"
                          className="nav-link btn btn-link text-white"
                          onClick={() => {
                            localStorage.removeItem("UserToken");
                          }}
                        >
                          Log Out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link text-white">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/register" className="nav-link text-white">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
