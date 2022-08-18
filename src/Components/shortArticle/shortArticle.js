import React from 'react';
import './shortarticle.css';

const ShortArticle = (props) => {
    return (
        <div className='shortArticle'>
            <div className='shortarticle__image'>

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

export default ShortArticle;