import React from 'react';
import './TeamIcon.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";


const TeamIcon = (props) => {
  return (
    <div className='team'>
      <div className='team_image'>
        <img src={miniArticlePhoto} />
        {/*{props.image}*/}
      </div>

      <div className='team_body'>
        <div className='team_title'>
          {props.title}
        </div>
        <div className='team_bottom'>
          <div className='team_following'>
            {props.following}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamIcon;