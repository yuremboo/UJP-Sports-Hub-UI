import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/verticalminiarticle.css";
import arrow from "../../icons/arrow-red.svg"

const VerticalMiniArticle = ({verticalMiniArticle}) => {
  return (
    <a className="article-link" href={"http://localhost:3000/articles/" + verticalMiniArticle.id}>
      <div className="v-mini-article">
        <img className="v-mini-article-img" src={miniArticlePhoto} alt="article-img" />
        <div className="v-mini-article-text">
          <span className="v-heading">{verticalMiniArticle.caption}</span>
          <span className="v-text-preview">
            {verticalMiniArticle.title}{verticalMiniArticle.id}
          </span>
        </div>
        <div className="v-breakdown-arrow">
            <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </a>
  );
};

export default VerticalMiniArticle;
