import React, {useEffect, useState} from "react";
import "./categorypage.css";
import {useParams} from "react-router-dom";
import ArticleHeading from "../../Components/article/ArticleHeading";
import articleImage from "../../icons/article/ArticlePhoto.jpg";
import ShortArticleUser from "../../Components/article/ShortArticleUser";
import axios from "axios";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar/MainNavBar";
import MostCommentedArticles from "../../Components/mostCommentedArticles/MostCommentedArticles";
import MorePopularArticles from "../../Components/morePopularArticles/MorePopularArticles";

const CategoryPage = ({props, globalStore}) => {
    const [articlesByCategory, setArticlesByCategory] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        getArticleByCategory(id);
    }, []);

    function getArticleByCategory(id) {
        axios.get("http://localhost:8080/api/v1/articles/category_id/" + id + "/is_active/true", {})
            .then((response) => {
                const data = response.data;
                setArticlesByCategory(response.data.content);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    const [auth] = useState("Bearer ");
    return (
        <div className={"header-information"}>
            <Header/>

            <div className={"nav-bar-information"}>
                <div className={"nav-bar"}>
                    <NavBar/>
                </div>
                <div className="category_page">
                    {articlesByCategory.slice(0, 1).map((article) => (

                        <ArticleHeading
                            article={article}
                            isArticlePage={false}
                        />))}
                    {articlesByCategory.slice(0, 1).map((article) => (
                        <img
                            className="article-image"
                            alt={article["alt"]}
                            src={article.picture ? ("http://localhost:8080/api/v1/image/" + article.picture) : articleImage}
                        />
                    ))}
                    <div className="category_articles">
                        {
                            articlesByCategory.map(article => <ShortArticleUser shortArticle={article}/>)
                        }
                    </div>
                    <div className='most-popular-and-commented-section_category_page'>
                        <div className='most-popular-section_category_page'>
                            <MorePopularArticles/>
                        </div>
                        <div className='most-commented-section_category_page'>
                            <MostCommentedArticles/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
