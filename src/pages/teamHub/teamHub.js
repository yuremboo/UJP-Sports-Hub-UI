import React, { useState } from "react";
import "./teamhub.css";
import MiniArticle from "../../Components/article/MiniArticle";
import ShortArticle from "../../Components/shortArticle/shortArticle";
import TeamIcon from "../../Components/team/TeamIcon";


const TeamHub = () => {
    const miniHeading = "Lorem ipsum";
    const miniTextPreview = "Lorem ipsum dolor sit amet, consectetur";
    const [teamsId] = useState([
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
                        teamsId.map(team =>
                          <TeamIcon title={team.name} following={team.following}/>
                        )
                    }
                </div>
                <div className="all_articles">
                    {
                        articlesByTeamsId.map(article =>
                            <ShortArticle title={article.title} shortText={article.shortText}
                                          category={null} isPublished={null}/>
                        )
                    }
                </div>
            </div>

            <div className="more">
                <hr className="more-line-l"></hr>
                <span className="more-articles">MORE ARTICLES</span>
                <hr className="more-line-r" />
            </div>
            <div className="mini-articles">
                <div className="mini-articles-l">
                    {miniArticles.slice(0, 3).map((miniArticle) => (
                      <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
                    ))}
                </div>
                <div className="mini-articles-r">
                    {miniArticles.slice(3, 7).map((miniArticle) => (
                      <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamHub;