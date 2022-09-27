import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MiniArticle from "../article/MiniArticle";
//import "./mostCommentedArticles/mostcommentedarticles.css";

const MorePopularArticles = () => {
    const authToken = "Bearer " + JSON.parse(localStorage.getItem("user")).jwt;
    const [morePopularArticles, setMorePopularArticles] = useState([]);
    useEffect(() => {
        getMorePopularArticles();
    }, []);

    function getMorePopularArticles() {
        axios.get("http://localhost:8080/api/v1/articles/morePopular", {
            headers: {
                "Authorization": authToken
            }
        })
            .then((response) => {
                setMorePopularArticles(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    return (
        <div className="most_commented_articles_component">
            <div className="most_commented_title">
                <span>MORE POPULAR </span>
                <hr/>
            </div>
            {
                morePopularArticles.map(article => <MiniArticle miniArticle={article}/>)
            }
        </div>
    );
};

export default MorePopularArticles;