import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MiniArticle from "../article/MiniArticle";
import "./mostcommentedarticles.css";

const MostCommentedArticles = () => {
  const [mostCommentedArticles, setMostCommentedArticles] = useState([]);
  useEffect(() => {
    getMostCommentedArticles();
  }, []);

  function getMostCommentedArticles() {
    axios.get("https://ujp-sports-hub.herokuapp.com/api/v1/articles/most_commented", {
    })
      .then((response) => {
        setMostCommentedArticles(response.data);
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
        <span>MOST COMMENTED </span>
        <hr/>
      </div>
      {
        mostCommentedArticles.map(article => <MiniArticle miniArticle={article}/>)
      }
    </div>
  );
};

export default MostCommentedArticles;