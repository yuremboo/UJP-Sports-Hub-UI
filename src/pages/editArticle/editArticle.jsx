import {useEffect, useState} from "react";
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
import HeaderAdmin from "../../Components/HeaderAdmin/HeaderAdmin";
import { authRequestFailure } from "../../redux/auth/auth.actions";
import { useParams } from "react-router-dom";

const EditArticle = ({ props, globalStore }) => {
    const { id } = useParams();
    const [article, setArticle] = useState({
        picture: 'Picture',
        category: 'Category',
        team: 'Team',
        location: 'Location',
        alt: 'Alt',
        title: 'Title',
        caption: 'Caption',
        text: 'Text',
    })
    const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        console.log("function getCategories");
        console.log("token: ", AuthToken["jwt"]);
        axios.get("http://localhost:8080/api/categories", {
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

    function putAtricle(article,id) {
        let result = true
      console.log('token: ', AuthToken['jwt']);
      axios.put("http://localhost:8080/api/v1/articles/"+id, article, {
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
        return result;
    }
    // useEffect(() => {
    //     // const articleData = axios.get("http://localhost:8080/api/v1/articles/1")
    //     // setArticle({
    //     //     ...article,
    //     //     picture: articleData.picture,
    //     //     category: articleData.category,
    //     //     team: articleData.team,
    //     //     location: articleData.location,
    //     //     alt: articleData.alt,
    //     //     caption: articleData.caption,
    //     //     title: articleData.title,
    //     //     text: articleData.text,
    //     })
    // }, [])

    const handleChange = event => {
        const {name, value} = event.target
        setArticle({...article, [name]: value})
        console.log(article)
    }

    return (
        <div className={"edit-article"}>
            <header className={"edit-article-header"}>
                <HeaderAdmin/>
                <SaveCancelChanges handleSubmit={putAtricle(article,id)}/>
            </header>
            <NavBarIcons className={"nav-bar-icons"}/>

            <form className="form-container">
                <div className={"form-preview"}>
                    <button className={"button-eye"} type={"button"}>
                        <img className={"img-eye"} src={Eye} alt="Eye"/>
                        <span className={"span-preview"}>Preview</span>
                    </button>
                </div>

                <CustomPictureInput
                    // type="image"
                    label={"Picture.*"}
                    name={"picture"}
                    value={article.picture}
                    handleChange={handleChange}
                />
                <div className="custom-select-container">
                    <CustomSelect
                        label={"Subcategory"}
                        name={"subcategory"}
                        enumeration={categories}
                        handleChange={handleChange}
                    />
                    {/*<CustomSelect*/}
                    {/*    label={"Team"}*/}
                    {/*    name={"Team"}*/}
                    {/*    value={article.team}*/}
                    {/*    handleChange={handleChange}*/}
                    {/*/>*/}
                    {/*<CustomSelect*/}
                    {/*    label={"Location"}*/}
                    {/*    name={"Location"}*/}
                    {/*    value={article.location}*/}
                    {/*    handleChange={handleChange}*/}
                    {/*/>*/}
                </div>

                <CustomInput
                    type="text"
                    label={"Alt.*"}
                    name={"alt"}
                    value={article.alt}
                    handleChange={handleChange}
                />
                <CustomInput
                    type="text"
                    label={"Article headline*"}
                    name={"title"}
                    value={article.title}
                    handleChange={handleChange}
                />
                <CustomInput
                    type="text"
                    label={"Caption*"}
                    name={"caption"}
                    value={article.caption}
                    handleChange={handleChange}
                />
                <CustomTextarea
                    label={"Content"}
                    value={article.text}
                    handleChange={handleChange}
                />
                <div className={"comments-show"}>
                    <span className={"span-comments"}>Comments:</span>
                    {article.isHidden ?
                        <span className={"span-show"}>Show</span>
                        : <span className={"span-hide"}>Hide</span>}
                    <MDBSwitch id='show-hide-toggle'
                               className={"show-hide-toggle"}
                               value={article.isHidden}
                               onClick={() => {
                                   setArticle({...article, isHidden: !article.isHidden})
                               }}/>
                </div>
            </form>
        </div>);
}

export default EditArticle;
