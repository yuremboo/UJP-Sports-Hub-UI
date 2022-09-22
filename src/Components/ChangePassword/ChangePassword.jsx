import "./change-password.style.css";
import CustomInput from "../CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";

const ChangePassword = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        getPassword();
    }, []);

    function postPassword() {
        console.log("function postPassword");
        axios.post("http://localhost:8080/api/v1/old-password", password.oldPassword, {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("postPassword");
                console.log(data);
                console.log(response.data);
                setPassword(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function getPassword() {
        console.log("function getPassword");
        console.log("token: ", AuthToken["jwt"]);
        axios.get("http://localhost:8080/api/v1/password", {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("getPassword");
                console.log(data);
                console.log(response.data);
                setPassword(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function putPassword(password) {
        const sendPassword = {
            password: password.newPassword,
        };
        console.log('token: ', AuthToken['jwt']);
        axios.put("http://localhost:8080/api/v1/password", sendPassword, {
            headers: {
                authorization: AuthToken["jwt"]
            }
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
        if (postPassword()){
            if (password.newPassword === password.confirmPassword){
                putPassword(password)
            }
            else{
                console.log("The new password and the confirmation password do not match!")
            }
        }
        else{
            console.log("The old password was entered incorrectly!")
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setPassword({...password, [name]: value});
    };

    return(
        <div>
            <form className={"change-password-form"}>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"Old password"}
                        name={"old password"}
                        value={password.oldPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"New password"}
                        name={"new password"}
                        value={password.newPassword}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="password"
                        label={"Password confirmation"}
                        name={"password confirmation"}
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