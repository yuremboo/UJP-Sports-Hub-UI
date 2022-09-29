import React, {useState} from 'react';
import {Form, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './forgotpassword.css';
import checkEmail from "../../icons/checkEmail.svg";
import axios from "axios";

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState('');
    const [showComponent, setShowComponent] = useState(true);

    function reset(e) {
        e.preventDefault();
        if (email === ""){
            setError('Enter email');
        }
        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(email)) {
            setError("Please enter valid email");
        }
        else{
            setShowComponent(false);
            axios({
                method: "POST",
                url: 'https://ujp-sports-hub.herokuapp.com/api/v1/forgot/password?email='+email,
            })
                .then((response) => {
                    setToken(response.data);
                    if (response.status === 200)
                    {
                        // setCookie('jwt_session', response.data.jwt_session, 60);
                        // console.log('redirect')
                        // navigate("/");
                    }
                })
        }
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
                        Don't have an account?
                    </div>
                    <div className='getstarted'>
                        <button onClick={registration}>Get started</button>
                    </div>
                </div>
            </div>

            {showComponent ?
                <div className='forgot-form-outer'>
                    <div className='forgot-form'>
                        <Form>
                            <h2>Forgot your password?</h2>
                            Enter your email address below and
                            <br/> we’ll get you back on track.

                            <div className='errors'>
                                {error}
                            </div>

                            <Form.Group className="form-group-forgot-password" controlId="formBasicEmail">
                                <div className='form-text'>
                                    <Form.Label>Email address</Form.Label>
                                </div>
                                <div className='form-input-forgot-password'>
                                    <Form.Control value={email} onChange={e => setEmail(e.target.value)}
                                                  type="email" placeholder="Email@gmail.com"/>
                                </div>
                            </Form.Group>

                            <div className='reset-button'>
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
                : <div className='check_email_component'>
                    <div className='check-email-logo'>
                        <img src={checkEmail}/>
                    </div>
                    <h3>Check your email {email}</h3>
                    <p>If there's Sports Hub account linked to this email address, we'll
                        send over instructions to reset your password</p>
                </div>
            }
        </div>
    );
};

export default ForgotPassword;