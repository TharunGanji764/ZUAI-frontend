import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (event) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitSuccess = (msg) => {
    navigate("/login");
    alert(msg);
  };

  const onSubmitFailure = (err) => {
    console.log(err);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const url = "https://zuai-backend-bn33.onrender.com/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    try {
      const msg = await response.json();
      if (response.ok === true) {
        return onSubmitSuccess(msg.message);
      }
      return onSubmitFailure(msg.error);
    } catch (error) {
      console.log("error:" + error);
    }
  };

  return (
    <div className="register-container d-flex flex-column justify-content-center align-items-center">
      <form
        className="register-form d-flex flex-column"
        onSubmit={onSubmitForm}
      >
        <h1 className="text-center">Register</h1>
        <div className="register-input-fields">
          <label htmlFor="email">Email</label>
          <div className="d-flex align-items-center register-inputs-border">
            <input
              type="email"
              id="email"
              placeholder="Enter EmailId"
              name="email"
              value={details.email}
              className="register-user-input form-control"
              onChange={handleOnChange}
              required
            />
            <MdEmail className="register-icon" />
          </div>
        </div>
        <div className="register-input-fields">
          <label htmlFor="username">Username</label>
          <div className="d-flex align-items-center register-inputs-border">
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              name="username"
              value={details.username}
              className="register-user-input form-control"
              onChange={handleOnChange}
              required
            />
            <FaUser className="register-icon" />
          </div>
        </div>
        <div className="register-input-fields">
          <label htmlFor="password">Password</label>
          <div className="d-flex align-items-center register-inputs-border">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={details.password}
              placeholder="Enter Password"
              name="password"
              className="register-user-input form-control"
              onChange={handleOnChange}
              required
            />
            {showPassword ? (
              <FaEye
                className="register-icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className="register-icon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <p className="text">
          Existing User? <Link to="/login">Login Here</Link>
        </p>
        <button type="submit" className="btn btn-info align-self-center w-50">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
