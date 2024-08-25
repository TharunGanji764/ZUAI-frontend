import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitSuccess = (token) => {
    Cookies.set("jwt_token", token, { expires: 30 });
    navigate("/");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const url = "https://zuai-backend-bn33.onrender.com/user/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        return onSubmitSuccess(data.jwt);
      }
      return alert(data.error);
    } catch (error) {
      console.log(error);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center">
      <form className="login-form d-flex flex-column" onSubmit={onSubmitForm}>
        <h1 className="text-center">Login</h1>
        <div className="input-fields">
          <label htmlFor="username">Username</label>
          <div className="d-flex align-items-center inputs-border">
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              name="username"
              value={details.username}
              className="user-input form-control"
              onChange={handleOnChange}
              required
            />
            <FaUser className="icon" />
          </div>
        </div>
        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <div className="d-flex align-items-center inputs-border">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={details.password}
              placeholder="Enter Password"
              name="password"
              className="user-input form-control"
              onChange={handleOnChange}
              required
            />
            {showPassword ? (
              <FaEye className="icon" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash
                className="icon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <p className="text">
          Don't Have An Account <Link to="/register">Register Now</Link>
        </p>
        <button type="submit" className="btn btn-info align-self-center w-50">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
