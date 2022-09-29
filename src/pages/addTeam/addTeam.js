import {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../Components/CustomInput/CustomInput";
//import "./add-article.style.css";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
import Eye from "../../icons/Eye.svg"
import CustomTextarea from "../../Components/CustomTextArea/CustomTextarea";
import CustomPictureInput from "../../Components/CustomPictureInput/CustomPictureInput";
import SaveCancelChanges from "../../Components/SaveCancelChanges/SaveCancelChanges";
import {MDBSwitch} from 'mdb-react-ui-kit';
import CancellationPopup from "../../Components/CancellationPopup/CancellationPopup";
import Header from "../../Components/Header";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import {useNavigate, useParams} from "react-router-dom";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";
import React from "react";

const AddTeam = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const [errors, setErrors] = useState("");
    const [isCancel, setIsCancel] = useState(false)
    const [categories, setCategories] = useState([]);
    const [team, setTeam] = useState({
        name: "",
        description: "",
        logo: "",
        alt:"",
        location: "",
        picture: "",
        category: ""
    })
    useEffect(() => {
        getCategory();
    }, []);

    function getCategory() {
        console.log("function getCategory");
        return axios.get("http://localhost:8080/api/v1/categories", {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("getCategories");
                console.log(response.data);
                setCategories(data);

            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function postTeam(team) {
        if (isValid()) {
            const sendTeam = {
                name: team.name,
                description: team.description,
                logo: "6",
                location: team.location,
                picture: "team.picture",
                alt:"team.alt",
                categoryId: team.category
            };
            axios.post("http://localhost:8080/api/v1/teams", sendTeam, {
                headers: {
                    authorization: AuthToken["jwt"]
                }
            })
                .then(() => {
                    navigate(-1);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                        console.log("error.response.status: ", error.response.status);
                    }
                });
        } else {
            console.log(errors);
        }
    }

    const validateInput = data => {
        let errors = {}

        console.log(data)
        if (data.category === "") {
            errors.category = "Category cannot be empty"
        }
        if (data.name === "") {
            errors.name = "Name cannot be empty"
        }
        if (data.location === "") {
            errors.location = "Location cannot be empty"
        }
        if (data.description === "") {
            errors.description = "Description cannot be empty"
        }

        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(team)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleChange = event => {
        const {name, value} = event.target
        setTeam({...team, [name]: value})
        setErrors({...errors, [name]: ''})
    }

    return (
        <div className={"edit-article"}>
            <header className={"edit-article-header"}>
                <div className="n_all_articles_admin__header__outer_fixed">
                    <div className="n_all_articles_admin__header">
                        <div className="sportshub">Sports hub</div>
                        <div className="n_all_articles_admin__right_header">
                            <button className="n_accountSwitcher__button">
                                <img src={accountSwitcher} width="30%" height="30%"/>
                            </button>
                            <div className="n_admin__profile_section">
                                <ProfileSection/>
                            </div>
                        </div>
                    </div>
                    <div className={"save-cancel-component"}>
                        <SaveCancelChanges
                            handleSubmit={() => postTeam(team)}
                            handleCancel={() => setIsCancel(true)}
                            saveProp={"Add team"}
                            check={true}
                        />
                    </div>
                    <div className={"horizontal-scroll-menu-component"}>
                        <HorizontalScrollMenu/>
                    </div>
                </div>
            </header>
            {isCancel && <CancellationPopup
                handleCancel={() => setIsCancel(false)}
                handleSubmit={() => navigate(-1)}
            />}
            <NavBarIcons className={"nav-bar-icons"}/>

            <form className="form-container">
                {errors.location && <p className='photo__error'>
                    {errors.location}
                </p>}
                <CustomInput
                    type="text"
                    label={"select location"}
                    name={"location"}
                    placeholder={"location"}
                    value={team.location}
                    handleChange={handleChange}
                />
                <CustomSelect
                    label={"Category"}
                    name={"category"}
                    placeholder={"Not selected"}
                    selected={team.category}
                    enumeration={categories}
                    handleChange={handleChange}
                />
                {errors.title && <p className='photo__error'>
                    {errors.title}
                </p>}
                <CustomInput
                    type="text"
                    label={"Team"}
                    name={"name"}
                    placeholder={"team name"}
                    value={team.name}
                    handleChange={handleChange}
                />
                {errors.description && <p className='photo__error'>
                    {errors.description}
                </p>}
                <CustomInput
                    type="text"
                    label={"Description"}
                    name={"description"}
                    placeholder={"team description"}
                    value={team.description}
                    handleChange={handleChange}
                />

                <CustomPictureInput
                    label={"Picture.*"}
                    name={"picture"}
                    value={team.picture}
                    handleChange={handleChange}
                />
            </form>
        </div>);
}

export default AddTeam;
