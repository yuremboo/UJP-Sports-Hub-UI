import React, { useState } from 'react';
import 'react-bootstrap';
import { Form, NavLink } from "react-bootstrap";
import './registrationpage.css';

import {
    useNavigate
} from "react-router-dom";

const RegistrationPage = () => {

    let navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let isErr = false;

    function register(e) {
        alert("Submit button clicked!");
        e.preventDefault();

        if (isErr) {
            setError("Incorrect credentials. Try again");
        }
        else {
            setError("");
            navigate("/");
        }
        console.log("firstName");
        console.log(firstName);

        console.log("lastName");
        console.log(lastName);

        console.log("email");
        console.log(email);

        console.log("password");
        console.log(password);
    }

    function login() {
        navigate("/login");
    }

    return (
        <div className='reg-page'>
            <div className='reg-header'>
                <div className='sportshub'>
                    <p className='sportshub__paragraph'>Sports Hub</p>
                </div>
                <div className='header--right'>
                    <div className='have_account'>
                        Already have an account?
                    </div>
                    <div className='getstarted'>
                        <button className='getstarted__button' onClick={login}>Log in</button>
                    </div>
                </div>
            </div>

            <div className='reg-form-outer'>
                <div className='reg-form'>
                    <Form>
                        <h2 className='reg-form__header'>Create Account</h2>
                        <div className='reg-with'>
                            <button className='reg-with__facebook'></button>
                            <button className='reg-with__google'></button>
                        </div>

                        <div className='errors'>
                            {error}
                        </div>

                        <p className='reg-form__paragraph'>
                            Or use your email for registration:
                        </p>

                        <div className='reg-creds'>

                            <div className='reg-name'>
                                <Form.Group className="form-group" controlId="formBasicFirstName">
                                    <div className='form-text'>
                                        <Form.Label>First name</Form.Label>
                                    </div>
                                    <div className='form-input'>
                                        <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)}
                                            type="text" placeholder="John" pattern='[A-Za-z]{1,32}' title='Must contain only letters' required/>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className='reg-name'>
                                <Form.Group className="form-group" controlId="formBasicLastName">
                                    <div className='form-text'>
                                        <Form.Label>Last name</Form.Label>
                                    </div>
                                    <div className='form-input'>
                                        <Form.Control value={lastName} onChange={e => setLastName(e.target.value)}
                                            type="text" placeholder="Doe" pattern='[A-Za-z]{1,32}' title='Must contain only letters' required/>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <div className='form-text'>
                                <Form.Label>Email address</Form.Label>
                            </div>
                            <div className='form-input'>
                                <Form.Control value={email} onChange={e => setEmail(e.target.value)}
                                    type="email" placeholder="johndoe@gmail.com" required />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPassword">
                            <div className='form-text'>
                                <Form.Label>Password</Form.Label>
                            </div>

                            <div className='form-input'>
                                <Form.Control value={password} onChange={e => setPassword(e.target.value)}
                                    type='password' placeholder='8+ characters (letters and numbers)'  
                                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                                    title='Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters' 
                                    required/>
                            </div>
                        </Form.Group>

                        <input className='reg-form__button' type='submit' value={'SIGN UP'} >
                            {/* onClick={register} */}
                        </input>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;