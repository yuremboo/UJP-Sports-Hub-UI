import React from 'react';
import './TeamIcon.css';
import miniArticlePhoto from "../../icons/article/MiniArticlePhoto.jpg";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const TeamIcon = (props) => {
    let navigate = useNavigate();
    function deleteSubscription(subscription) {
      const set1AuthToken = JSON.parse(localStorage.getItem('user'))
      console.log('token: ', set1AuthToken['jwt']);
      axios.delete("http://localhost:8080/api/v1/subscription/" + props.subscriptionId+"/team", {
        headers: {
          authorization:set1AuthToken['jwt'],
        }
      })
          .then((response)=>{
              navigate(0);
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
        <img src={props.logo ? ("http://localhost:8080/api/v1/image/" + props.logo) : miniArticlePhoto} />
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