import React, {useEffect, useState} from 'react';
import "./teamhub.css";
import MiniArticle from "../../Components/article/MiniArticle";
import ShortArticle from "../../Components/article/ShortArticle";
import TeamIcon from "../../Components/team/TeamIcon";
import axios from "axios";
import ReactDOM from 'react-dom';
import TeamComponent from "../../Components/team/TeamComponent";
const TeamHub = () => {
    const miniHeading = "Lorem ipsum";
    const miniTextPreview = "Lorem ipsum dolor sit amet, consectetur";
    const [teamsSubscription, setTeamsSubscription] = useState([
        {
            "id": "1",
            "name": "name",
            "location": "location",
            "logo": 1,
            "description": "description",
            "createDateTime": "1998-11-13T00:00:00",
            "updateDateTime": "1976-04-13T00:00:00",
            "category": {
                "id": "1",
                "name": "name",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": {
                    "id": "2",
                    "name": "name",
                    "description": "Description",
                    "isActive": true,
                    "createDateTime": "1998-11-13T00:00:00",
                    "updateDateTime": "1976-04-13T00:00:00",
                    "parent": null
                }
            }
        }
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
        getArticleByTeamsFollow(0);
    }, []);

    function getTeamsFollow() {
        console.log('function getTeamsFollow');
        const set1AuthToken = JSON.parse(localStorage.getItem('user'))
        console.log('token: ', set1AuthToken['jwt']);
        axios.get("http://localhost:8080/api/teams/subscription", {
            headers: {
                authorization:set1AuthToken['jwt'],
            }
        })
          .then((response) => {
              const data = response.data
              console.log('getTeams')
              console.log(response.data)
              setTeamsSubscription(data)
          })
          .catch((error) => {
              if (error.response) {
                  console.log(error.response);
                  console.log("error.response.status: ", error.response.status);
              }
          })
    }
    function getArticleByTeamsFollow(teamId) {
        console.log('function getArticleByTeamsFollow');
        const set1AuthToken = JSON.parse(localStorage.getItem('user'))
        console.log('token: ', set1AuthToken['jwt']);
        axios.get("http://localhost:8080/api/v1/articles/teams/"+teamsSubscription[teamId]["id"], {
            headers: {
                authorization:set1AuthToken['jwt'],
            }
        })
          .then((response) => {
              const data = response.data
              console.log('getArticles')
              console.log(response.data)
              setArticlesByTeamsId(data)
          })
          .catch((error) => {
              if (error.response) {
                  console.log(error.response);
                  console.log("error.response.status: ", error.response.status);
              }
          })
    }
    //const [authToken, setAuthToken] = useState('Bearer ');
    const [teamId, setTeamId] = useState();
    const miniArticles = [
        {
            id: "2fff",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur1",
            isActive: true,
            category: "",
        },
        {
            id: "2ffa",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur2",
            isActive: true,
            category: "",
        },
        {
            id: "2ffb",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur3",
            isActive: true,
            category: "",
        },
        {
            id: "2ffc",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur4",
            isActive: true,
            category: "",
        },
        {
            id: "2ffd",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur5",
            isActive: true,
            category: "",
        },
        {
            id: "2ffe",
            title: "Lorem ipsum",
            shortText: "Lorem ipsum dolor sit amet, consectetur6",
            isActive: true,
            category: "",
        },
    ];



    return (

        <div className="team_hub">

            <div className='all_articles_body'>

                <div className="all_teams">
                    {
                        //ReactDOM.render(React.createElement(Example), document.getElementsByClassName("team_hub"))};

                        // teamsSubscription.map(team => {
                        //     const child = CreateTeamIcon(team.name, "following");
                        //     const teamIcon = document.createElement(child);
                        //     // teamIcon.setAttribute("title", team.name);
                        //     // teamIcon.setAttribute("following", "following");
                        //     document.body.appendChild(teamIcon);
                        // })

                         teamsSubscription.map(team =>
                             <TeamComponent name={team.name} id={team.id}/>
                         )
                         //
                         //            //getArticleByTeamsFollow(team.id)
                         //        <div className="all_articles">
                         //            {
                         //                articlesByTeamsId.forEach(article =>
                         //                <ShortArticle title={article.title} shortText={article.shortText}
                         //                category={null}  />)
                         //            }

                        // teamsSubscription.map(team =>
                        //     <TeamIcon title={team.name} following={"following"} />
                        // )
                    }
                </div>
            {/*    <div className="all_articles">*/}
            {/*        {*/}
            {/*            // articlesByTeamsId.map(article =>*/}
            {/*            //     <ShortArticle title={article.title} shortText={article.shortText}*/}
            {/*            //                   category={null} />*/}
            {/*            // )*/}
            {/*        }*/}
            {/*    </div>*/}
            </div>
            <div className="mini-articles">
                <div className="mini-articles-l">
                    <span className="more-popular">MORE POPULAR</span>
                    <hr className="more-lin-l"></hr>
                    {miniArticles.slice(0, 3).map((miniArticle) => (
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
    );
};
//
// function CreateTeamIcon(title, following){
//     return ` <div className='team'>
//       <div className='team_image'>
//         <img src={miniArticlePhoto} />
//         {/*{props.image}*/}
//       </div>
//
//       <div className='team_body'>
//         <div className='team_title'>
//           {0}
//         </div>
//         <div className='team_bottom'>
//           <div className='team_following'>
//             {1}
//           </div>
//         </div>
//       </div>
//     </div>`
// }
// const Example = () => {
//     return React.createElement("h1", { style: { color: "black" } }, "Hello World");
// };



export default TeamHub;