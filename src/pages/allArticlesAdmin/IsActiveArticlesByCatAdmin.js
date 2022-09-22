import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow} from "../../Components/horizontal-scroll-menu/arrows";
import Nav from "react-bootstrap/Nav";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import preview from "../../icons/Preview.svg";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import {Pagination} from "@mui/material";
import "./allarticlesadmin.css";
import Dropdown from "react-bootstrap/Dropdown";

const IsActiveArticlesByCatAdmin = () => {
    {/*props : categoryId, isActive */}
    const params = useParams();
    const authToken = "Bearer " + JSON.parse(localStorage.getItem("user")).jwt;
    const [currentPage, setCurrentPage] = useState(1);
    const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    let navigate = useNavigate();
    const [toggleName, setToggleName] = useState('');

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
                setCurrentCategory(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

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
        getAllArticlesByCategoryIdAndIsActive();
    }, [currentPage]);

    function getAllArticlesByCategoryIdAndIsActive() {
        params.isActive === "true" ? setToggleName("Published") : setToggleName("Unpublished");
        axios.get("http://localhost:8080/api/v1/admin/articles/category_id/" + params.category + "/is_active/" + params.isActive +
            "?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
            headers: {
                "Authorization": authToken
            }
        })
            .then((response) => {
                const data = response.data.content;
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
        navigate("/");
    }

    function previewCategory() {
        console.log("preview category");
        navigate("/category/" + params.category);
    }

    return (
        <div className="all_articles_admin__page">
            <div className="all_articles_admin__header">
                <div className="sportshub">Sports hub</div>
                <div className="all_articles_admin__right_header">
                    <button>
                        <img src={accountSwitcher} width="30%" height="30%"/>
                    </button>
                    <div></div>
                </div>
            </div>

            <div className="all_articles_admin__current_category__new_article">
                <div className="all_articles_admin__current_category">
                    {
                        currentCategory.name
                    }
                </div>
                <div className="all_articles_admin__new_article">
                    <AddNewArticleBtn/>
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
                    <SidePanelBtns/>
                </div>
                {
                    allArticlesByCategoryId.length === 0 ?
                        <div className="no-articles">THERE ARE NO ARTICLES IN THIS CATEGORY</div> :

                        <div className="all_articles_admin__articles">
                            <div className="all_articles_admin__category_preview" onClick={previewCategory}>
                                <img src={preview} alt="preview"/>
                                <div className="all_articles_admin__category_preview_text">Preview</div>
                            </div>
                            <div className="all_articles_admin__filter_articles">
                                <Dropdown className="filter_articles">
                                    <Dropdown.Toggle className="dropdown-toggle-filter" variant="success" id="dropdown-basic">
                                        { params.isActive === "true" ? <div>Published</div> : <div>Unpublished</div>}
                                        {/*{toggleName}*/}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="dropdown-item"
                                                       href={"/admin/articles/category/" + currentCategory.id}>All</Dropdown.Item>

                                        <Dropdown.Item /*className="dropdown-item-active"*/
                                                       className={params.isActive === "true" ? "dropdown-item-active" : "dropdown-item"}
                                                       href={"/admin/articles/category/" + currentCategory.id + "/is_active/true"}>Published</Dropdown.Item>

                                        <Dropdown.Item className={params.isActive === "false" ? "dropdown-item-active" : "dropdown-item"}
                                                       href={"/admin/articles/category/" + currentCategory.id + "/is_active/false"}>Unpublished</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="filter_articles">

                                </div>
                                <div className="filter_articles">

                                </div>
                            </div>

                            {
                                allArticlesByCategoryId.map(article => <ShortArticleAdmin key={article.id}
                                                                                          id={article.id}
                                                                                          title={article.title}
                                                                                          shortText={article.shortText}
                                                                                          category={article.category.name}
                                                                                          isPublished={article.isActive}/>)
                            }
                        </div>
                }
            </div>

            <div className="pagination__component">
                <div className="pagination__pages">
                    <Pagination count={totalPages} page={currentPage} onChange={(_, num) => setCurrentPage(num)}/>
                </div>
            </div>
        </div>
    );
};

export default IsActiveArticlesByCatAdmin;