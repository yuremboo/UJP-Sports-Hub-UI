import React, {useEffect, useState} from 'react';
import axios from "axios";
 import ShortArticle from "../../Components/shortArticle/shortArticle";
// import CategoryButton from "../../components/shortArticle/categoryButton";
import './allarticlesadmin.css';
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
// import SidePanelBtns from "../../components/shortArticle/sidePanelBtns";
import authToken from "../login/loginPage";

const AllArtAdm2 = () => {
    // const [categories, setCategories] = useState([
    //     {
    //         "id": "1",
    //         "name": "NBA"
    //     },
    //     {
    //         "id": "2",
    //         "name": "NFL"
    //     },
    //     {
    //         "id": "3",
    //         "name": "MLB"
    //     },
    //     {
    //         "id": "4",
    //         "name": "NHL"
    //     },
    //     {
    //         "id": "5",
    //         "name": "SOCCER"
    //     }
    // ]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories();
    });

    function getAllCategories() {
        axios.get("http://localhost:8080/api/categories", {
            headers: {
                "authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data
                console.log('getCategories')
                console.log(response.data)
                setCategories(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status");
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
    }

    const [currentCategory, setCurrentCategory] = useState({"id": "0", "name": "HOME"});

    const [allArticlesByCatId, setAllArticlesByCatId] = useState([
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
    // useEffect(() => {
    //     findArticlesByCategoryId();
    // }, []);
    //
    // function findArticlesByCategoryId(id) {
    //     axios.get("http://localhost:8080/api/v1/articles/category_id/" + id, {
    //         headers: {
    //             "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE2NjA2NjkxNTEsImV4cCI6MTY2MTQ2MTIwMH0.bXDogy3W5EIPNA7tpvgXVUc3bZcIfNhI7j70FMCUBkifCk5cQd06Ij_xoExqZYNfE-lSZBs9YFOt5UYTfPUlSg"
    //         }
    //     })
    //         .then((response) => {
    //             const data = response.data;
    //             console.log('getArticles');
    //             console.log(response.data);
    //             setAllArticlesByCatId(data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error.response);
    //                 console.log("error.response.status");
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //             }
    //         })
    // }





    return (
        <div className='all_articles_admin'>
            <div className='all_articles_admin__header'>
                <div className='sportshub'>Sports hub</div>

            </div>
            <div className='all_articles_admin__current_category__new_article'>
                <div className='all_articles_admin__current_category'>
                    {currentCategory.name}
                </div>
                <div className='all_articles_admin__new_article'>
                    <AddNewArticleBtn/>
                </div>
            </div>

            <div className='all_articles_admin__categories_buttons'>
                {
                    categories.map(category =>
                        <div className='category_button'>
                            <button /*onClick={findArticlesByCategoryId(category.id)}*/>{category.name}</button>
                        </div>)
                }
            </div>

            <div className='all_articles_admin__body'>
                <div className='all_articles_admin__left_buttons'>
                    {/*<SidePanelBtns/>*/}
                </div>
                <div className="all_articles_admin__articles">
                    {
                        allArticlesByCatId.map(article =>
                        <ShortArticle title={article.title} shortText={article.shortText}
                                      category={article.category.name} isPublished={article.isActive}/>
                        )
                    }
                </div>
            </div>


        </div>
    );
};

export default AllArtAdm2;