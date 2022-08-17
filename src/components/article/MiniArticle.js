import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/miniarticle.css";

const MiniArticle = (props) => {
  return (
    <a className="article-link" href="#">
      <div className="mini-article">
        <img src={miniArticlePhoto} alt="article" />
        <div className="mini-article-text">
          <span className="heading">{props.heading}</span>
          <span className="text-preview">
            {props.textPreview}
          </span>
        </div>
      </div>
    </a>
  );
};

export default MiniArticle;
