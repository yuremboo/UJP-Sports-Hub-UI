import React from 'react';
import './shortarticleadmin.css';
import articleImage from "../../icons/shortArticleImg.jpg";

const ShortArticleAdmin = (props) => {
    return (
        <div className='shortArticle'>
            <div className='shortarticle__image'>
                <img src={articleImage} alt="article"
                     width="100%" height="100%"/>
            </div>

            <div className='shortarticle__body'>
                <div className='shortarticle__title'>
                    {props.title}
                </div>
                <div className='shortarticle__short_text'>
                    {props.shortText}
                </div>
                <div className='shortarticle__bottom'>
                    <div className='shortarticle__category'>
                        {props.category}
                    </div>
                    <div className='shortarticle__is_published'>
                        {props.isPublished}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortArticleAdmin;