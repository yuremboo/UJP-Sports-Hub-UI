import React, {useEffect, useState} from 'react';
import axios from "axios";
// import ShortArticle from "../../components/shortArticle/shortArticle";
// import CategoryButton from "../../components/shortArticle/categoryButton";
import './allarticlesadmin.css';
import AddNewArticleBtn from "../../components/shortArticle/addNewArticleBtn";
// import SidePanelBtns from "../../components/shortArticle/sidePanelBtns";
// import authToken from "../login/loginPage";


const AllArticlesAdmin = () => {
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
    const [authToken, setAuthToken] = useState('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV0sImlhdCI6MTY2MDg0MTQ3NywiZXhwIjoxNjYxNjM0MDAwfQ.xkylFnDtkgIYgePPGCIila6BNiSZRryXC9LSY_jfijApRepHs4AQ7ED_JWI1vy8o9JusTSDYf4qVOV7wA86eWA');

    const [categories, setCategories] = useState([]);

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

    // function getAllArticles() {
    //     console.log('function getAllCategories');
    //     console.log('token: ', authToken);
    //     axios.get("http://localhost:8080/api/v1/admin/articles", {
    //         headers: {
    //             "authorization": authToken,
    //         }
    //     })
    //         .then((response) => {
    //             const data = response.data
    //             console.log('getCategories')
    //             console.log(response.data)
    //             setCategories(data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error.response);
    //                 console.log("error.response.status: ", error.response.status);
    //             }
    //         })
    // }


    const [currentCategory, setCurrentCategory] = useState({"id": "0", "name": "HOME"});


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
                    // categories.map(category => <CategoryButton categoryId={category.id} categoryName={category.name}/>)
                    categories.map(category =>
                        <div className='category_button'>
                            <button /*onClick={findArticlesByCategoryId(category.id)}*/>{category.name}</button>
                        </div>)
                }
            </div>


            {/*<button onClick={getAllCategories}>get categories</button>*/}


            {/*<div className='all_articles_admin__body'>*/}
            {/*    <div className='all_articles_admin__left_buttons'>*/}
            {/*        <SidePanelBtns/>*/}
            {/*    </div>*/}
            {/*    <div className="all_articles_admin__articles">*/}
            {/*        {*/}
            {/*            allArticlesByCatId.map(article =>*/}
            {/*            <ShortArticle title={article.title} shortText={article.shortText}*/}
            {/*                          category={article.category.name} isPublished={article.isActive}/>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    );
};

export default AllArticlesAdmin;