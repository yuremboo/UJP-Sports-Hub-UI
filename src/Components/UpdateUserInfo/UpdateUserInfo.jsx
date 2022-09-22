import "./update-user-info.style.css";
import EllipseAvatar from "../../icons/EllipseAvatar.jpg";
import {ReactComponent as Photo} from "../../icons/photoEditor/Photo.svg";
import CustomInput from "../CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";

const UpdateUserInfo = ({props, globalStore}) => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [profile, setProfile] = useState({});

    useEffect(() => {
        getProfile();
    }, []);

    function getProfile() {
        console.log("function getProfile");
        console.log("token: ", AuthToken["jwt"]);
        axios.get("http://localhost:8080/api/v1/profile", {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("getProfile");
                console.log(response.data);
                setProfile(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function putProfile(profile) {
        const sendProfile = {
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            photo: profile.photo
        };
        console.log('token: ', AuthToken['jwt']);
        axios.put("http://localhost:8080/api/v1/profile", sendProfile, {
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
        putProfile(profile)
        // localStorage.setItem("user", JSON.stringify({...AuthToken,
        //     firstName:profile.firstName,
        //     lastName:profile.lastName,
        //     photo:profile.photo
        // }))
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setProfile({...profile, [name]: value});
    };

    return (
        <div>
            <form className={"update-profile-form"}>
                <div className={"form-photo__container"}>
                    <div className={"form-photo"}>
                        <img className={"ellipse-avatar-img"} src={EllipseAvatar} alt="EllipseAvatar"/>
                        <label className={"red-circle-photo"}>
                            <input type="file"/>
                            <Photo className={"profile-icon-photo"}/>
                        </label>
                    </div>
                </div>

                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"First name"}
                        name={"firstName"}
                        value={profile.firstName}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Last name"}
                        name={"lastName"}
                        value={profile.lastName}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    <CustomInput
                        type="text"
                        label={"Email"}
                        name={"email"}
                        value={profile.email}
                        handleChange={handleChange}
                    />
                </div>

                <button className={"update-profile-button"} onClick={handleClick}>
                    Update profile
                </button>
            </form>
        </div>
    );
};

export default UpdateUserInfo;