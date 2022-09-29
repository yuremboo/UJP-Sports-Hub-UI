import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/miniarticle.css";
import arrow from "../../icons/arrow-red.svg"
import { Link } from "react-router-dom";

const MiniArticle = ({miniArticle}) => {
  return (
    <Link className="article-link" to={"/articles/" + miniArticle.id}>
      <div className="mini-article">
        <img className="mini-article-img" src={miniArticle.picture ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + miniArticle.picture) : miniArticlePhoto} alt="article-img" />
        <div className="mini-article-text">
          <span className="heading">{miniArticle.caption}</span>
          <span className="text-preview">
            {miniArticle.title}
          </span>
        </div>
        <div className="breakdown-arrow">
            <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </Link>
  );
};

export default MiniArticle;
