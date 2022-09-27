import "./change-password.style.css";
import CustomInput from "../CustomInput/CustomInput";
import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userLogoutRequest} from "../../redux/auth/auth.actions";

const ChangePassword = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [password, setPassword] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function putPassword(password) {
        const sendPassword = {
            password: password.newPassword,
            oldPassword: password.oldPassword
        };
        console.log("password");
        console.log(password);
        console.log("sendPassword");
        console.log(sendPassword);
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
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    const handleClick = event => {
        event.preventDefault()
        if (password.newPassword === password.confirmPassword &&
            password.oldPassword.length !== 0 &&
            password.newPassword.length !== 0 &&
            password.confirmPassword.length !== 0) {
            putPassword(password)
        } else {
            console.log("The new password and the confirmation password do not match!")
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setPassword({...password, [name]: value});
    };

    return (
        <div>
            <form className={"change-password-form"}>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"Old password"}
                        name={"oldPassword"}
                        value={password.oldPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"New password"}
                        name={"newPassword"}
                        value={password.newPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"Password confirmation"}
                        name={"confirmPassword"}
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