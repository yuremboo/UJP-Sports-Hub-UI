import React, {useEffect, useState} from 'react';
import axios from "axios";
import ShortArticleAdmin from "../../components/shortArticle/shortArticleAdmin";
import CategoryButton from "../../components/shortArticle/categoryButton";
import './allarticlesadmin.css';
import AddNewArticleBtn from "../../components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../components/shortArticle/sidePanelBtns";
import accountSwitcher from '../../icons/accountSwitcher.svg';
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow} from "../../components/horizontal-scroll-menu/arrows";

const AllArticlesAdmin = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
    const [numOfPages, setNumOfPages] = useState(5)
    const [pages, setPages] = useState([]);

    const authToken = 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt;

    function paginationBack(){
        console.log('before back: ', currentPage);
        if (currentPage > 0){
            setCurrentPage(currentPage-1);
        }
        console.log('after back: ', currentPage);
    }
    function paginationForward(){
        console.log('before forward: ', currentPage);
        if (currentPage < 5){ // !
            setCurrentPage(currentPage+1);
        }
        console.log('after forward: ', currentPage);
    }

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getAllCategories();
    }, []);
    function getAllCategories() {
        // console.log('function getAllCategories');
        // console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/categories", {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('getCategories data:');
                console.log(response.data);
                setCategories(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }


    const [allArticles, setAllArticles] = useState(
        [
            {
                "id": "1",
                "title": "I'ts title of article 1",
                "shortText": "I'ts short text article 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                "isActive": true,
                "category": {
                    "id": "1",
                    "name": "soccer",
                    "description": "its description11",
                    "isActive": true,
                    "createDateTime": "2002-11-12T00:00:00",
                    "updateDateTime": "2021-11-12T00:00:00",
                    "parent": null
                }
            },
            {
                "id": "2",
                "title": "It is a title of article 2",
                "shortText": "I'ts a short text article 2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                "isActive": true,
                "category": {
                    "id": "1",
                    "name": "soccer",
                    "description": "its description11",
                    "isActive": true,
                    "createDateTime": "2002-11-12T00:00:00",
                    "updateDateTime": "2021-11-12T00:00:00",
                    "parent": null
                }
            },
            {
                "id": "5",
                "title": "its title article 5",
                "shortText": "I'ts short text article 5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                "isActive": false,
                "category": {
                    "id": "1",
                    "name": "soccer",
                    "description": "its description11",
                    "isActive": true,
                    "createDateTime": "2002-11-12T00:00:00",
                    "updateDateTime": "2021-11-12T00:00:00",
                    "parent": null
                }
            },
            {
                "id": "6",
                "title": "It is title article 6",
                "shortText": "It is text article 6 and it is first sentence. ",
                "isActive": true,
                "category": {
                    "id": "1",
                    "name": "soccer",
                    "description": "its description11",
                    "isActive": true,
                    "createDateTime": "2002-11-12T00:00:00",
                    "updateDateTime": "2021-11-12T00:00:00",
                    "parent": null
                }
            },
            {
                "id": "7",
                "title": "its title article 7",
                "shortText": "First sentence of article 7. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                "isActive": true,
                "category": {
                    "id": "1",
                    "name": "soccer",
                    "description": "its description11",
                    "isActive": true,
                    "createDateTime": "2002-11-12T00:00:00",
                    "updateDateTime": "2021-11-12T00:00:00",
                    "parent": null
                }
            }
        ]);
    useEffect(() => {
        getAllArticlesAllCategories();
        setNumOfPages(Math.ceil(allArticles.length/numOfPages));
        console.log('num of p ', numOfPages);
        // for (var i = 0; i < numOfPages; i++) {
        //     setPages(...i);
        //     // ещё какие-то выражения
        // }
    }, []);
    function getAllArticlesAllCategories() {
        console.log('function getAllArticlesAllCategories');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/v1/admin/articles", {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data
                console.log('getAllArticlesAllCategories')
                console.log(response.data)
                setAllArticles(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }

    const [articlesWithPagination, setArticlesWithPagination] = useState([])
    useEffect(() => {
        getAllArticlesAllCategoriesWithPagination();
    }, [currentPage]);
    function getAllArticlesAllCategoriesWithPagination() {
        console.log('function getAllArticlesAllCategoriesWithPagination');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/v1/admin/articles?page="+currentPage+"&size="+sizeOfArticlesOnPage, {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('getAllArticlesAllCategories');
                console.log(response.data);
                setArticlesWithPagination(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }


    function getAllArticlesByCategoryId() {
        console.log('function getAllArticlesByCategoryId');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/admin/articles/category_id/"+currentCategory.id, {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data
                console.log('getAllArticlesAllCategories')
                console.log(response.data)
                setAllArticles(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }

    const [currentCategory, setCurrentCategory] = useState({"id": "0", "name": "HOME"});

    // function findAllArticlesByCategoryId(currCategory) {
    //     setCurrentCategory(currCategory);
    //     getAllArticlesByCategoryId(currentCategory.id);
    // }
    //
    // function changeCurrentCategory(category){
    //     setCurrentCategory(category);
    // }

    return (
        <div className='all_articles_admin__page'>
            <div className='all_articles_admin__header'>
                <div className='sportshub'>Sports hub</div>
                <div className='all_articles_admin__right_header'>
                    <button>
                        <img src={accountSwitcher} width='30%' height='30%'/>
                    </button>
                    <div> </div>
                </div>
            </div>

            <div className='all_articles_admin__current_category__new_article'>
                <div className='all_articles_admin__current_category'>
                    {currentCategory.name}
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
                            <button onClick={getAllArticlesAllCategories}>HOME</button>
                        </div>
                        {
                            categories.map(category => <div className='category_button'>
                                {/*{setCurrentCategory(category)}*/}
                                <button>{category.name.toUpperCase()}</button>
                            </div>)
                        }
                    </ScrollMenu>
                    {/*<button onClick={setCurrentCategory({"id": "1", "name": "NBA"})}>NBA</button>*/}
                    {/*<button onClick={setCurrentCategory({"id": "1", "name": "SOCCER"})}>SOCCER</button>*/}
                </div>


                {/*<div className="categories_buttons__left_arrow">*/}
                {/*    <button>*/}
                {/*        <img src={arrow} alt='arrow'/>*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*{*/}
                {/*    categories.map(category => <div className='category_button'>*/}
                {/*        <button onClick={*/}
                {/*            // setCurrentCategory(category.id);*/}
                {/*            findArticlesByCategoryId(category.id)*/}
                {/*        }>{category.name.toUpperCase()}</button>*/}
                {/*    </div>)*/}
                {/*}*/}

                {/*<div className="categories_buttons__right_arrow">*/}
                {/*    <button>*/}
                {/*        <img src={arrow} alt='arrow'/>*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>


            <div className='all_articles_admin__body'>
                <div className='all_articles_admin__left_buttons'>
                    <SidePanelBtns/>
                </div>
                <div className="all_articles_admin__articles">
                    {
                        articlesWithPagination.map(article =>
                            <ShortArticleAdmin title={article.title} shortText={article.shortText}
                                               category={article.category.name} isPublished={article.isActive}/>
                        )
                    }
                </div>

            </div>

            <div className='pagination__component'>
                <div className='pagination__back_button'>
                    <button onClick={paginationBack}/>
                </div>

                <div className='pagination__pages'>
                    {/*{*/}
                    {/*    pages.map(page => <div className='pagination_number_page'>*/}
                    {/*        {page}*/}
                    {/*    </div>)*/}
                    {/*}*/}


                    <div className='pagination_number_active_page'>
                        01
                    </div>
                    <div className='pagination_number_page'>
                        02
                    </div>
                    <div className='pagination_number_page'>
                        03
                    </div>
                    <div className='pagination_number_page'>
                        04
                    </div>
                </div>

                <div className='pagination__forward_button'>
                    <button onClick={paginationForward}/>
                </div>

            </div>

        </div>
    );
};

export default AllArticlesAdmin;