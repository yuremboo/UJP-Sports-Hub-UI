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


const TeamHub = ({ getLocation }) => {
  // const { userLocation } = auth;
  const userLocation = useSelector(state => state.auth.userLocation);
  console.log(userLocation, "location");
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [teamsSubscription, setTeamsSubscription] = useState([
    // {
    //   "subscriptionId": "1",
    //   "team": {
    //     "id": "1",
    //     "name": "name",
    //     "location": "location",
    //     "logo": 1,
    //     "description": "description",
    //     "createDateTime": "1998-11-13T00:00:00",
    //     "updateDateTime": "1976-04-13T00:00:00",
    //     "category": {
    //       "id": "1",
    //       "name": "name",
    //       "description": "Description",
    //       "isActive": true,
    //       "createDateTime": "1998-11-13T00:00:00",
    //       "updateDateTime": "1976-04-13T00:00:00",
    //       "parent": {
    //         "id": "2",
    //         "name": "name",
    //         "description": "Description",
    //         "isActive": true,
    //         "createDateTime": "1998-11-13T00:00:00",
    //         "updateDateTime": "1976-04-13T00:00:00",
    //         "parent": null
    //       }
    //     }
    //   }
    // }  
  ]);

  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const [articlesByTeamsId, setArticlesByTeamsId] = useState([
    {
      "id": "1",
      "title": "I'ts title of article 1",
      "shortText": "I'ts short text article 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "isActive": true,
      "category": {
        "id": "1",
        "name": "soccer",
        "description": "its description11",
        "isActive": true,
        "createDateTime": "2002-11-12T00:00:00",
        "updateDateTime": "2021-11-12T00:00:00",
        "parent": null
      }
    },
    {
      "id": "2",
      "title": "It is a title of article 2",
      "shortText": "I'ts a short text article 2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "isActive": true,
      "category": {
        "id": "1",
        "name": "soccer",
        "description": "its description11",
        "isActive": true,
        "createDateTime": "2002-11-12T00:00:00",
        "updateDateTime": "2021-11-12T00:00:00",
        "parent": null
      }
    },
    {
      "id": "5",
      "title": "its title article 5",
      "shortText": "I'ts short text article 5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "isActive": false,
      "category": {
        "id": "1",
        "name": "soccer",
        "description": "its description11",
        "isActive": true,
        "createDateTime": "2002-11-12T00:00:00",
        "updateDateTime": "2021-11-12T00:00:00",
        "parent": null
      }
    },
    {
      "id": "6",
      "title": "It is title article 6",
      "shortText": "It is text article 6 and it is first sentence. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "isActive": true,
      "category": {
        "id": "1",
        "name": "soccer",
        "description": "its description11",
        "isActive": true,
        "createDateTime": "2002-11-12T00:00:00",
        "updateDateTime": "2021-11-12T00:00:00",
        "parent": null
      }
    },
    {
      "id": "7",
      "title": "its title article 7",
      "shortText": "First sentence of article 7. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "isActive": true,
      "category": {
        "id": "1",
        "name": "soccer",
        "description": "its description11",
        "isActive": true,
        "createDateTime": "2002-11-12T00:00:00",
        "updateDateTime": "2021-11-12T00:00:00",
        "parent": null
      }
    }
  ]);
  useEffect(() => {
    getTeamsFollow("subscription");
    getMorePopularArticles();
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

  function getMorePopularArticles() {
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    axios.get("http://localhost:8080/api/v1/articles/morePopular", {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        setMorePopularArticles(data);
      })
      .catch((error) => {
        if (error.response) {
        }
      });
  }

  const [morePopularArticles, setMorePopularArticles] = useState([]);
  const miniArticles = [
    {
      id: "2fff",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur1",
      isActive: true,
      category: ""
    },
    {
      id: "2ffa",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur2",
      isActive: true,
      category: ""
    },
    {
      id: "2ffb",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur3",
      isActive: true,
      category: ""
    },
    {
      id: "2ffc",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur4",
      isActive: true,
      category: ""
    },
    {
      id: "2ffd",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur5",
      isActive: true,
      category: ""
    },
    {
      id: "2ffe",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur6",
      isActive: true,
      category: ""
    }
  ];


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
            <div className="mini-articles">
              <div className="mini-articles-l">
                <span className="more-popular">MORE POPULAR</span>
                <hr className="more-lin-l"></hr>
                {morePopularArticles.slice(0, 3).map((miniArticle) => (
                  <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
                ))}
              </div>
              <div className="mini-articles-r">
                <span className="more-commented">MORE COMMENTED</span>
                <hr className="more-lin-r" />
                {miniArticles.slice(3, 7).map((miniArticle) => (
                  <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
                ))}
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => dispatch(userGetLocationRequest()),
})


export default connect(null, mapDispatchToProps)(TeamHub);