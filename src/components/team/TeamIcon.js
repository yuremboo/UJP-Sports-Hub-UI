import React from 'react';
import './TeamIcon.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";

import MiniArticle from "../../Components/article/MiniArticle";

const TeamIcon = (props) => {
  return (
    <div className='shortArticle'>
      <div className='shortarticle__image'>
        <img src={miniArticlePhoto} />
        {/*{props.image}*/}
      </div>

      <div className='shortarticle__body'>
        <div className='shortarticle__title'>
          {props.title}
        </div>
        <div className='shortarticle__bottom'>
          <div className='shortarticle__category'>
            {props.following}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamIcon;