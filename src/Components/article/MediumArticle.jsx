import React from "react";
import mediumArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/medium-article.css";
import arrow from "../../icons/arrow-red.svg"
import { Link } from "react-router-dom";

const MediumArticle = ({mediumArticle}) => {
  return (
    <Link className="article-link" to={"/articles/" + mediumArticle.id}>
      <div className="medium-article">
        <div className="category">
            <p className="category__text">{mediumArticle.category}</p>
        </div>
        <img className="medium-article-img" src={mediumArticle.picture ? ("http://localhost:8080/api/v1/image/" + mediumArticle.picture) : mediumArticlePhoto} alt="article-img" />
        <div className="medium-article-text">
          <span className="heading">{mediumArticle.title}</span>
        </div>
        <div className="breakdown-arrow">
            <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </Link>
  );
};

export default MediumArticle;