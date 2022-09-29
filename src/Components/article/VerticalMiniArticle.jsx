import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/verticalminiarticle.css";
import arrow from "../../icons/arrow-red.svg"
import { Link } from "react-router-dom";

const VerticalMiniArticle = ({verticalMiniArticle}) => {
  return (
    <Link className="article-link" to={"/articles/" + verticalMiniArticle.id}>
      <div className="v-mini-article">
        <img className="v-mini-article-img" src={verticalMiniArticle.picture ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + verticalMiniArticle.picture) : miniArticlePhoto} alt="article-img" />
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
    </Link>
  );
};

export default VerticalMiniArticle;
