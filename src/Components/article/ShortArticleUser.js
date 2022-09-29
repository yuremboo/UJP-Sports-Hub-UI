import React from 'react';
import '../../style_components/article/shortarticle.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import { Link } from 'react-router-dom';

const ShortArticleUser = ({shortArticle}) => {
    return (
        <Link className="article-link" to={"/articles/" + shortArticle.id}>
            <div className='shortArticle'>
                <div className='shortarticle__image'>
                    <img className='s_img' src={shortArticle.picture ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + shortArticle.picture) : miniArticlePhoto}/>
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
        </Link>
    );
};

export default ShortArticleUser;