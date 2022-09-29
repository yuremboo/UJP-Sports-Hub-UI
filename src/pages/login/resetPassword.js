import React, {useState} from 'react';
import {Form/*, NavLink*/} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import './resetpassword.css';
import axios from "axios";

const ResetPassword = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [successfully, setSuccessfully] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const {token} = useParams();

    function reset(e) {
        e.preventDefault();
        if(newPassword === newPassword2){
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
                setError("Password must contain at least 8 characters (letters and numbers)");
            }
            else{
                setError('')
                axios({
                    method: "POST",
                    url: 'https://ujp-sports-hub.herokuapp.com/api/v1/forgot/password/newpassword',
                    data: {
                        password: newPassword,
                        token: token
                    }
                })
                    .then((response) => {
                        if (response.status === 200)
                        {
                            setSuccessfully("Your password has been updated");
                        }
                    })
            }
        }
        else{
            setError("Passwords don't match");
        }

    }

    function registration(){
        navigate("/registration");
    }

    function toLogIn(){
        navigate("/login");
    }

    return (
        <div className='reset-password-page'>
            <div className='reset-header'>
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

            <div className='reset-form-outer'>
                <div className='reset-form'>
                    <Form>
                        <h2>Please enter your new password</h2>
                        <div className='errors'>
                            {error}
                        </div>
                        <div className='successfully'>
                            {successfully}
                        </div>

                        <Form.Group className="form-group-reset-password" controlId="formBasicEmail">
                            <div className='form-text-reset-password'>
                                <Form.Label>NEW PASSWORD</Form.Label>
                            </div>
                            <div className='form-input-reset-password'>
                                <Form.Control value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                              type="password" placeholder="new password"/>
                            </div>

                            <div className='form-text-reset-password'>
                                <Form.Label>PASSWORD</Form.Label>
                            </div>
                            <div className='form-input-reset-password'>
                                <Form.Control value={newPassword2} onChange={e => setNewPassword2(e.target.value)}
                                              type="password" placeholder="confirm password"/>
                            </div>
                        </Form.Group>

                        <div className='reset-button'>
                            <button onClick={reset}>
                                SET NEW PASSWORD
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

export default ResetPassword;