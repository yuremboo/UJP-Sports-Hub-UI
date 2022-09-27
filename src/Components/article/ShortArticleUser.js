import React from 'react';
import '../../style_components/article/shortarticle.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";

const ShortArticleUser = ({shortArticle}) => {
    return (
        <a className="article-link" href={"http://localhost:3000/articles/" + shortArticle.id}>
            <div className='shortArticle'>
                <div className='shortarticle__image'>
                    <img className='s_img' src={miniArticlePhoto}/>
                </div>
                <div className='shortarticle__body'>
                    <div className='shortarticle__title'>
                        {shortArticle.title}
                    </div>
                    <div className='shortarticle__short_text'>
                        {shortArticle.shortText}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ShortArticleUser;