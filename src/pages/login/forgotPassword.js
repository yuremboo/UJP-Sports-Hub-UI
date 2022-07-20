import React, {useState} from 'react';
import {Form, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './forgotpassword.css';

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    function reset(e) {
        e.preventDefault();
        // navigate("/");
    }

    function toLogIn(){
        navigate("/login");
    }

    function registration(){
        navigate("/registration");
    }

    return (
        <div className='forgot-page'>
            <div className='forgot-header'>
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

            <div className='forgot-form-outer'>
                <div className='forgot-form'>
                    <Form>
                        <h2>Forgot your password?</h2>
                        Enter your email address below and
                        <br/> we’ll get you back on track.

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

                        <div className='reset-button'>
                            {/*<Button variant="primary" type="submit" onClick={reset}>*/}
                            {/*    REQUEST RESET LINK*/}
                            {/*</Button>*/}
                            <button onClick={reset}>
                                REQUEST RESET LINK
                            </button>
                        </div>

                        <div className='back-to-login-button'>
                            <button onClick={toLogIn}>
                                Back to login
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;