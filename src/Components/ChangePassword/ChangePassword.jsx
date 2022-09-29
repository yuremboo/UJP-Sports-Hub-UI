import React from 'react';
import "./change-password.style.css";
import CustomInput from "../CustomInput/CustomInput";
import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userLogoutRequest} from "../../redux/auth/auth.actions";

const ChangePassword = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function putPassword(password) {
        console.log("putPassword");
        const sendPassword = {
            password: password.newPassword,
            oldPassword: password.oldPassword
        };
        axios.put("http://localhost:8080/api/v1/password", sendPassword, {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then(() => {
                dispatch(userLogoutRequest())
                navigate("/login");
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(prevState => {return {...prevState, oldPassword:"The password does not match the old password"}})
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    const handleClick = event => {
        event.preventDefault()
            if (isValid()) {
                putPassword(password)
            } else {
                console.log(errors);
            }
    }

    const validateInput = data => {
        let errors = {}
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.newPassword)) {
            errors.newPassword = "New password must contain at least 8 characters (letters and numbers)"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.oldPassword)) {
            errors.oldPassword = "Password must contain at least 8 characters (letters and numbers)"
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.confirmPassword)) {
            errors.confirmPassword = "Confirm password must contain at least 8 characters (letters and numbers)"
        }
        if (data.newPassword !== data.confirmPassword) {
            errors.newPassword = "The new password must match the confirmation password"
            errors.confirmPassword = "The confirmation password must match the new password"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(password)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }


    const handleChange = event => {
        const {name, value} = event.target;
        setPassword({...password, [name]: value});
        setErrors({...errors, [name]: ''})
    };

    return (
        <div>
            <form className={"change-password-form"}>
                <div className={"custom-input"}>
                    {errors.oldPassword && <p className='photo__error'>
                        {errors.oldPassword}
                    </p>}
                    <CustomInput
                        type="password"
                        label={"Old password"}
                        name={"oldPassword"}
                        placeholder={"Enter your old password here"}
                        value={password.oldPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    {errors.newPassword && <p className='photo__error'>
                        {errors.newPassword}
                    </p>}
                    <CustomInput
                        type="password"
                        label={"New password"}
                        name={"newPassword"}
                        placeholder={"8+ characters (letters and numbers)"}
                        value={password.newPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    {errors.confirmPassword && <p className='photo__error'>
                        {errors.confirmPassword}
                    </p>}
                    <CustomInput
                        type="password"
                        label={"Password confirmation"}
                        name={"confirmPassword"}
                        placeholder={"Enter new password again"}
                        value={password.confirmPassword}
                        handleChange={handleChange}
                    />
                </div>

                <button className={"change-password-button"} onClick={handleClick}>
                    Change password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;