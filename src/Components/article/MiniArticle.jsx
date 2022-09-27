import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/miniarticle.css";
import arrow from "../../icons/arrow-red.svg"

const MiniArticle = ({miniArticle}) => {
  return (
    <a className="article-link" href={"http://localhost:3000/articles/" + miniArticle.id}>
      <div className="mini-article">
        <img className="mini-article-img" src={miniArticlePhoto} alt="article-img" />
        <div className="mini-article-text">
          <span className="heading">{miniArticle.caption}</span>
          <span className="text-preview">
            {miniArticle.title}{miniArticle.id}
          </span>
        </div>
        <div className="breakdown-arrow">
            <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </a>
  );
};

export default MiniArticle;
