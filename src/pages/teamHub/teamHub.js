import React, { useEffect, useState } from "react";
import "./teamhub.css";
import MiniArticle from "../../components/article/MiniArticle";
import axios from "axios";
import ReactDOM from "react-dom";
import TeamComponent from "../../components/team/TeamComponent";
import Heder from "../../components/Header";
import Navbar from "../../components/NavBar";

const TeamHub = () => {
  const miniHeading = "Lorem ipsum";
  const miniTextPreview = "Lorem ipsum dolor sit amet, consectetur";
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

    <div className="team_hub">

      {/*<Heder />*/}
      {/*<div className="team_">*/}
      {/*  <Navbar />*/}
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
      // </div>
  );
};

export default TeamHub;