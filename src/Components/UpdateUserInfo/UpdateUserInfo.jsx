import React from 'react';
import "./update-user-info.style.css";
import EllipseAvatar from "../../icons/EllipseAvatar.jpg";
import {ReactComponent as Photo} from "../../icons/photoEditor/Photo.svg";
import CustomInput from "../CustomInput/CustomInput";

const UpdateUserInfo = () => {
    return(
        <div>
            <form className={"update-profile-form"}>
                <div className={"form-photo__container"}>
                    <div className={"form-photo"}>
                        <img className={"ellipse-avatar-img"} src={EllipseAvatar} alt="EllipseAvatar"/>
                        <div className={"red-circle-photo"}>
                            <Photo className={"profile-icon-photo"}/>
                        </div>
                    </div>
                </div>

                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"First name"}
                        name={"first name"}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Last name"}
                        name={"last name"}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Email"}
                        name={"Email"}
                    />
                </div>

                <button className={"update-profile-button"}>
                    Update profile
                </button>
            </form>
        </div>
    )
}

export default UpdateUserInfo;