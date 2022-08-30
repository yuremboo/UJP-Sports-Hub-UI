import React, {useState} from 'react';
import axios from "axios";
import 'react-bootstrap';
import {Form, NavLink} from "react-bootstrap";
import './loginpage.css';

import {
    useNavigate
} from "react-router-dom";

const LoginPage = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isErr, setIsErr] = useState(false);
    const [authToken, setAuthToken] = useState('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbEBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTY2MTQxNDM5MCwiZXhwIjoxNjYyMjM4ODAwfQ.SHSFtRYAg0ucV0VXOVhqLlZNT8GmvW2wpWbStajNsPfdf9xWi9Keiw6UPE1ppYyglROaxktxBf7S13zYmv-hFA')
    function login(e){
        e.preventDefault();
        axios({
            method: "POST",
            url: 'http://localhost:8080/login',
            data: {
                email: email,
                password: password
            }
        })
            .then((response) => {
                // console.log('response data');
                // console.log(response.data);
                console.log('then-response:');
                console.log(response);
                console.log('then-response.headers:');
                console.log(response.headers);
                console.log('response status: ', response.status);
                if (response.status === 200)
                {
                    // setAuthToken(response.headers.authorization);
                    // console.log('token: ', authToken);
                    // console.log("response.headers.authorization:")
                    // console.log(response.Headers.Authorization);
                    // setCookie('jwt_session', response.data.jwt_session, 60);
                    navigate("/");
                }
                else{
                    console.log("Error then!");
                    setIsErr(true);
                }
            })
            .catch((error) => {
                console.log("Catch error!");
                setIsErr(true);
                setError("Incorrect user ID or password. Try again");
                if (error.response) {
                    console.log(error.response);
                    console.log("Catch error response status:");
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }

            })

        // if(isErr){
        //     setError("Incorrect user ID or password. Try again");
        // }
        // else{
        //     setError("");
        //     navigate("/");
        // }

        console.log("email");
        console.log(email);
        console.log("password");
        console.log(password);
    }


    function forgotPassword(){
        navigate("/forgot");
    }

    function registration(){
        navigate("/registration");
    }

    return (
        <div className='log-page'>
            <div className='log-header'>
                <div className='sportshub'>Sports hub</div>
                <div className='header--right'>
                    <div className='no-account'>
                        <NavLink onClick={registration}>Don't have an account?</NavLink>
                    </div>
                    <div className='getstarted'>
                        {/*<Button variant="primary" type="submit">Get started</Button>*/}
                        <button>Get started</button>
                    </div>
                </div>
            </div>

            <div className='log-form-outer'>
                <div className='log-form'>
                    <Form>
                        <h2>Log in to Sports Hub</h2>
                        <div className='log-in-with'>
                            <div className='facebook'></div>
                            <div className='email'></div>
                        </div>

                        <div className='errors'>
                            {error}
                        </div>

                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <div className='form-text'>
                                <Form.Label>Email address</Form.Label>
                            </div>
                            <div className='form-input'>
                                <Form.Control value={email} onChange={e => setEmail(e.target.value)}
                                              type="email" placeholder="Email@gmail.com"/>
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPassword">

                            <div className='log-password'>
                                <div className='form-text'>
                                    <Form.Label>Password</Form.Label>
                                </div>

                                <div className='forgot-password'>
                                    <NavLink onClick={forgotPassword}>Forgot password?</NavLink>
                                </div>
                            </div>

                            <div className='form-input'>
                                <Form.Control value={password} onChange={e => setPassword(e.target.value)}
                                              type="password" placeholder="8+ characters (letters and numbers)"/>
                            </div>
                        </Form.Group>
                        {/*<div className='login-button'>*/}
                        {/*    <Button variant="primary" type="submit" onClick={login}>*/}
                        {/*        LOG IN*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                        <div className='login-button'>
                            <button onClick={login}>
                                LOG IN
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;