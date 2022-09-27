import React, { useEffect, useState } from "react";
import "./teamhub.css";
import MiniArticle from "../../Components/article/MiniArticle";
import axios from "axios";
import TeamComponent from "../../Components/team/TeamComponent";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar/MainNavBar";
import {
  userGetLocationRequest
} from '../../redux/auth/auth.actions'
import { connect, useSelector } from 'react-redux'
import MostCommentedArticles from "../../Components/mostCommentedArticles/MostCommentedArticles";
import MorePopularArticles from "../../Components/morePopularArticles/MorePopularArticles";
import Footer from "../../Components/Footer";

const TeamHub = ({ getLocation }) => {
  // const { userLocation } = auth;
  const userLocation = useSelector(state => state.auth.userLocation);
  console.log(userLocation, "location");
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [teamsSubscription, setTeamsSubscription] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  useEffect(() => {
    getTeamsFollow("subscription");
    getLocation();
  }, []);

  function getTeamsFollow(url) {
    console.log(url);
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:8080/api/v1/teams/${url!=="subscription" ? userLocation: "subscription" }`, {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        if(url === "subscription"){
          setIsUserSubscribed(true);
          setTeamsSubscription(prevState => [...data]);
        } else{
          setIsUserSubscribed(false);
          setTeamsSubscription(prevState => data.map(team => ({team:team})))
        }

        if (data.length === 0) {
          setIsPopupOpened(true);
          setTeamsSubscription([]);
        }
      })
      .catch((error) => {
        if (error.response) {
        }
      });
  }
  return (
    <div className={"header-information"}>
      <Header />

      <div className={"nav-bar-information"}>
        <div className={"nav-bar"}>
          <NavBar />
        </div>
        <div className="team_hub">

          <div className="all_articles_body">

            <div className="all_teams">
              {
                teamsSubscription.map((team, index) =>
                       <TeamComponent key={index} team={team} isSubscribed={isUserSubscribed} />

                )
              }
            </div>
            <div className='most-popular-and-commented-section'>
              <div className='most-popular-section'>
                <MorePopularArticles/>
              </div>
              <div className='most-commented-section'>
                <MostCommentedArticles/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpened &&
        <div className="geolocation-popup">
          <button className="geolocation-popup__button-close" onClick={() => {
            setIsPopupOpened(false)
          }}>×</button>
          <h2 className="geolocation-popup__headline">Geolocation needed</h2>
          <p className="geolocation-popup__paragraph">
            You haven't configured your favotite teams yet. Do you want to use your geolocation to show corresponding teams?
          </p>
          <button className="geolocation-popup__button-accept" onClick={async () => {
            setIsPopupOpened(false);
            console.log(userLocation, "location form above");
            await getTeamsFollow(userLocation)
          }
          }>Accept</button>
        </div>
      }
      {/*<Footer/>*/}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => dispatch(userGetLocationRequest()),
})


export default connect(null, mapDispatchToProps)(TeamHub);