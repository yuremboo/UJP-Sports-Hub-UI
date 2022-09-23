import React, {useEffect, useState} from "react";
import axios from "axios";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import "./allarticlesadmin.css";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow} from "../../Components/horizontal-scroll-menu/arrows";
import {Pagination} from "@mui/material";
import Nav from "react-bootstrap/Nav";
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate, useParams} from "react-router-dom";
import preview from "../../icons/Preview.svg";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";

const ArticlesByCategoryAdmin = () => {
    const params = useParams();
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
                // console.log("SUCCESS getCategoryById function");
                setCurrentCategory(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
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
        getAllArticlesByCategoryId();
    }, [currentCategory, currentPage]);

    function getAllArticlesByCategoryId() {
        axios.get("http://localhost:8080/api/v1/admin/articles/category_id/" + currentCategory.id + "?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
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
        navigate("/category/" + currentCategory.id);
    }

    // function published() {
    //     navigate("/category/" + currentCategory.id + "/is_active/true");
    // }

    return (
        <div className="all_articles_admin__page">
            <div className="all_articles_admin__header">
                <div className="sportshub">Sports hub</div>
                <div className="all_articles_admin__right_header">
                    <button className="accountSwitcher__button">
                        <img src={accountSwitcher} width="30%" height="30%"/>
                    </button>
                    {/*<div className="all_articles_admin__profile_section">*/}
                    {/*    <ProfileSection/>*/}
                    {/*</div>*/}
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
                    {/*{currentCategory.name.toUpperCase()}*/}
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
                                    <Dropdown.Toggle className="dropdown-toggle-filter" variant="success"
                                                     id="dropdown-basic">
                                        All
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            className="dropdown-item-active" /*href="#/action-2"*/>All</Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item"
                                                       href={"/admin/articles/category/" + currentCategory.id
                                                           + "/is_active/true"}>Published</Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item"
                                                       href={"/admin/articles/category/" + currentCategory.id
                                                           + "/is_active/false"}>Unpublished</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/*<div className="filter_articles">*/}
                                {/*</div>*/}

                                {/*<div className="filter_articles">*/}
                                {/*</div>*/}
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
        </div>);

};

export default ArticlesByCategoryAdmin;