import React, {useEffect, useState} from 'react';
import './TeamComponent.css';
import TeamIcon from "./TeamIcon";
import ShortArticle from "../article/ShortArticleUser";
import axios from "axios";

export default function TeamComponent({team, isSubscribed}) {
  console.log(isSubscribed);
  console.log(isSubscribed);
  const [articlesByTeamsId, setArticlesByTeamsId] = useState([
    // {
    //   "id": "1",
    //   "title": "I'ts title of article 1",
    //   "shortText": "I'ts short text article 1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   "isActive": true,
    //   "category": {
    //     "id": "1",
    //     "name": "soccer",
    //     "description": "its description11",
    //     "isActive": true,
    //     "createDateTime": "2002-11-12T00:00:00",
    //     "updateDateTime": "2021-11-12T00:00:00",
    //     "parent": null
    //   }
    // },
    // {
    //   "id": "2",
    //   "title": "It is a title of article 2",
    //   "shortText": "I'ts a short text article 2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    //   "isActive": true,
    //   "category": {
    //     "id": "1",
    //     "name": "soccer",
    //     "description": "its description11",
    //     "isActive": true,
    //     "createDateTime": "2002-11-12T00:00:00",
    //     "updateDateTime": "2021-11-12T00:00:00",
    //     "parent": null
    //   }
    // },
    // {
    //   "id": "5",
    //   "title": "its title article 5",
    //   "shortText": "I'ts short text article 5. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   "isActive": false,
    //   "category": {
    //     "id": "1",
    //     "name": "soccer",
    //     "description": "its description11",
    //     "isActive": true,
    //     "createDateTime": "2002-11-12T00:00:00",
    //     "updateDateTime": "2021-11-12T00:00:00",
    //     "parent": null
    //   }
    // },
    // {
    //   "id": "6",
    //   "title": "It is title article 6",
    //   "shortText": "It is text article 6 and it is first sentence. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //   "isActive": true,
    //   "category": {
    //     "id": "1",
    //     "name": "soccer",
    //     "description": "its description11",
    //     "isActive": true,
    //     "createDateTime": "2002-11-12T00:00:00",
    //     "updateDateTime": "2021-11-12T00:00:00",
    //     "parent": null
    //   }
    // },
    // {
    //   "id": "7",
    //   "title": "its title article 7",
    //   "shortText": "First sentence of article 7. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   "isActive": true,
    //   "category": {
    //     "id": "1",
    //     "name": "soccer",
    //     "description": "its description11",
    //     "isActive": true,
    //     "createDateTime": "2002-11-12T00:00:00",
    //     "updateDateTime": "2021-11-12T00:00:00",
    //     "parent": null
    //   }
    // }
  ]);

  useEffect(() => {
    getArticleByTeamsFollow();
  }, []);

  function getArticleByTeamsFollow() {
    const url = isSubscribed ? "teams": "team";
    console.log('function getArticleByTeamsFollow');
    const set1AuthToken = JSON.parse(localStorage.getItem('user'))
    console.log('token: ', set1AuthToken['jwt']);
    console.log(team);
    console.log(team.team.id)
    axios.get(`http://localhost:8080/api/v1/articles/${url}/${team.team.id}`, {
      // headers: {
      //   authorization:set1AuthToken['jwt'],
      // }
    })
      .then((response) => {
        const data = response.data
        console.log('getArticles')
        console.log(response.data)
        setArticlesByTeamsId([...data])
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
  }
  return (
    <div className='team_component'>
      <div className='team_head'>
        {team.subscriptionId && 
        
        <TeamIcon title={team.team.name} image={team.team.alt} subscriptionId={team.subscriptionId} following={"following"} />
        }
      </div>

      <div className='team_component_body'>
        {articlesByTeamsId.map(article =>
             <ShortArticle title={article.title} shortText={article.shortText} category={null}  />)}
      </div>
    </div>
  );
};