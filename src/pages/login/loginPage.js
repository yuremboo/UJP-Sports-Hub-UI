import React, { useEffect, useState } from "react";

import "react-bootstrap";
import { Form, NavLink } from "react-bootstrap";

import "./loginpage.css";

import { useNavigate } from "react-router-dom";
import {
  authFailureReset,
  userSignInRequest
} from "../../redux/auth/auth.actions";
import { connect } from "react-redux";

import { ReactComponent as Google } from "../../icons/google.svg";
import { ReactComponent as Facebook } from "../../icons/facebook_clone.svg";

const SignIn = ({
                  signInRequest,
                  resetErrorMessage,

                  auth: { isLoading, errorMessage, userObject }
                }) => {
  const navigate = useNavigate();
  useEffect(
    () => {
      if (errorMessage) {
        resetErrorMessage();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  useEffect(
    () => {
      if (userObject) {
        navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log("!");
    event.preventDefault();
    const result = await signInRequest(user);
    if (result) {
      setUser({
        email: "",
        password: ""
      });
      navigate("/");
    }
  };

  function forgotPassword() {
    navigate("/forgot");
  }

  function registration() {
    navigate("/registration");
  }

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="sportshub">
          <p className="sportshub__paragraph">Sports Hub</p>
        </div>
        <div className="header--right">
          <div className="no-account">
            Don't have an account?
          </div>
          <div className="getstarted">
            <button onClick={registration}>Get started</button>
          </div>
        </div>
      </div>

      <div className="login-form-outer">
        <div className="login-form">
          <Form onSubmit={handleSubmit}>
            <h2 className="login-form__headline">Log in to Sports Hub</h2>
            <div className="login-with">
              <button className="login-with__facebook">
                <Facebook className="login-with__svg" width="100%" height="100%"></Facebook>
              </button>
              <button className="login-with__google">
                <Google className="login-with__svg" width="100%" height="100%"></Google>
              </button>
            </div>

            {errorMessage && <p className="login-form__error">
              {errorMessage}
            </p>}

            <Form.Group className="form-group" controlId="formBasicEmail">
              <div className="form-text">
                <Form.Label>Email address</Form.Label>
              </div>
              <div className="form-input">
                <Form.Control
                  value={user.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email@gmail.com"
                  name="email"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">

              <div className="login-password">
                <div className="form-text">
                  <Form.Label>Password</Form.Label>
                </div>

                <div className="forgot-password">
                  <NavLink onClick={forgotPassword}>Forgot password?</NavLink>
                </div>
              </div>

              <div className="form-input">
                <Form.Control
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="8+ characters (letters and numbers)"
                  name="password"
                  required
                />
              </div>
            </Form.Group>
            <button className="login-form__button" disabled={isLoading}>
              LOG IN
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInRequest: (data) => dispatch(userSignInRequest(data)),
  resetErrorMessage: () => dispatch(authFailureReset())
});
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);