import {useEffect, useState} from "react";
import React from 'react';
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
import { useParams } from "react-router-dom";
import CancellationPopup from "../../Components/CancellationPopup/CancellationPopup";

const EditArticle = ({ props, globalStore }) => {
    const { id } = useParams();
    const AuthToken = JSON.parse(localStorage.getItem("user"));

    const [IsLoading, setIsLoading] = useState(true);

    const [isCancel, setIsCancel] = useState(false)

  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState([]);
    const [article, setArticle] = useState({})
    useEffect(() => {
      setIsLoading(true);
        getArticle();
    }, []);

    function getArticle() {
        console.log("function getArticle");
        console.log("token: ", AuthToken["jwt"]);
        axios.get("http://localhost:8080/api/v1/articles/"+id, {
            headers: {
                authorization: AuthToken["jwt"]
            }
        })
          .then((response) => {
              const data = response.data;
              console.log("getArticle");
              console.log(response.data);
              setArticle({...data, category: data.category.id, team: data.team.id});
            setIsLoading(false);
            return axios.get("http://localhost:8080/api/categories", {
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
            return axios.get("http://localhost:8080/api/teams", {
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
          .then(() => {setIsLoading(false);})
          .catch((error) => {
              if (error.response) {
                  console.log(error.response);
                  console.log("error.response.status: ", error.response.status);
              }
          });
    }

    function putArticle(article,id) {
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
        categoryId: "2",
        teamId: "2"
      };
        console.log('token: ', AuthToken['jwt']);
        axios.put("http://localhost:8080/api/v1/articles/"+id, sendArticle, {
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

    const handleChange = event => {
        const {name, value} = event.target
        setArticle({...article, [name]: value})
        console.log(article)
    }

    return (
        <div className={"edit-article"}>
            <header className={"edit-article-header"}>
                <HeaderAdmin/>
                <SaveCancelChanges
                  handleSubmit={() => putArticle(article,id)}
                  handleCancel={() => setIsCancel(true)}
                />
            </header>
            {isCancel && <CancellationPopup
              handleCancel={() => setIsCancel(false)}
            />}
            <NavBarIcons className={"nav-bar-icons"}/>

          {!IsLoading ?
            <form className="form-container">
              <div className={"form-preview"}>
                <button className={"button-eye"} type={"button"}>
                  <img className={"img-eye"} src={Eye} alt="Eye" />
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
                  name={"category"}
                  selected={article.category}
                  enumeration={categories}
                  handleChange={handleChange}
                />
                <CustomSelect
                  label={"Team"}
                  name={"team"}
                  selected={article.team}
                  enumeration={teams}
                  handleChange={handleChange}
                />
                <CustomSelect
                    label={"Location"}
                    name={"location"}
                    selected={article.location}
                    enumeration={teams.map((team)=>({...team, name:team.location, id:team.location}))}
                    handleChange={handleChange}
                />
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
                name={"text"}
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
                             setArticle({ ...article, isHidden: !article.isHidden })
                           }} />
              </div>
            </form>
          :<h1>loading</h1>}
        </div>);
}

export default EditArticle;
