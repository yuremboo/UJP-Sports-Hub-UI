import { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "../../Components/CustomInput/CustomInput";
import "./AdminHomePage.css";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
import Eye from "../../icons/Eye.svg";
import CustomTextarea from "../../Components/CustomTextArea/CustomTextarea";
import AdminMainArticleSection from "../../Components/Home/AdminMainArticleSection";
import CustomPictureInput from "../../Components/CustomPictureInput/CustomPictureInput";
import SaveCancelChanges from "../../Components/SaveCancelChanges/SaveCancelChanges";
import { MDBSwitch } from "mdb-react-ui-kit";
import HeaderAdmin from "../../Components/HeaderAdmin/HeaderAdmin";
import { authRequestFailure } from "../../redux/auth/auth.actions";
import { useParams } from "react-router-dom";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../../Components/horizontal-scroll-menu/arrows";
import { Pagination } from "@mui/material";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import CancellationPopup from "../../Components/CancellationPopup/CancellationPopup";
//import React from "@types/react";

const AdminHomePage = () => {
  //const { id } = useParams();
  const AuthToken = JSON.parse(localStorage.getItem("user"));
    const [IsLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allArticles, setAllArticle] = useState([]);
    const [isCancel, setIsCancel] = useState(false)
  const [article, setArticle] = useState({
    picture: "Picture",
    category: "Category",
    team: "Team",
    location: "Location",
    alt: "Alt",
    title: "Title",
    caption: "Caption",
    text: "Text"
  });
    // const [currentPage, setCurrentPage] = useState(1);
    // const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
    // const [totalPages, setTotalPages] = useState(1);
    // let navigate = useNavigate();

    const [currentCategory, setCurrentCategory] = useState({
        "id": "0", "name": "HOME"
    });
    useEffect(() => {
        getData();
    addInInput();
  }, []);

    function getData() {
        console.log("function getData");
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
                return  axios.get("http://localhost:8080/api/v1/teams", {
                    headers: {
                        authorization: AuthToken["jwt"]
                    }
                })
            })
            .then((response) => {
                const data = response.data;
                console.log("getTeam");
                console.log(response.data);
                setTeams(data);
                return axios.get("http://localhost:8080/api/v1/admin/articles", {
                    headers: {
                        authorization: AuthToken["jwt"]
                    }
                })
            })
            .then((response) => {
                console.log("getArticles");
                console.log(response.data);
                setAllArticle(response.data.content);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

  function putArticle() {
    let result = true;
    console.log("token: ", AuthToken["jwt"]);
      console.log(articlesSelectedByAdmin);
    axios.put("http://localhost:8080/api/v1/admin/articles/", articlesSelectedByAdmin, {
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

  const [inputList, setInputList] = useState([] );
  function addInInput () {
    for(let i=0;i<3;i++) {
      setInputList(inputList.concat(
        <AdminMainArticleSection
          key={inputList.length}
          deleteSection={deleteSection}
          getArticleList={getArticleList}
          categories={categories}
          teams={teams}
          allArticles={allArticles}
        />));
    }
  };
  const onAddBtnClick = event => {
    event.preventDefault();
    setInputList(inputList.concat(
      <AdminMainArticleSection
        key={inputList.length}
        deleteSection={deleteSection}
        getArticleList={getArticleList}
        categories={categories}
        teams={teams}
        allArticles={allArticles}
      />));
  };
  function deleteSection (key) {
    setInputList(inputList.filter((article) => inputList.indexOf(article) !== key));
    //setInputList(inputList.splice(key, 1));
  };
    const [articlesSelectedByAdmin, setArticlesSelectedByAdmin] = useState([]);
    function getArticleList (value) {
        setArticlesSelectedByAdmin(articlesSelectedByAdmin.concat( value) );
        console.log(articlesSelectedByAdmin);
    };

  const handleChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
    console.log(article);
  };

    return (
        <div className="all_articles_admin__page">
            <div className="all_articles_admin__header">
                <div className="sportshub">Sports hub</div>
                <div className="all_articles_admin__right_header">
                    <button className="accountSwitcher__button">
                        <img src={accountSwitcher} width="30%" height="30%"/>
                    </button>
                    <div className="admin__profile_section">
                        <ProfileSection/>
                    </div>
                </div>
            </div>

            <div className="all_articles_admin__current_category__new_article">
                <div className="all_articles_admin__current_category">
                    {
                        currentCategory.name
                    }
                </div>
                    <SaveCancelChanges
                        handleSubmit={putArticle()}
                        handleCancel={() => setIsCancel(true)}
                    />
                {isCancel && <CancellationPopup
                    handleCancel={() => setIsCancel(false)}
                />}
                {/*<NavBarIcons className={"nav-bar-icons"}/>*/}
            </div>

            <div className="all_articles_admin__categories_buttons">
                <HorizontalScrollMenu/>
            </div>

        <form className="form-container">
            <div className={"form-preview"}>
                <button className={"button-eye"} type={"button"}>
                    <img className={"img-eye"} src={Eye} alt="Eye" />
                    <span className={"span-preview"}>Preview</span>
                </button>
            </div>
            <div className="breakdown-header">
                <hr />
                <div className="article-home-main-header__text">
                    <p>MAIN ARTICLES</p>
                </div>
            </div>

            {inputList}
            {inputList.length < 5 ? (
                <div>
                    <button className={"add-article-section"}
                            onClick={onAddBtnClick}>
                        <span className={"span-add-article-section"}>+Add one more article</span>
                    </button>
                </div>
            ) : (
                <></>
            )}
            <CustomPictureInput
                // type="image"
                label={"Picture.*"}
                name={"picture"}
                value={article.picture}
                handleChange={handleChange}
            />
            <CustomInput
                type="text"
                label={"Alt.*"}
                name={"alt"}
                value={"Picture represent teams"}
                handleChange={handleChange}
            />
            <CustomInput
                type="text"
                label={"Photo title*"}
                name={"title"}
                value={"Defending The Throne"}
                handleChange={handleChange}
            />
            <CustomInput
                type="text"
                label={"Short Description*"}
                name={"caption"}
                value={"Los Angeles Lakes guard Derek Fisher, right, pressured by the Denver Nuggets Nene during th efirst quarter of NBA exhibition action on Oct 16"}
                handleChange={handleChange}
            />
            <CustomInput
                type="text"
                label={"Author*"}
                name={"caption"}
                value={"Photo Courtesy MCT"}
                handleChange={handleChange}
            />
        </form>
    </div>);
};

export default AdminHomePage;
