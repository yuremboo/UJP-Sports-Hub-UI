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

const AdminHomePage = ({ props, globalStore }) => {
  const { id } = useParams();
  const AuthToken = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allArticles, setAllArticle] = useState([]);
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
    getCategories();
    getTeam();
    getArticles();
    addInInput();
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

  function getTeam() {
    console.log("function getTeam");
    console.log("token: ", AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/teams", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getTeam");
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

  function getArticles() {
    console.log("function getArticles");
    console.log("token: ", AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/v1/admin/articles", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getArticles");
        console.log(response.data);
        setAllArticle(response.data.content);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function putArticle(article) {
    let result = true;
    console.log("token: ", AuthToken["jwt"]);
    axios.put("http://localhost:8080/api/v1/admin/articles/", article, {
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
  const [inputList, setInputList] = useState([] );
  function addInInput () {
    for(let i=0;i<3;i++) {
      setInputList(inputList.concat(
        <AdminMainArticleSection
          key={inputList.length}
          handleChange={handleChange}
          deleteSection={deleteSection}
          categories={categories}
          teams={teams}
          //allArticles={allArticles}
        />));
    }
  };
  const onAddBtnClick = event => {
    event.preventDefault();
    setInputList(inputList.concat(
      <AdminMainArticleSection
        key={inputList.length}
        handleChange={handleChange}
        deleteSection={deleteSection}
        categories={categories}
        teams={teams}
        //allArticles={allArticles}
      />));
  };
  function deleteSection (key) {
    setInputList(inputList.filter((article) => inputList.indexOf(article) !== key));
    //setInputList(inputList.splice(key, 1));
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
    console.log(article);
  };

  // return (
    // <div className={"edit-article"}>
    //   <header className={"edit-article-header"}>
    //     <HeaderAdmin />
    //     <SaveCancelChanges handleSubmit={putArticle(article)} />
    //   </header>
    //   <NavBarIcons className={"nav-bar-icons"} />

      {/*<form className="form-container">*/}
      {/*  <div className={"form-preview"}>*/}
      {/*    <button className={"button-eye"} type={"button"}>*/}
      {/*      <img className={"img-eye"} src={Eye} alt="Eye" />*/}
      {/*      <span className={"span-preview"}>Preview</span>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*  <div className="breakdown-header">*/}
      {/*    <hr />*/}
      {/*    <div className="article-home-main-header__text">*/}
      {/*      <p>MAIN ARTICLES</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  {inputList}*/}
      {/*  {inputList.length < 5 ? (*/}
      {/*    <div>*/}
      {/*      <button className={"add-article-section"}*/}
      {/*              onClick={onAddBtnClick}>*/}
      {/*        <span className={"span-add-article-section"}>+Add one more article</span>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <></>*/}
      {/*  )}*/}
      {/*  <CustomPictureInput*/}
      {/*    // type="image"*/}
      {/*    label={"Picture.*"}*/}
      {/*    name={"picture"}*/}
      {/*    value={article.picture}*/}
      {/*    handleChange={handleChange}*/}
      {/*  />*/}
      {/*  <CustomInput*/}
      {/*    type="text"*/}
      {/*    label={"Alt.*"}*/}
      {/*    name={"alt"}*/}
      {/*    value={"Picture represent teams"}*/}
      {/*    handleChange={handleChange}*/}
      {/*  />*/}
      {/*  <CustomInput*/}
      {/*    type="text"*/}
      {/*    label={"Photo title*"}*/}
      {/*    name={"title"}*/}
      {/*    value={"Defending The Throne"}*/}
      {/*    handleChange={handleChange}*/}
      {/*  />*/}
      {/*  <CustomInput*/}
      {/*    type="text"*/}
      {/*    label={"Short Description*"}*/}
      {/*    name={"caption"}*/}
      {/*    value={"Los Angeles Lakes guard Derek Fisher, right, pressured by the Denver Nuggets Nene during th efirst quarter of NBA exhibition action on Oct 16"}*/}
      {/*    handleChange={handleChange}*/}
      {/*  />*/}
      {/*  <CustomInput*/}
      {/*    type="text"*/}
      {/*    label={"Author*"}*/}
      {/*    name={"caption"}*/}
      {/*    value={"Photo Courtesy MCT"}*/}
      {/*    handleChange={handleChange}*/}
      {/*  />*/}


      {/*</form>*/}
    // </div>);

    return (<div className="all_articles_admin__page">
        <div className="all_articles_admin__header">
            <div className="sportshub">Sports hub</div>
            <div className="all_articles_admin__right_header">
                <button>
                    <img src={accountSwitcher} width="30%" height="30%" />
                </button>
                <div></div>
            </div>
        </div>

        <div className="all_articles_admin__current_category__new_article">
            <div className="all_articles_admin__current_category">
                {currentCategory.name}
            </div>
            <div className="all_articles_admin__new_article">
                <AddNewArticleBtn />
            </div>
        </div>

        <div className="all_articles_admin__categories_buttons">
            <div className="horizontal_scroll_menu">
                <ScrollMenu itemClassName="scroll_menu"
                            LeftArrow={LeftArrow}
                            RightArrow={RightArrow}
                            options={{
                                ratio: 0.9, rootMargin: "5px", threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                            }}
                >
                    <div className="category_button">
                        <button>HOME</button>
                    </div>

                    {
                        categories.map(category =>
                            <Nav.Link className="category_button" href={"/admin/articles/category/" + category.id}>
                                <li>{category.name}</li>
                            </Nav.Link>
                        )
                    }
                </ScrollMenu>
            </div>
        </div>

        ADMIN HOME PAGE
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
