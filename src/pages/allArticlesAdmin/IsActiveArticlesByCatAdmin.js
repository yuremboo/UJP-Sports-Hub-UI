import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import preview from "../../icons/Preview.svg";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import {Pagination} from "@mui/material";
import "./allarticlesadmin.css";
import Dropdown from "react-bootstrap/Dropdown";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import polygon from "../../icons/Polygon.svg";

const IsActiveArticlesByCatAdmin = () => {
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
        axios.get("http://localhost:8080/api/v1/categories/" + params.category, {
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

    const [allArticlesByCategoryId, setAllArticlesByCategoryId] = useState([]);
    useEffect(() => {
        getAllArticlesByCategoryIdAndIsActive();
    }, [currentPage]);

    function getAllArticlesByCategoryIdAndIsActive() {
        params.isActive === "true" ? setToggleName("Published") : setToggleName("Unpublished");
        axios.get("http://localhost:8080/api/v1/articles/category_id/" + params.category + "/is_active/" + params.isActive +
            "?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
            headers: {
                "Authorization": authToken
            }
        })
            .then((response) => {
                setAllArticlesByCategoryId(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function previewCategory() {
        console.log("preview category");
        navigate("/category/" + params.category);
    }

    return (
        <div className="n_all_articles_admin__page">
            <div className="n_all_articles_admin__header__outer_fixed">
                <div className="n_all_articles_admin__header">
                    <div className="sportshub">Sports hub</div>
                    <div className="n_all_articles_admin__right_header">
                        <button className="n_accountSwitcher__button">
                            <img src={accountSwitcher} width="30%" height="30%"/>
                        </button>
                        <div className="n_admin__profile_section">
                            <ProfileSection/>
                        </div>
                    </div>
                </div>

                <div className="n_all_articles_admin__current_category__new_article">
                    <div className="n_all_articles_admin__current_category">
                        {
                            currentCategory.name
                        }
                    </div>
                    <div className="n_all_articles_admin__new_article">
                        <AddNewArticleBtn name={currentCategory.name}/>
                    </div>
                </div>

                <div className="n_all_articles_admin__categories_buttons">
                    <HorizontalScrollMenu/>
                </div>
            </div>
            <div className="n_all_articles_admin__body">
                <div className="n_all_articles_admin__left_buttons">
                    <SidePanelBtns/>
                </div>
                {
                    allArticlesByCategoryId.length === 0 ?
                        <div className="n_no_is_active_articles">
                            <div className="n_all_articles_admin__filter_articles">
                                <Dropdown className="filter_articles">
                                    <Dropdown.Toggle className="dropdown-toggle-filter" variant="success"
                                                     id="dropdown-basic">
                                        <div className="filter_articles__text">
                                            {params.isActive === "true" ? <div>Published</div> : <div>Unpublished</div>}
                                        </div>
                                        <div className="filter_articles__triangle">
                                            <img src={polygon} height="100%" width="100%"/>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="dropdown-item"
                                                       href={"/admin/articles/category/" + currentCategory.id}>All</Dropdown.Item>

                                        <Dropdown.Item
                                            className={params.isActive === "true" ? "dropdown-item-active" : "dropdown-item"}
                                            href={"/admin/articles/category/" + currentCategory.id + "/is_active/true"}>Published</Dropdown.Item>

                                        <Dropdown.Item
                                            className={params.isActive === "false" ? "dropdown-item-active" : "dropdown-item"}
                                            href={"/admin/articles/category/" + currentCategory.id + "/is_active/false"}>Unpublished</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="n_no-articles-text">THERE ARE NO
                                {params.isActive === "true" ?
                                    <div style= {{margin: "0 7px"}}>Published</div> :
                                    <div style= {{margin: "0 7px"}}>Unpublished</div>}
                                ARTICLES IN THIS CATEGORY
                            </div>
                        </div>
                        :

                        <div className="n_all_articles_admin__articles">
                            <div className="n_all_articles_admin__category_preview" onClick={previewCategory}>
                                <img src={preview} alt="preview"/>
                                <div className="n_all_articles_admin__category_preview_text">Preview</div>
                            </div>
                            <div className="n_all_articles_admin__filter_articles">
                                <Dropdown className="filter_articles">
                                    <Dropdown.Toggle className="dropdown-toggle-filter" variant="success"
                                                     id="dropdown-basic">
                                        <div className="filter_articles__text">
                                            {params.isActive === "true" ? <div>Published</div> : <div>Unpublished</div>}
                                        </div>
                                        <div className="filter_articles__triangle">
                                            <img src={polygon} height="100%" width="100%"/>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="dropdown-item"
                                                       href={"/admin/articles/category/" + currentCategory.id}>All</Dropdown.Item>

                                        <Dropdown.Item
                                            className={params.isActive === "true" ? "dropdown-item-active" : "dropdown-item"}
                                            href={"/admin/articles/category/" + currentCategory.id + "/is_active/true"}>Published</Dropdown.Item>

                                        <Dropdown.Item
                                            className={params.isActive === "false" ? "dropdown-item-active" : "dropdown-item"}
                                            href={"/admin/articles/category/" + currentCategory.id + "/is_active/false"}>Unpublished</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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