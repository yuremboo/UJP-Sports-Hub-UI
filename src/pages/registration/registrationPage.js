import React, { useState } from 'react';
import 'react-bootstrap';
import { Form, NavLink } from "react-bootstrap";
import './registrationpage.css';

import {
    useNavigate
} from "react-router-dom";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const RegistrationPage = () => {

    let navigate = useNavigate();

    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState("");


    function login() {
        navigate("/login");
    }

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    const validateInput = data => {
        let errors = {}

        if(!/^[A-Za-z]{1,32}$/.test(data.firstName)){
            errors.firstName = "Name and surname must contain only letters"
        }

        if( !/^[A-Za-z]{1,32}$/.test(data.lastName)){
             errors.lastName = "Name and surname must contain only letters"
        }

        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(data.email)){
            errors.email = "Please enter valid email"
        }

        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)){
            errors.password = "Password must contain at least 8 characters (letters and numbers)"
        }

        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    const isValid = () => {
        const { errors, isValid } = validateInput(user)
        if (!isValid) {
            setErrors(errors)
        }

        return isValid
    }


    function register(e) {
        e.preventDefault();

        if (isValid()) {
            console.log("log");
            // const result = await signInRequest(user)
            // if (result) {
            //   setUser(initialState)
            //   setErrors({})
            //   navigate('/')
            // }
        }

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
                    <Form onSubmit={register}>
                        <h2 className='reg-form__header'>Create Account</h2>
                        <div className='reg-with'>
                            <button className='reg-with__facebook'></button>
                            <button className='reg-with__google'></button>
                        </div>

                        <p className='reg-form__paragraph'>
                            Or use your email for registration:
                        </p>

                        <div>
                            {(errors.firstName || errors.lastName) && <p className='reg-form__error'>
                                { errors.firstName ? errors.firstName: (errors.lastName ? errors.lastName: '') } 
                            </p>}
                        </div>

                        <div className='reg-creds'>
                            <div className='reg-name'>
                                <Form.Group className="form-group" controlId="formBasicFirstName">
                                    <div className='form-text'>
                                        <Form.Label>First name</Form.Label>
                                    </div>
                                    <div className='form-input'>
                                        <Form.Control value={user.firstName} onChange={handleChange} isInvalid={errors.firstName ? true:false}
                                            type="text" placeholder="John" required name='firstName' />
                                    </div>
                                </Form.Group>
                            </div>

                            <div className='reg-name'>
                                <Form.Group className="form-group" controlId="formBasicLastName">
                                    <div className='form-text'>
                                        <Form.Label>Last name</Form.Label>
                                    </div>
                                    <div className='form-input'>
                                        <Form.Control value={user.lastName} onChange={handleChange} isInvalid={errors.lastName ? true:false}
                                            type="text" placeholder="Doe" required name='lastName' />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <div className='form-text'>
                                <Form.Label>Email address</Form.Label>
                            </div>
                            <div>
                                {errors.email && <p className='reg-form__error'>
                                    {errors.email}
                                </p>}
                            </div>
                            <div className='form-input'>
                                <Form.Control value={user.email} onChange={handleChange} isInvalid={errors.email ? true:false}
                                    type="text" placeholder="johndoe@gmail.com" required name='email' />
                            </div>
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPassword">
                            <div className='form-text'>
                                <Form.Label>Password</Form.Label>
                            </div>
                            <div>
                                {errors.password && <p className='reg-form__error'>
                                    {errors.password}
                                </p>}
                            </div>
                            <div className='form-input'>
                                <Form.Control value={user.password} onChange={handleChange} isInvalid={errors.password ? true:false}
                                    type='password' placeholder='8+ characters (letters and numbers)' required name='password' />
                            </div>
                        </Form.Group>

                        <button className='reg-form__button' type='submit'>
                            SIGN UP
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;