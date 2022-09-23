import React, { useEffect, useState } from "react";
import axios from "axios";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import CategoryButton from "../../Components/shortArticle/categoryButton";
import "./allarticlesadmin.css";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../../Components/horizontal-scroll-menu/arrows";
import { Pagination } from "@mui/material";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

const AllArticlesAdmin = () => {
  const authToken = "Bearer " + JSON.parse(localStorage.getItem("user")).jwt;
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  let navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState({
    "id": "0", "name": "HOME"
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  const [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    getAllArticlesAllCategories();
  }, [currentPage]);

  function getAllArticlesAllCategories() {
    axios.get("http://localhost:8080/api/v1/articles?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        console.log(response.data);
        setAllArticles(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getAllActiveArticles() {
    axios.get("http://localhost:8080/api/v1/admin/articles/is_active/true?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        console.log(response.data);
        setAllArticles(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getAllNotActiveArticles(isActive) {
    axios.get("http://localhost:8080/api/v1/admin/articles/is_active/false?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
      headers: {
        "Authorization": authToken
      }
    })
      .then((response) => {
        console.log(response.data);
        setAllArticles(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

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
            <button onClick={getAllArticlesAllCategories}>HOME</button>
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
        allArticles.length === 0 ? <div className="no-articles">THERE ARE NO ARTICLES</div> :

          <div className="all_articles_admin__articles">
            <div className="all_articles_admin__filter_articles">
              <div className="filter_articles">
                <select className="form-select form-select-sm">
                  {/*  <button onClick={getAllActiveArticles}>Published</button>*/}
                  <option>All</option>
                  <option onClick={getAllActiveArticles}>Published</option>
                  <option onClick={getAllNotActiveArticles}>Unpublished</option>
                </select>
              </div>
              <div className="filter_articles">

              </div>
              <div className="filter_articles">

              </div>
            </div>
            {
              allArticles.map(article => <ShortArticleAdmin key={article.id} id={article.id} title={article.title}
                                                              shortText={article.shortText}
                                                            category={article.category.name}
                                                            isPublished={article.isActive} />)
            }
          </div>
      }
    </div>


    <div className="pagination__component">
      <div className="pagination__pages">
        <Pagination count={totalPages} page={currentPage} onChange={(_, num) =>   (num)} />
      </div>
    </div>
  </div>);
};

export default AllArticlesAdmin;