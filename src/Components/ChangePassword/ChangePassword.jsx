import React from 'react';
import "./change-password.style.css";
import CustomInput from "../CustomInput/CustomInput";

const ChangePassword = () => {
    return(
        <div>
            <form className={"change-password-form"}>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Old password"}
                        name={"old password"}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"New password"}
                        name={"new password"}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Password confirmation"}
                        name={"password confirmation"}
                    />
                </div>

                <button className={"change-password-button"}>
                    Change password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;