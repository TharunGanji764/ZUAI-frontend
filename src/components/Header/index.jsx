import React from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwt_token");

  const onLogout = () => {
    Cookies.remove("jwt_token");
    console.log("logout clicked");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-2">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            ZUAI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center ms-auto">
              {token === undefined ? (
                <li className="nav-item d-flex flex-lg-row flex-column align-items-center">
                  <Link
                    to="/login"
                    className="links btn btn-outline-primary mb-2 mb-lg-0 me-lg-2"
                  >
                    Login
                  </Link>
                  <Link
                    className="links btn btn-outline-primary mb-2 mb-lg-0 me-lg-2"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item mx-auto mx-lg-0">
                    <Link className="links me-lg-5 " to="/">
                      BlogsList
                    </Link>
                    <button
                      className="links btn btn-outline-primary"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
