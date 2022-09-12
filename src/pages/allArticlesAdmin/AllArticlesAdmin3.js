import React, {useEffect, useState} from 'react';
import axios from "axios";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import accountSwitcher from "../../icons/accountSwitcher.svg";
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow} from "../../Components/horizontal-scroll-menu/arrows";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import {Pagination} from "@mui/material";

const AllArticlesAdmin3 = () => {
    const authToken = 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt;

    const[categories, setCategories] = useState([]);
    const[displayArticles, setDisplayArticles] = useState([]);
    const[totalPages, setTotalPages] = useState(1);
    const[numOfArticlesPerPage, setNumOfArticlesPerPage] = useState(5);
    const[currentPage, setCurrentPage] = useState(1);

    const[currentCategory, setCurrentCategory] = useState({
        "id":"0", "name":"HOME"
    });


    useEffect(() => {
        getAllCategories();
    }, []);
    function getAllCategories() {
        axios.get("http://localhost:8080/api/categories", {
            headers: {
                "Authorization": authToken,
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
            })
    }



    const [allArtForNum, setAllArtForNum] = useState([]);
    useEffect(() => {
        getNumAllArticlesAllCategories();
    }, []);  // ?
    function getNumAllArticlesAllCategories() {
        axios.get("http://localhost:8080/api/v1/admin/allarticles", {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data;
                setAllArtForNum(data);
                console.log('getAllArticlesAllCategories without pagination');
                console.log(response.data);
                setTotalPages(Math.ceil(allArtForNum.length / numOfArticlesPerPage));
                console.log('data length: ', data.length)
                console.log("total pages in getNumAllArticlesAllCategories just after: ", totalPages);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
        setTotalPages(Math.ceil(allArtForNum.length / numOfArticlesPerPage));
        console.log("total pages in the end getNumAllArticlesAllCategories: ", totalPages);
    }


    useEffect(() => {
        getAllArticlesAllCategoriesWithPagination();
    }, [currentPage]);
    function getAllArticlesAllCategoriesWithPagination() {
        getNumAllArticlesAllCategories();
        axios.get("http://localhost:8080/api/v1/admin/articles?page=" + (currentPage - 1) + "&size=" + numOfArticlesPerPage, {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data;
                setDisplayArticles(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }


    useEffect(() => {
        getAllArticlesByCategoryId(currentCategory.id);
    }, [currentCategory]);
    function getAllArticlesByCategoryId(catId) {
        console.log('function getAllArticlesByCategoryId');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/v1/admin/articles/category_id/" + catId, {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data
                console.log('getAllArticlesAllCategories')
                console.log(response.data)
                setDisplayArticles(data);
                setTotalPages(Math.ceil(allArtForNum.length / numOfArticlesPerPage));
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
        setTotalPages(Math.ceil(allArtForNum.length / numOfArticlesPerPage));
    }


    return (
        <div className='all_articles_admin__page'>
            <div className='all_articles_admin__header'>
                <div className='sportshub'>Sports hub</div>
                <div className='all_articles_admin__right_header'>
                    <button>
                        <img src={accountSwitcher} width='30%' height='30%'/>
                    </button>
                    <div></div>
                </div>
            </div>

            <div className='all_articles_admin__current_category__new_article'>
                <div className='all_articles_admin__current_category'>
                    {currentCategory.name !== null ? currentCategory.name : "HOME"}
                </div>
                <div className='all_articles_admin__new_article'>
                    <AddNewArticleBtn/>
                </div>
            </div>

            <div className='all_articles_admin__categories_buttons'>
                <div className='horizontal_scroll_menu'>
                    <ScrollMenu itemClassName='scroll_menu'
                                LeftArrow={LeftArrow}
                                RightArrow={RightArrow}
                                options={{
                                    ratio: 0.9,
                                    rootMargin: "5px",
                                    threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                                }}
                    >
                        <div className='category_button'>
                            <button onClick={getAllArticlesAllCategoriesWithPagination}>HOME</button>
                        </div>

                        {/*<div className='category_button'>*/}
                        {/*    <button onClick={getAllArticlesByCategoryId(9)}>SOCCER</button>*/}
                        {/*</div>*/}

                        {
                            categories.map(category => <div className='category_button'>
                                <button /*onClick={setCurrentCategory(category)}*/>{category.name.toUpperCase()}</button>
                            </div>)
                        }
                    </ScrollMenu>
                </div>
            </div>


            <div className='all_articles_admin__body'>
                <div className='all_articles_admin__left_buttons'>
                    <SidePanelBtns/>
                </div>
                <div className='all_articles_admin__articles'>
                    <div className='all_articles_admin__filter_articles'>
                        <div className='filter_articles'>
                            <select className="form-select form-select-sm">
                                <option>All</option>
                                <option>Published</option>
                                <option>Unpublished</option>
                            </select>
                        </div>
                        <div className='filter_articles'>

                        </div>
                        <div className='filter_articles'>

                        </div>
                    </div>
                    {
                        displayArticles.map(article =>
                            <ShortArticleAdmin title={article.title} shortText={article.shortText}
                                               category={article.category.name} isPublished={article.isActive}/>
                        )
                    }
                </div>

            </div>

            <div className='pagination__component'>
                <div className='pagination__pages'>
                    <Pagination count={totalPages} page={currentPage} onChange={(_, num) => setCurrentPage(num)}/>
                </div>
            </div>

        </div>
    );
};

export default AllArticlesAdmin3;