import React from 'react';
import '../../style_components/article/shortarticle.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import { Link } from 'react-router-dom';

const ShortArticleUser = (props) => {
  return (
    <Link className="short-article-link" to={"/articles/" + props.id}>
    <div className='shortArticle'>
      <div className='shortarticle__image'>
        <img className='s_img' src={miniArticlePhoto} />
        {/*{props.image}*/}
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
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ShortArticleUser;