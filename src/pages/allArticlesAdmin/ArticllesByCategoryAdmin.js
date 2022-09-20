import React, { useEffect, useState } from "react";
import axios from "axios";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
// import CategoryButton from "../../Components/shortArticle/categoryButton";
import "./allarticlesadmin.css";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../../Components/horizontal-scroll-menu/arrows";
import { Pagination } from "@mui/material";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import NavBarIcons from "../../Components/NavBarIcons/NavBarIcons";
// import data from "bootstrap/js/src/dom/data";

const ArticlesByCategoryAdmin = () => {
  console.log("ArticlesByCategoryAdmin PAGE");
  const params = useParams();
  console.log("params.category = ", params.category);
  const authToken = "Bearer " + JSON.parse(localStorage.getItem("user")).jwt;

  const [currentCategory, setCurrentCategory] = useState({});
  useEffect(() => {
    getCategoryById();
  }, []);

  function getCategoryById() {
    console.log("getCategoryById function");
    axios.get("http://localhost:8080/api/categories/" + params.category, {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        console.log("SUCCESS getCategoryById function");
        setCurrentCategory(response.data);
        console.log("Curr cat: ", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
    console.log("currentCategory.name: ", currentCategory.name);
  }

  console.log(useParams());
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  let navigate = useNavigate();


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategoryById();
    // console.log("getAllCategories function");
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        // console.log("SUCCESS getAllCategories function");
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


  const [allArticlesByCategoryId, setAllArticlesByCategoryId] = useState([]);
  useEffect(() => {
    getAllArticlesByCategoryId();
  }, [currentCategory, currentPage]);

  function getAllArticlesByCategoryId() {
    // console.log("function getAllArticlesByCategoryId");
    axios.get("http://localhost:8080/api/v1/admin/articles/category_id/" + currentCategory.id + "?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        const data = response.data.content;
        // setCurrentCategory(response.data.content.category);
        // console.log("getAllArticlesByCategoryId");
        // console.log(response.data);
        setAllArticlesByCategoryId(data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function returnHome() {
    navigate("/admin/articles");
  }

  return (
    <div className="all_articles_admin__page">
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
          {
            currentCategory.name
          }
          {/*{currentCategory.name.toUpperCase()}*/}
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
              <button onClick={returnHome}>HOME</button>
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


      <div className="all_articles_admin__body">
        <div className="all_articles_admin__left_buttons">
          <SidePanelBtns />
        </div>

        {
          allArticlesByCategoryId.length === 0 ? <div className="no-articles">THERE ARE NO ARTICLES IN THIS CATEGORY</div> :

            <div className="all_articles_admin__articles">
              <div className="all_articles_admin__filter_articles">
                <div className="filter_articles">
                  <select className="form-select form-select-sm">
                    <option>All</option>
                    <option>Published</option>
                    <option>Unpublished</option>
                  </select>
                </div>
                <div className="filter_articles">

                </div>
                <div className="filter_articles">

                </div>
              </div>
              {
                allArticlesByCategoryId.map(article => <ShortArticleAdmin key={article.id} title={article.title}
                                                                          shortText={article.shortText}
                                                                          category={article.category.name}
                                                                          isPublished={article.isActive} />)
              }
            </div>
        }
      </div>


      <div className="pagination__component">
        <div className="pagination__pages">
          <Pagination count={totalPages} page={currentPage} onChange={(_, num) => setCurrentPage(num)} />
        </div>
      </div>
    </div>);

};

export default ArticlesByCategoryAdmin;