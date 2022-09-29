import React, {useEffect} from 'react';
import {
    useNavigate
} from "react-router-dom";
import {
    userLogoutRequest
} from '../../redux/auth/auth.actions'
import {connect} from 'react-redux'
import './home-page.css'
import MiniArticle from '../../Components/article/MiniArticle'
import MediumArticle from '../../Components/article/MediumArticle'

import NavBar from "../../Components/NavBar/MainNavBar";
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
// actions
import {getBreakdownArticles} from '../../redux/article-breakdown/breakdown.action';

import {getPhotoOfTheDay} from '../../redux/photo-of-the-day/photo-day.action';

import dayPhoto from './Bitmap.png';

import MostCommentedArticles from "../../Components/mostCommentedArticles/MostCommentedArticles";
import MorePopularArticles from "../../Components/morePopularArticles/MorePopularArticles";
import ArticleHeading from "../../Components/article/ArticleHeading";
import {useState} from "react";
import articleImage from "../../icons/article/ArticlePhoto.jpg";
import VerticalMiniArticle from "../../Components/article/VerticalMiniArticle";
import axios from "axios";


const HomePage = ({
                      logOutUser,
                      getArticles,
                      getPhotoOfTheDay,
                      //   auth: { isLoading, errorMessage, userObject },
                      breakdown: {firstArticlesPayload, secondArticlesPayload},
                      photoOfTheDay: {photoOfTheDay}
                  }) => {

    let navigate = useNavigate();

    async function logOut() {
        await logOutUser()
        navigate("/login");
    }

    useEffect(() => {
        getArticles();
        getAllArticlesSelectedByAdmin();
        getPhotoOfTheDay();
    }, [])

    const miniFirstArticlesPayload = firstArticlesPayload.slice(1);
    const miniSecondArticlesPayload = secondArticlesPayload.slice(1);

    const [mainArticles, setMainArticles] = useState([]);

    async function getAllArticlesSelectedByAdmin() {
         await axios
            .get("https://ujp-sports-hub.herokuapp.com/api/v1/selected-articles")
            .then((response) => {
                const data = response.data;
                setMainArticles(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    return (
        <div>
            <Header/>
            <div className='home-page'>
                <NavBar/>
                <main>
                    {mainArticles.length !== 0 ?
                        <div className='home-articles'>
                            <ArticleHeading
                                article={mainArticles[0]}
                                isArticlePage={false}></ArticleHeading>
                            <img
                                className="main-article-image"
                                alt="alt"
                                src={mainArticles[0].picture ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + mainArticles[0].picture) : articleImage}
                            />
                            <div className="v-mini-articles">
                                {mainArticles.slice(1, 5).map((verticalMiniArticle) => (
                                    <VerticalMiniArticle verticalMiniArticle={verticalMiniArticle} key={verticalMiniArticle.id} />
                                ))}
                            </div>
                        </div>:<></>}
                    <div className='breakdown-header'>
                        <hr/>
                        <div className='breakdown-header__text'>
                            <p>BREAKDOWN</p>
                        </div>
                    </div>
                    <div className='breakdown-section'>
                        <div className='medium-articles'>
                            {
                                firstArticlesPayload.length !== 0 &&
                                <MediumArticle mediumArticle={firstArticlesPayload[0]}/>
                            }
                            {
                                secondArticlesPayload.length !== 0 &&
                                <MediumArticle mediumArticle={secondArticlesPayload[0]}/>
                            }
                        </div>
                        <div className='mini-articles' id='breakdown'>
                            <div className='mini-articles-section'>
                                {
                                    miniFirstArticlesPayload !== 0 && miniFirstArticlesPayload.map(article => {
                                        return <MiniArticle key={article.id} miniArticle={article}/>
                                    })
                                }
                            </div>
                            <div className='mini-articles-section'>
                                {
                                    miniSecondArticlesPayload !== 0 && miniSecondArticlesPayload.map(article => {
                                        return <MiniArticle key={article.id} miniArticle={article}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='breakdown-header'>
                        <hr/>
                        <div className='breakdown-header__text'>
                            <p>PHOTO OF THE DAY</p>
                        </div>
                    </div>
                    <div className='photo-of-the-day'>
                        <div className='photo-triangle'>
                            <p className='photo-triangle__paragraph'>
                                PHOTO OF THE DAY
                            </p>
                        </div>
                        <img src="https://ujp-sports-hub.herokuapp.com/api/v1/image/photo-of-the-day.jpg" alt={photoOfTheDay?.alt ?? "dayPhoto"} />
                        <div className='text-container'>
                            <p className='text-container__title'>{photoOfTheDay?.title ?? ""}</p>
                            <p className='text-container__caption'>{photoOfTheDay?.shortDescription ?? ""}</p>
                            <p className='text-container__author'>{photoOfTheDay?.author ?? ""}</p>
                        </div>
                    </div>
                    <div className='most-popular-and-commented-section'>
                        <div className='most-popular-section'>
                            <MorePopularArticles/>
                        </div>
                        <div className='most-commented-section'>
                            <MostCommentedArticles/>
                        </div>
                    </div>
                </main>
            </div>
            <Footer/>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logOutUser: () => dispatch(userLogoutRequest()),
    getArticles: () => dispatch(getBreakdownArticles('9c03430f-e00c-4905-b329-d5c506b35d0a', 'ec31f8e1-cee3-4e59-9ba6-43e7b1dc8aaa')), // ids
    getPhotoOfTheDay: () => dispatch(getPhotoOfTheDay())
})
const mapStateToProps = (state) => ({
    auth: state.auth,
    breakdown: state.breakdown,
    photoOfTheDay: state.photoOfTheDay
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
