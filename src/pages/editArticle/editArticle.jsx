import { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../../Components/CustomInput/CustomInput";
import "./editArticle.style.css";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
import Eye from "../../icons/Eye.svg"
import CustomTextarea from "../../Components/CustomTextArea/CustomTextarea";
import CustomPictureInput from "../../Components/CustomPictureInput/CustomPictureInput";
import SaveCancelChanges from "../../Components/SaveCancelChanges/SaveCancelChanges";
import {MDBSwitch} from 'mdb-react-ui-kit';
import {useNavigate, useParams} from "react-router-dom";
import CancellationPopup from "../../Components/CancellationPopup/CancellationPopup";
import Header from "../../Components/Header";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import {userLogoutRequest} from "../../redux/auth/auth.actions";

const EditArticle = ({props, globalStore}) => {
    const {title} = useParams();
    const {id} = useParams();
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const [errors, setErrors] = useState("");
    const [isCancel, setIsCancel] = useState(false)

    const [teams, setTeams] = useState([]);
    const [categories, setCategories] = useState([]);
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
        categoryId: "",
        teamId: "",
        selectedByAdmin: false
    })
    useEffect(() => {
        getArticle();
    }, []);

    function getArticle() {
        console.log("function getArticle");
        return axios.get("http://localhost:8080/api/v1/articles/" + id, {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("getArticle");
                console.log(response.data);
                setArticle({...data, category: data.category.id, team: data.team.id});
                return axios.get("http://localhost:8080/api/v1/categories", {
                    headers: {
                        authorization: AuthToken["jwt"]
                    }
                })
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
                setTeams(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function putArticle(article, id) {
        if (isValid()) {
            console.log("putArticle");
            const sendArticle = {
                id: article.id,
                title: article.title,
                text: article.text,
                caption: article.caption,
                alt: article.alt,
                location: article.location,
                picture: article.picture,
                isActive: article.isActive,
                commentsActive: article.commentsActive,
                createDateTime: article.createDateTime,
                updateDateTime: article.updateDateTime,
                categoryId: article.category,
                teamId: article.team,
                selectedByAdmin: article.selectedByAdmin
            };
            axios.put("http://localhost:8080/api/v1/articles/" + id, sendArticle, {
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
            console.log("Fields are not valid!");
        }
    }

    const validateInput = data => {
        let errors = {}
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
                <Header/>
                <SaveCancelChanges
                    handleSubmit={() => putArticle(article, id)}
                    handleCancel={() => setIsCancel(true)}
                    title={title}
                    saveProp={"Save"}
                    check={true}
                />
                <HorizontalScrollMenu/>
            </header>
            {isCancel && <CancellationPopup
                handleCancel={() => setIsCancel(false)}
                handleSubmit={() => navigate(-1)}
            />}
            <NavBarIcons className={"nav-bar-icons"}/>

            <form className="form-container">
                <div className={"form-preview"}>
                    <button className={"button-eye"} type={"button"}>
                        <img className={"img-eye"} src={Eye} alt="Eye"/>
                        <span className={"span-preview"}>Preview</span>
                    </button>
                </div>

                <CustomPictureInput
                    label={"Picture.*"}
                    name={"picture"}
                    photo={true}
                    value={article.picture}
                    handleChange={handleChange}
                />
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

export default EditArticle;
