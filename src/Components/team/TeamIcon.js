import React from 'react';
import './TeamIcon.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import Button from "react-bootstrap/Button";
import axios from "axios";
const TeamIcon = (props) => {
    function deleteSubscription(subscription) {
      const set1AuthToken = JSON.parse(localStorage.getItem('user'))
      console.log('token: ', set1AuthToken['jwt']);
      axios.delete("http://localhost:8080/api/subscription/" + props.subscriptionId+"/team", {
        headers: {
          authorization:set1AuthToken['jwt'],
        }
      })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("error.response.status: ", error.response.status);
          }
        });
    }


  return (
    <div className='team_icon'>
      <div className='team_icon_image'>
        <img src={miniArticlePhoto} />
        {/*{props.image}*/}
      </div>

      <div className='team_icon_body'>
        <div className='team_icon_button'>
          <Button id='unfollow_button_icon' variant="contained" onClick={deleteSubscription}>
            Unfollow
          </Button>
        </div>

        <div className='team_icon_title'>
          {props.title}
        </div>

        <div className='team_icon_bottom'>
          <div className='team_icon_following'>
            {props.following}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamIcon;