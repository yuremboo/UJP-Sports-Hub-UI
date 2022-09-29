import {useEffect, useState} from "react";
import axios from "axios";
import CustomInput from "../../Components/CustomInput/CustomInput";
import "./add-article.style.css";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
import CustomTextarea from "../../Components/CustomTextArea/CustomTextarea";
import CustomPictureInput from "../../Components/CustomPictureInput/CustomPictureInput";
import SaveCancelChanges from "../../Components/SaveCancelChanges/SaveCancelChanges";
import {MDBSwitch} from 'mdb-react-ui-kit';
import CancellationPopup from "../../Components/CancellationPopup/CancellationPopup";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import {useNavigate, useParams} from "react-router-dom";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";
import React from "react";
import {addPhotoOfTheDay} from "../../redux/admin-photo-of-the-day/admin-photo.action";

const AddArticle = ({props, globalStore}) => {
    const {title} = useParams();
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const [errors, setErrors] = useState("");
    const [isCancel, setIsCancel] = useState(false)
    const [teams, setTeams] = useState([]);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState([]);
    const [article, setArticle] = useState({
        id: "",
        title: "",
        text: "",
        caption: "",
        alt: "",
        location: "",
        picture: "",
        isActive: false,
        commentsActive: "",
        createDateTime: null,
        updateDateTime: null,
        category: "",
        team: "",
        selectedByAdmin: false
    })
    useEffect(() => {
        getTeamAndCategory();
    }, []);

    function getTeamAndCategory() {
        console.log("function getTeamAndCategory");
        return axios.get("https://ujp-sports-hub.herokuapp.com/api/v1/categories", {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("getCategories");
                console.log(response.data);
                setCategories(data);
                return axios.get("https://ujp-sports-hub.herokuapp.com/api/v1/teams", {
                    headers: {
                        authorization: AuthToken["jwt"]
                    }
                })
            })
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    async function postArticle(article) {
        const result = await addPhotoOfTheDay(image[0], "false")
        if (isValid() && result) {
            console.log("postArticle");
            const sendArticle = {
                title: article.title,
                text: article.text,
                caption: article.caption,
                alt: article.alt,
                location: article.location,
                picture: result.imageUrl,
                isActive: true,
                commentsActive: article.commentsActive,
                updateDateTime: article.updateDateTime,
                categoryId: article.category,
                teamId: article.team,
                selectedByAdmin: article.selectedByAdmin
            };
            axios.post("https://ujp-sports-hub.herokuapp.com/api/v1/admin/articles", sendArticle, {
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

        if (data.category === "") {
            errors.category = "Category cannot be empty"
        }
        if (data.team === "") {
            errors.team = "Team cannot be empty"
        }
        if (data.location === "") {
            errors.location = "Location cannot be empty"
        }
        if (data.alt === "") {
            errors.alt = "Alt cannot be empty"
        }
        if (data.title === "") {
            errors.title = "Title cannot be empty"
        }
        if (data.caption === "") {
            errors.caption = "Caption cannot be empty"
        }
        if (data.text === "") {
            errors.text = "Text cannot be empty"
        }

        return {
            errors,
            isValid: JSON.stringify(errors) === '{}'
        }
    }

    const isValid = () => {
        const {errors, isValid} = validateInput(article)
        if (!isValid) {
            setErrors(errors)
        }
        return isValid
    }

    const handleChange = event => {
        const {name, value} = event.target
        setArticle({...article, [name]: value})
        setErrors({...errors, [name]: ''})
    }

    return (
        <div className={"edit-article"}>
            <header className={"edit-article-header"}>
                <div className="n_all_articles_admin__header__outer_fixed">
                    <div className="n_all_articles_admin__header">
                        <div className="sportshub">Sports hub</div>
                        <div className="n_all_articles_admin__right_header">
                            <div className="n_admin__profile_section">
                                <ProfileSection/>
                            </div>
                        </div>
                    </div>
                    <div className={"save-cancel-component"}>
                        <SaveCancelChanges
                            handleSubmit={() => postArticle(article)}
                            handleCancel={() => setIsCancel(true)}
                            title={title}
                            saveProp={"Save"}
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
                <CustomPictureInput
                    label={"Picture.*"}
                    name={"picture"}
                    picture={article.picture}
                    addPhoto={true}
                    image={image}
                    setImage={setImage}
                    errors={errors}
                    setErrors={setErrors}
                />
                <div className={"select-errors"}>
                    <div>
                        {errors.category && <p className='photo__error'>
                            {errors.category}
                        </p>}
                    </div>
                    <div>
                        {errors.team && <p className='photo__error'>
                            {errors.team}
                        </p>}
                    </div>
                    <div>
                        {errors.location && <p className='photo__error'>
                            {errors.location}
                        </p>}
                    </div>
                </div>
                <div className="custom-select-container">
                    <CustomSelect
                        label={"Subcategory"}
                        name={"category"}
                        placeholder={"Not selected"}
                        selected={article.category}
                        enumeration={categories}
                        handleChange={handleChange}
                    />
                    <CustomSelect
                        label={"Team"}
                        name={"team"}
                        placeholder={"Not selected"}
                        selected={article.team}
                        enumeration={teams}
                        handleChange={handleChange}
                    />
                    <CustomSelect
                        label={"Location"}
                        name={"location"}
                        placeholder={"Not selected"}
                        selected={article.location}
                        enumeration={teams.map((team) => ({...team, name: team.location, id: team.location}))}
                        handleChange={handleChange}
                    />
                </div>

                {errors.alt && <p className='photo__error'>
                    {errors.alt}
                </p>}
                <CustomInput
                    type="text"
                    label={"Alt.*"}
                    name={"alt"}
                    placeholder={"Alternative text picture"}
                    value={article.alt}
                    handleChange={handleChange}
                />
                {errors.title && <p className='photo__error'>
                    {errors.title}
                </p>}
                <CustomInput
                    type="text"
                    label={"Article headline*"}
                    name={"title"}
                    placeholder={"Name"}
                    value={article.title}
                    handleChange={handleChange}
                />
                {errors.caption && <p className='photo__error'>
                    {errors.caption}
                </p>}
                <CustomInput
                    type="text"
                    label={"Caption*"}
                    name={"caption"}
                    placeholder={"Write caption text here"}
                    value={article.caption}
                    handleChange={handleChange}
                />
                {errors.text && <p className='photo__error'>
                    {errors.text}
                </p>}
                <CustomTextarea
                    label={"Content"}
                    name={"text"}
                    placeholder={"Please add text here"}
                    value={article.text}
                    handleChange={handleChange}
                />
                <div className={"comments-show"}>
                    <span className={"span-comments"}>Comments:</span>
                    {article.commentsActive ?
                        <span className={"span-show"}>Show</span>
                        : <span className={"span-hide"}>Hide</span>}
                    <MDBSwitch id='show-hide-toggle'
                               className={"show-hide-toggle"}
                               checked={article.commentsActive}
                               onChange={() => {
                                   setArticle({...article, commentsActive: !article.commentsActive})
                               }}/>
                </div>
            </form>
        </div>);
}

export default AddArticle;
