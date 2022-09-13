import React from "react";
import mediumArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/medium-article.css";
import arrow from "../../icons/arrow-red.svg"

const MediumArticle = ({mediumArticle}) => {
  return (
    <a className="article-link" href="#">
      <div className="medium-article">
        <div className="category">
            <p className="category__text">{mediumArticle.category}</p>
        </div>
        <img className="medium-article-img" src={mediumArticlePhoto} alt="article-img" />
        <div className="medium-article-text">
          <span className="heading">{mediumArticle.title}</span>
        </div>
        <div className="breakdown-arrow">
            <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </a>
  );
};

export default MediumArticle;