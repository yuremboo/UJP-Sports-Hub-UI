import React, {useState} from 'react';
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
    let isErr = false;

    function login(e){
        e.preventDefault();

        if(isErr){
            setError("Incorrect user ID or password. Try again");
        }
        else{
            setError("");
            navigate("/");
        }

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