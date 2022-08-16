import React from 'react';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import '../../style_components/article/miniarticle.css';

const MiniArticle = () => {
    return (
        <div className="mini-article">
            <img src={miniArticlePhoto} alt="article"/>
            <div className="mini-article-text">
            <span className="heading">
            Lorem ipsum
          </span>
                <span className="text-preview">
            Lorem ipsum dolor sit amet, consectetur
          </span>
            </div>
        </div>
    );
};

export default MiniArticle;