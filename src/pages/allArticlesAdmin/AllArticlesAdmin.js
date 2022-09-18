import React, {useEffect, useState} from 'react';
import axios from "axios";
import ShortArticleAdmin from "../../Components/shortArticle/shortArticleAdmin";
import CategoryButton from "../../Components/shortArticle/categoryButton";
import './allarticlesadmin.css';
import AddNewArticleBtn from "../../Components/shortArticle/addNewArticleBtn";
import SidePanelBtns from "../../Components/shortArticle/sidePanelBtns";
import accountSwitcher from '../../icons/accountSwitcher.svg';
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow} from "../../Components/horizontal-scroll-menu/arrows";
import {Pagination} from '@mui/material';
import Header from "../../Components/Header";

const AllArticlesAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeOfArticlesOnPage, setSizeOfArticlesOnPage] = useState(5);
  const [numOfPages, setNumOfPages] = useState(1);

  const pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  const authToken = 'Bearer ' + JSON.parse(localStorage.getItem('user')).jwt;

  const [currentCategory, setCurrentCategory] = useState({
    "id": "0",
    "name": "HOME"
  });

  // function paginationBack() {
  //     console.log('before back: ', currentPage);
  //     if (currentPage > 0) {
  //         setCurrentPage(currentPage - 1);
  //     }
  //     console.log('after back: ', currentPage);
  // }
  // function paginationForward() {
  //     console.log('before forward: ', currentPage);
  //     if (currentPage < numOfPages - 1) { // !
  //         setCurrentPage(currentPage + 1);
  //     }
  //     console.log('after forward: ', currentPage);
  // }

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        "Authorization": authToken,
      }
    })
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
  }


  const [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    getAllArticlesAllCategories();
    setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  }, []);

  function getAllArticlesAllCategories() {
    setCurrentCategory({
      "id": "0",
      "name": "HOME"
    })
    axios.get("http://localhost:8080/api/v1/admin/allarticles", {
      headers: {
        "Authorization": authToken,
      }
    })
      .then((response) => {
        const data = response.data;
        console.log('getAllArticlesAllCategories without pagination');
        console.log(response.data);
        setAllArticles(data);
        setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
    setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
    console.log('num of p aft', numOfPages);
    console.log('pages aft: ', pages);
  }

  const [articlesWithPagination, setArticlesWithPagination] = useState([])
  useEffect(() => {
    getAllArticlesAllCategoriesWithPagination();
  }, [currentPage]);

  function getAllArticlesAllCategoriesWithPagination() {
    axios.get("http://localhost:8080/api/v1/admin/articles?page=" + (currentPage - 1) + "&size=" + sizeOfArticlesOnPage, {
      headers: {
        "Authorization": authToken,
      }
    })
      .then((response) => {
        const data = response.data;
        setArticlesWithPagination(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
  }


  // useEffect(() => {
  //     getAllArticlesByCategoryId();
  // }, [currentCategory]);
  function getAllArticlesByCategoryId(catId) {
    console.log('function getAllArticlesByCategoryId');
    console.log('token: ', authToken);
    axios.get("http://localhost:8080/api/v1/admin/articles/category_id/" + catId, {
      headers: {
        "Authorization": authToken,
      }
    })
      .then((response) => {
        const data = response.data
        console.log('getAllArticlesAllCategories')
        console.log(response.data)
        setAllArticles(data)
        setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
    setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  }


  // function getAllArticlesByCategoryIdNba() {
  //     console.log('function getAllArticlesByCategoryId');
  //     console.log('token: ', authToken);
  //     axios.get("http://localhost:8080/api/v1/admin/articles/category_id/1", {
  //         headers: {
  //             "Authorization": authToken,
  //         }
  //     })
  //         .then((response) => {
  //             const data = response.data
  //             console.log('getAllArticlesAllCategories')
  //             console.log(response.data)
  //             setAllArticles(data)
  //             setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response);
  //                 console.log("error.response.status: ", error.response.status);
  //             }
  //         })
  //     setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  // }
  // function getAllArticlesByCategoryIdNbaWithPagination() {
  //     getAllArticlesByCategoryIdNba();
  //     setCurrentCategory({
  //         "id": "0",
  //         "name": "NBA"
  //     });
  //     console.log('function getAllArticlesByCategoryId');
  //     console.log('token: ', authToken);
  //     axios.get("http://localhost:8080/api/v1/admin/articles/category_id/1?page="+(currentPage-1)+"size="+sizeOfArticlesOnPage, {
  //         headers: {
  //             "Authorization": authToken,
  //         }
  //     })
  //         .then((response) => {
  //             const data = response.data
  //             console.log('getAllArticlesAllCategories');
  //             console.log(response.data);
  //             setArticlesWithPagination(data);
  //             setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response);
  //                 console.log("error.response.status: ", error.response.status);
  //             }
  //         })
  //     setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  // }
  //
  //
  //
  //
  // function getAllArticlesByCategoryIdNfl() {
  //     console.log('function getAllArticlesByCategoryId');
  //     console.log('token: ', authToken);
  //     axios.get("http://localhost:8080/api/v1/admin/articles/category_id/2", {
  //         headers: {
  //             "Authorization": authToken,
  //         }
  //     })
  //         .then((response) => {
  //             const data = response.data
  //             console.log('getAllArticlesAllCategories')
  //             console.log(response.data)
  //             setAllArticles(data)
  //             setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response);
  //                 console.log("error.response.status: ", error.response.status);
  //             }
  //         })
  //     setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  // }
  // function getAllArticlesByCategoryIdNflWithPagination() {
  //     getAllArticlesByCategoryIdNfl();
  //     setCurrentCategory({
  //         "id": "2",
  //         "name": "NFL"
  //     });
  //     console.log('function getAllArticlesByCategoryId');
  //     console.log('token: ', authToken);
  //     axios.get("http://localhost:8080/api/v1/admin/articles/category_id/2?page="+(currentPage-1)+"size="+sizeOfArticlesOnPage, {
  //         headers: {
  //             "Authorization": authToken,
  //         }
  //     })
  //         .then((response) => {
  //             const data = response.data
  //             console.log('getAllArticlesAllCategories');
  //             console.log(response.data);
  //             setArticlesWithPagination(data);
  //             setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response);
  //                 console.log("error.response.status: ", error.response.status);
  //             }
  //         })
  //     setNumOfPages(Math.ceil(allArticles.length / sizeOfArticlesOnPage));
  // }

  // function findAllArticlesByCategoryId(currCategory) {
  //     setCurrentCategory(currCategory);
  //     getAllArticlesByCategoryId(currentCategory.id);
  // }
  //
  // function changeCurrentCategory(category){
  //     setCurrentCategory(category);
  // }

  return (
    <div className='all_articles_admin__page'>
      <div className='all_articles_admin__header'>
        <div className='sportshub'>Sports hub</div>
        <div className='all_articles_admin__right_header'>
          <button>
            <img src={accountSwitcher} width='30%' height='30%'/>
          </button>
          <div></div>
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
        <div className='horizontal_scroll_menu'>
          <ScrollMenu itemClassName='scroll_menu'
                      LeftArrow={LeftArrow}
                      RightArrow={RightArrow}
                      options={{
                        ratio: 0.9,
                        rootMargin: "5px",
                        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                      }}
          >
            <div className='category_button'>
              <button onClick={getAllArticlesAllCategories}>HOME</button>
            </div>

            {
              categories.map(category => <div className='category_button'>
                <button /*onClick={setCurrentCategory(category)}*/>{category.name.toUpperCase()}</button>
              </div>)
            }
          </ScrollMenu>
        </div>
      </div>


      <div className='all_articles_admin__body'>
        <div className='all_articles_admin__left_buttons'>
          <SidePanelBtns/>
        </div>
        <div className='all_articles_admin__articles'>
          <div className='all_articles_admin__filter_articles'>
            <div className='filter_articles'>
              <select className="form-select form-select-sm">
                <option>All</option>
                <option>Published</option>
                <option>Unpublished</option>
              </select>
            </div>
            <div className='filter_articles'>

            </div>
            <div className='filter_articles'>

            </div>
          </div>
          {
            articlesWithPagination.map(article =>
              <ShortArticleAdmin title={article.title} shortText={article.shortText}
                                 category={article.category.name} isPublished={article.isActive}/>
            )
          }
        </div>

      </div>

      <div className='pagination__component'>
        {/*<div className='pagination__back_button'>*/}
        {/*    <button onClick={paginationBack}/>*/}
        {/*</div>*/}

        <div className='pagination__pages'>
          <Pagination count={numOfPages} page={currentPage} onChange={(_, num) => setCurrentPage(num)}/>
        </div>

        {/*<div className='pagination__forward_button'>*/}
        {/*    <button onClick={paginationForward}/>*/}
        {/*</div>*/}

      </div>

    </div>
  );
};

export default AllArticlesAdmin;