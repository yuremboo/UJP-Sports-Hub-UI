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
import PhotoOfTheDay from "../../Components/photo-of-the-day/PhotoOfTheDay";
import AdminCustomPictureInput from "../../Components/AdminCustomPictureInput/AdminCustomPictureInput";
import { addPhotoOfTheDay, addPhotoOfTheDaySection } from "../../redux/admin-photo-of-the-day/admin-photo.action";

const initialValues = {
  alt: "",
  photoTitle: "",
  shortDescription: "",
  author: "",
  isHidden: false
}

const AdminHomePage = () => {
  //const { id } = useParams();
  const navigate = useNavigate();
  const AuthToken = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState([]);
  const [allArticles, setAllArticle] = useState([]);
  const [isCancel, setIsCancel] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
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
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
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
    axios.get("http://localhost:8080/api/v1/teams", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
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
    axios.get("http://localhost:8080/api/v1/admin/articles", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
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

  const [inputList, setInputList] = useState([]);
  function addInInput() {
    for (let i = 0; i < 3; i++) {
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

  const clearAllInputs = () => {
    setImage([])
    setValues(initialValues)
    setIsCancel(false)
  }

  const handleSubmit = async () => {
    const { alt, shortDescription, photoTitle, author } = values
    await addPhotoOfTheDaySection({ alt, shortDescription, title: photoTitle, author })
    await addPhotoOfTheDay(image[0])
    clearAllInputs()
    setIsSaved(false)
  }

  function deleteSection(key) {
    setInputList(inputList.filter((article) => inputList.indexOf(article) !== key));
    //setInputList(inputList.splice(key, 1));
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  return (
    <>
    {isSaved && <CancellationPopup
      handleCancel={() => setIsSaved(false)}
      handleSubmit={handleSubmit}
      title={"Would you like to save last changement?"}
      text={"You've made some changes! Do you want to save them?"}
    />} 
    {isCancel && <CancellationPopup
      handleCancel={() => setIsCancel(false)}
      handleSubmit={clearAllInputs}
    />}
      <div className="all_articles_admin__page">
        <div className="all_articles_admin__header">
          <div className="sportshub">Sports hub</div>
          <div className="all_articles_admin__right_header">
            <button className="accountSwitcher__button">
              <img src={accountSwitcher} width="30%" height="30%" />
            </button>
            <div className="admin__profile_section">
              <ProfileSection />
            </div>
          </div>
        </div>
        <SaveCancelChanges handleSubmit={()=>{setIsSaved(true)}} handleCancel={()=>{setIsCancel(true)}} saveProp={"Save all changes"} title={"Home"} />

        <div className="all_articles_admin__categories_buttons">
          <HorizontalScrollMenu />
        </div>
        <>
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
              value={article.alt}
              handleChange={handleChange}
            />
            <CustomInput
              type="text"
              label={"Photo title*"}
              name={"title"}
              value={article.title}
              handleChange={handleChange}
            />
            <CustomInput
              type="text"
              label={"Short Description*"}
              name={"caption"}
              value={article.caption}
              handleChange={handleChange}
            />
            <CustomInput
              type="text"
              label={"Author*"}
              name={"author"}
              value={article.author}
              handleChange={handleChange}
            />
          </form>
          <AdminCustomPictureInput
            handlePhotoSubmit={obj => addPhotoOfTheDay(obj)}
            handlePhotoSectionSubmit={obj => addPhotoOfTheDaySection(obj)}
            image={image}
            setImage={setImage}
            values={values}
            setValues={setValues}
          />
        </>
      </div>
    </>);
};

export default AdminHomePage;
