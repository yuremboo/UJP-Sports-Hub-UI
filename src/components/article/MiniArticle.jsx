import React from "react";
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import "../../style_components/article/miniarticle.css";

const MiniArticle = ({miniArticle}) => {
  return (
    <a className="article-link" href={"http://localhost:3000/articles/" + miniArticle.id}>
      <div className="mini-article">
        <img className="mini-article-img" src={miniArticlePhoto} alt={miniArticle.alt} />
        <div className="mini-article-text">
          <span className="heading">{miniArticle.title}</span>
          <span className="text-preview">
            {miniArticle.shortText}
          </span>
        </div>
      </div>
    </a>
  );
};

export default MiniArticle;
