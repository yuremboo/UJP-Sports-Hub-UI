import React, {useEffect, useState} from 'react';
import axios from "axios";
import ShortArticleAdmin from "../../components/shortArticle/shortArticleAdmin";
import CategoryButton from "../../components/shortArticle/categoryButton";
import './allarticlesadmin.css';
import AddNewArticleBtn from "../../components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../components/shortArticle/sidePanelBtns";
import authToken from "../login/loginPage";
import accountSwitcher from '../../icons/accountSwitcher.svg';
import arrow from '../../icons/arrow.svg';
import HorizontalScrollMenu from "../../components/horizontal-scroll-menu/horizontalScrollMenu";

const AllArticlesAdmin = () => {
    //const [categories, setCategories] = useState([]);
    const [categories, setCategories] = useState(
        [
            {
                "id": "1",
                "name": "nba",
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
            },

            {
                "id": "2",
                "name": "nfl",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "3",
                "name": "mlb",
                "description": "Description category 3",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "4",
                "name": "nhl",
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
            },

            {
                "id": "5",
                "name": "cbb",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "6",
                "name": "cfb",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "7",
                "name": "nascar",
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
            },

            {
                "id": "8",
                "name": "golf",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "9",
                "name": "soccer",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "11",
                "name": "lifestyle",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "12",
                "name": "dealbook",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "13",
                "name": "video",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            }
        ])

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        console.log('function getAllCategories');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/categories", {
            headers: {
                "Authorization": authToken,
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
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }

    const [authToken, setAuthToken] = useState('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV0sImlhdCI6MTY2MDg0MTQ3NywiZXhwIjoxNjYxNjM0MDAwfQ.xkylFnDtkgIYgePPGCIila6BNiSZRryXC9LSY_jfijApRepHs4AQ7ED_JWI1vy8o9JusTSDYf4qVOV7wA86eWA');

    const [allArticles, setAllArticles] = useState(
        [
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
                "shortText": "It is text article 6 and it is first sentence. ",
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


    const [currentCategory, setCurrentCategory] = useState({"id": "0", "name": "HOME"});


    return (
        <div className='all_articles_admin__page'>
            <div className='all_articles_admin__header'>
                <div className='sportshub'>Sports hub</div>
                <div className='all_articles_admin__right_header'>
                    <button>
                        <img src={accountSwitcher} width='30%' height='30%'/>
                    </button>
                    <div> </div>
                </div>
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

                <HorizontalScrollMenu/>


                {/*<div className="categories_buttons__left_arrow">*/}
                {/*    <button>*/}
                {/*        <img src={arrow} alt='arrow'/>*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*{*/}
                {/*    categories.map(category => <div className='category_button'>*/}
                {/*        <button onClick={*/}
                {/*            // setCurrentCategory(category.id);*/}
                {/*            findArticlesByCategoryId(category.id)*/}
                {/*        }>{category.name.toUpperCase()}</button>*/}
                {/*    </div>)*/}
                {/*}*/}

                {/*<div className="categories_buttons__right_arrow">*/}
                {/*    <button>*/}
                {/*        <img src={arrow} alt='arrow'/>*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>


            {/*<button onClick={getAllCategories}>get categories</button>*/}




            <div className='all_articles_admin__body'>
                <div className='all_articles_admin__left_buttons'>
                    <SidePanelBtns/>
                </div>
                <div className="all_articles_admin__articles">
                    {
                        allArticles.map(article =>
                            <ShortArticleAdmin title={article.title} shortText={article.shortText}
                                               category={article.category.name} isPublished={article.isActive}/>
                        )
                    }
                </div>
            </div>


        </div>
    );
};

export default AllArticlesAdmin;