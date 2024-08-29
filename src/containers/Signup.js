import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import axios from "axios";
import googleLogo from "../logos/google.svg";
import facebookLogo from "../logos/facebook.svg";
import "./Signup.css";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (accountCreated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form onSubmit={onSubmit}>
          <h3>Create your Account</h3>
          <div className="login_option">
            <div className="option">
              <button
                className="btn btn-white mt-3"
                onClick={continueWithGoogle}
              >
                <img
                  src={googleLogo}
                  alt="Google"
                  style={{ width: "34px", height: "34px" }}
                />
              </button>
            </div>
            <div className="option">
              <button
                className="btn btn-white mt-3"
                onClick={continueWithFacebook}
              >
                <img
                  src={facebookLogo}
                  alt="Apple"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </div>
          </div>
          <p className="separator">
            <span>or</span>
          </p>
          <div className="input_box">
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="re_password"
              name="re_password"
              placeholder="Re Password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p className="sign_up">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
