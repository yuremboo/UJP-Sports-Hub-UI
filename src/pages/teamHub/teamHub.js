import React, { useEffect, useState } from "react";
import "./teamhub.css";
import MiniArticle from "../../Components/article/MiniArticle";
import axios from "axios";
import TeamComponent from "../../Components/team/TeamComponent";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar/MainNavBar";


const TeamHub = () => {
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
  useEffect(() => {
    getTeamsFollow();
    getMorePopularArticles();
  }, []);

  function getTeamsFollow() {
    console.log("function getTeamsFollow");
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    console.log("token: ", set1AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/teams/subscription", {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getTeams");
        console.log(response.data);
        setTeamsSubscription(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getMorePopularArticles() {
    console.log("function getMorePopularArticles");
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    console.log("token: ", set1AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/v1/articles/morePopular", {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getMorePopularArticles");
        console.log(response.data);
        setMorePopularArticles(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
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
                teamsSubscription.map(team =>
                  <TeamComponent team={team} />
                )
              }
            </div>
            <div className="mini-articles">
              <div className="mini-articles-l">
                <span className="more-popular">MORE POPULAR</span>
                <hr className="more-lin-l"></hr>
                {morePopularArticles.map((miniArticle) => (
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
    </div>
  );
};

export default TeamHub;