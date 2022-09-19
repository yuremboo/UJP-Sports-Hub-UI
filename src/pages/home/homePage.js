import React, { useEffect } from 'react';
import {
  useNavigate
} from "react-router-dom";
import {
    userLogoutRequest
} from '../../redux/auth/auth.actions'
import { connect } from 'react-redux'
import './home-page.css'
import MiniArticle from '../../Components/article/MiniArticle'
import MediumArticle from '../../Components/article/MediumArticle'

import NavBar from "../../Components/NavBar/MainNavBar";
import Header from '../../Components/Header'

// actions
import { getBreakdownArticles } from '../../redux/article-breakdown/breakdown.action';
import MostCommentedArticles from "../../Components/mostCommentedArticles/MostCommentedArticles";

const HomePage = ({
                      logOutUser,
                      getArticles,
                      // auth: { isLoading, errorMessage, userObject },
                      breakdown: { firstArticlesPayload, secondArticlesPayload } }) => {

  let navigate = useNavigate();

    async function logOut() {
        await logOutUser()
        navigate("/login");
    }

    useEffect(() => {
        getArticles()
    }, [])

    const miniFirstArticlesPayload = firstArticlesPayload.slice(1)
    const miniSecondArticlesPayload = secondArticlesPayload.slice(1)

    return (
      <div>
          <Header />
          <div className='home-page'>
              <NavBar />
              <main>
                  <h2>Home page</h2>
                  <button onClick={logOut}>LOG OUT</button>
                  <div className='breakdown-header'>
                      <hr />
                      <div className='breakdown-header__text'>
                          <p>BREAKDOWN</p>
                      </div>
                  </div>
                  <div className='breakdown-section'>
                      <div className='medium-articles'>
                          {
                            firstArticlesPayload.length !== 0 && <MediumArticle mediumArticle={firstArticlesPayload[0]} />
                          }
                          {
                            secondArticlesPayload.length !== 0 && <MediumArticle mediumArticle={secondArticlesPayload[0]} />
                          }
                      </div>
                      <div className='mini-articles'>
                          <div className='mini-articles-section'>
                              {
                                miniFirstArticlesPayload !== 0 && miniFirstArticlesPayload.map(article => {
                                    return <MiniArticle key={article.id} miniArticle={article} />
                                })
                              }
                          </div>
                          <div className='mini-articles-section'>
                              {
                                miniSecondArticlesPayload !== 0 && miniSecondArticlesPayload.map(article => {
                                    return <MiniArticle key={article.id} miniArticle={article} />
                                })
                              }
                          </div>
                      </div>
                  </div>

                  <div className='most-popular-and-commented-section'>
                      <div className='most-popular-section'>

                      </div>
                      <div className='most-commented-section'>
                        <MostCommentedArticles/>
                      </div>
                  </div>
              </main>
          </div>
      </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logOutUser: () => dispatch(userLogoutRequest()),
    getArticles: () => dispatch(getBreakdownArticles(1, 4)) // ids
})
const mapStateToProps = (state) => ({
    auth: state.auth,
    breakdown: state.breakdown,
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)