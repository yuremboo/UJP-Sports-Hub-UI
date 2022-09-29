import React from 'react';
import "./update-user-info.style.css";
import defaultUserImage from "../../icons/defaultUser.jpg";
import {ReactComponent as Photo} from "../../icons/photoEditor/Photo.svg";
import CustomInput from "../CustomInput/CustomInput";
import {useEffect, useState} from "react";
import axios from "axios";
import {userLogoutRequest} from "../../redux/auth/auth.actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addPhotoOfTheDay} from "../../redux/admin-photo-of-the-day/admin-photo.action";

const UpdateUserInfo = ({props, globalStore}) => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        photo: ""
    });
    const [errors, setErrors] = useState("");
    const [imageURL, setImageURL] = useState([]);
    const [image, setImage] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (image.length < 1) {
            setImageURL([])
            return
        }
        setImageURL((window.URL || window.webkitURL).createObjectURL(image[0]))

    }, [image])

    function getProfile() {
        console.log("function getProfile");
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

    async function putProfile(profile) {
        console.log("postImage");
        let result = false;
        if (image.length !== 0) {
            result = await addPhotoOfTheDay(image[0], "false")
        }
        console.log("putProfile");
        const sendProfile = {
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            photo: (result ? result.imageUrl : profile.photo)
        };
        axios.put("http://localhost:8080/api/v1/profile", sendProfile, {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((data) => {
                if (result) {
                    const user = JSON.parse(localStorage.getItem("user"));
                    localStorage.setItem("user", JSON.stringify({
                        ...user,
                        photo: result.imageUrl
                    }))
                }
                navigate(0);
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
        if (isValid()) {
            putProfile(profile)
            localStorage.setItem("user", JSON.stringify({
                ...AuthToken,
                firstName: profile.firstName,
                lastName: profile.lastName,
            }))
            if (profile.email !== JSON.parse(localStorage.getItem("user")).email) {
                dispatch(userLogoutRequest())
                navigate("/login");
            }
        } else {
            console.log(errors);
        }
    }

    const validateInput = data => {
        let errors = {}
        if (!/^[A-Za-z]{3,32}$/.test(data.firstName)) {
            errors.firstName = "Name must contain only letters"
        }
        if (!/^[A-Za-z]{3,32}$/.test(data.lastName)) {
            errors.lastName = "Surname must contain only letters"
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(data.email)) {
            errors.email = "Please enter valid email"
        }
        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(profile)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setProfile({...profile, [name]: value});
        setErrors({...errors, [name]: ''})
    };

    const handleImageChange = (e) => {
        setErrors({...errors, picture: ''})
        setImage([...e.target.files])
    }

    return (
        <div>
            <form className={"update-profile-form"}>
                <div className={"form-photo__container"}>
                    <div className={"form-photo"}>
                        <img className={"ellipse-avatar-img"}
                             src={imageURL.length !== 0 ? imageURL : profile.photo ? ("http://localhost:8080/api/v1/image/" + profile.photo) : defaultUserImage}
                             alt="EllipseAvatar"/>
                        <label className={"red-circle-photo"}>
                            <input type={"file"} accept="image/*" onChange={handleImageChange}/>
                            <Photo className={"profile-icon-photo"}/>
                        </label>
                    </div>
                </div>

                <div className={"custom-input"}>
                    {errors.firstName && <p className='photo__error'>
                        {errors.firstName}
                    </p>}
                    <CustomInput
                        type="text"
                        label={"First name"}
                        name={"firstName"}
                        placeholder={"Enter first name"}
                        value={profile.firstName}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    {errors.lastName && <p className='photo__error'>
                        {errors.lastName}
                    </p>}
                    <CustomInput
                        type="text"
                        label={"Last name"}
                        name={"lastName"}
                        placeholder={"Enter last name"}
                        value={profile.lastName}
                        handleChange={handleChange}
                    />
                </div>
                <div className={"custom-input"}>
                    {errors.email && <p className='photo__error'>
                        {errors.email}
                    </p>}
                    <CustomInput
                        type="text"
                        label={"Email"}
                        name={"email"}
                        placeholder={"Enter email"}
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