import {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../Components/CustomInput/CustomInput";
import "./add-team.css";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
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
import * as PropTypes from "prop-types";
import {
    MDBContainer,
} from "mdb-react-ui-kit";

function Iframe(props) {
    return (
        <div>
            <iframe src={props.src} height={props.height} width={props.width} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"/>
        </div>
    )
}

Iframe.propTypes = {
    allowFullScreen: PropTypes.string,
    referrerPolicy: PropTypes.string,
    src: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.string,
    loading: PropTypes.string,
    height: PropTypes.string
};
const AddTeam = () => {
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const [errors, setErrors] = useState("");
    const [isCancel, setIsCancel] = useState(false)
    const [categories, setCategories] = useState([]);
    const [listTeams, setListTeams] = useState([]);
    const [team, setTeam] = useState({
        name: "",
        description: "",
        logo: "",
        alt: "",
        location: "",
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
                return axios.get("http://localhost:8080/api/v1/teams", {
                    headers: {
                        authorization: AuthToken["jwt"]
                    }
                })
            })
            .then((response) => {
                const data = response.data;
                console.log("getTeams");
                console.log(response.data);
                setListTeams(data);
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
                logo: "team.logo",
                location: team.location,
                alt: "team.alt",
                categoryId: team.category
            };
            axios.post("http://localhost:8080/api/v1/teams", sendTeam, {
                headers: {
                    authorization: AuthToken["jwt"]
                }
            })
                .then(() => {
                    navigate(0);
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
            <div className="map-and-form">
                <div className="team-map">
                    <Iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831452.9885363156!2d24.700940810601555!3d49.75163345678396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473007fcdf1dbefd%3A0x68d7724e21006816!2sZolochiv%2C%20Lviv%20Oblast%2C%2080700!5e0!3m2!1sen!2sua!4v1664444004002!5m2!1sen!2sua"
                        width="600" height="450"></Iframe>

                </div>
                <form className="form-container-add-team">
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
                        value={team.logo}
                        handleChange={handleChange}
                    />
                </form>

            </div>

            <div className="list_of-team">
                <table>
                    <tr>
                        <th>TEAMS</th>
                        <th>LOCATION</th>
                        <th>DATA ADDED</th>
                        <th>GATEGORY</th>
                    </tr>
                    {listTeams.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.location}</td>
                                <td>{val.createDateTime}</td>
                                <td>{val.category.name}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>);
}

export default AddTeam;
