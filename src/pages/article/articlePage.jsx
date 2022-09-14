import React, { useEffect, useState } from "react";
import "./articlepage.css";
import { useParams } from 'react-router-dom'
import ArticleHeading from "../../Components/article/ArticleHeading";
import Comment from "../../Components/article/Comment";
import Button from "react-bootstrap/Button";
import articleImage from "../../icons/article/ArticlePhoto.jpg";
import userImage from "../../icons/article/ellipse.svg";
import smallArrowDown from "../../icons/article/smallArrowDown.svg";
import MiniArticle from "../../Components/article/MiniArticle";
import parse from "html-react-parser";
import SortByDropDown from "../../Components/UI/select/SortByDropDown";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import Header from "../../Components/Header";
import defaultUserImage from "../../icons/defaultUser.jpg";


const ArticlePage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const bearer = "Bearer ";

  const [comments, setComments] = useState([]);
  const [commentInputText, setCommentInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentObj, setCommentObj] = useState(null);

  const [selectedSortingMethod, setSelectedSortingMethod] = useState("popular");

  const initialCommentsNum = 10;

  const [commentsNum, setCommentsNum] = useState(initialCommentsNum);

  const [miniArticles, setMiniArticles] = useState([]);

  const [article, setArticle] = useState({
    id: "",
    title: "",
    text: "",
    caption: "",
    alt: "",
    picture: "",
    isActive: false,
    commentsActive: false,
    createDateTime: "",
    updateDateTime: null,
    categoryId: "",
    teamId: ""
  });

  const { id } = useParams();

  useEffect(() => {
    getArticleById(id);
  }, [id]);

  useEffect(() => {
    if (article.categoryId){
    getSixActiveMiniArticlesByCategoryId(article.categoryId, article.id);
    }
    if (article.commentsActive) {
    getCommentsByArticleId(id, "popular");
    }
  }, [article]);

  useEffect(() => {
    getCommentsByArticleId(id, selectedSortingMethod);
  }, [selectedSortingMethod]);

  function getArticleById(id) {
    console.log("function getArticleById");
    axios
      .get("http://localhost:8080/api/v1/articles/" + id, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        setArticle(data);
        console.log(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getCommentsByArticleId(id, sortingMethod) {
    console.log("function getCommentsByArticleId");
    axios
      .get("http://localhost:8080/api/v1/" + id + "/comments/" + sortingMethod, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.length !== 0){
        setComments(data);
        }
        console.log("Comments in articlePage" + data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getSixActiveMiniArticlesByCategoryId(categoryId, articleId) {
    console.log("CategoryId" + article.categoryId)
    axios
      .get("http://localhost:8080/api/v1/articles/"+ articleId +"/categories/" + categoryId, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        setMiniArticles(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function postComment(newComment) {
    axios
      .post("http://localhost:8080/api/v1/comments", newComment, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function putComment(comment) {
    axios
      .put("http://localhost:8080/api/v1/comments/" + comment.id, comment, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function deleteComment(commentId) {
    axios
      .delete("http://localhost:8080/api/v1/comments/" + commentId, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function addNewComment(e) {
    e.preventDefault();
    if (!commentInputText) {
      return;
    }
    const newComment = {
      commentText: commentInputText,
      userId: currentUser.id,
      articleId: article.id
    };
    postComment(newComment);
    setComments([...comments, newComment]);
    setCommentInputText("");
  }

  function updateLikesCount(newLikesVal, commentId) {
    let newComments = [...comments];
    newComments[getCommentIndex(commentId)].likes = newLikesVal;
    setComments(newComments);
    putComment(newComments[getCommentIndex(commentId)]);
  }

  function updateDislikesCount(newDislikesVal, commentId) {
    let newComments = [...comments];
    newComments[getCommentIndex(commentId)].dislikes = newDislikesVal;
    setComments(newComments);
    putComment(newComments[getCommentIndex(commentId)]);
  }

  function getCommentIndex(commentId) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === commentId) {
        return i;
      }
    }
  }

  function showLessComments(e) {
    e.preventDefault();
    setCommentsNum(initialCommentsNum);
  }

  function showMoreComments(e) {
    e.preventDefault();
    const newCommentsNum = commentsNum + initialCommentsNum;
    if (newCommentsNum >= comments.length) {
      setCommentsNum(comments.length);
    } else {
      setCommentsNum(newCommentsNum);
    }
  }

  function sortComments(sortingMethod) {
    console.log(sortingMethod);
    setSelectedSortingMethod(sortingMethod);
  }

  function editComment(comment) {
    setIsEditing(true);
    setCommentInputText(comment.commentText);
    setCommentObj(comment);
  }

  function putEditedComment(e) {
    e.preventDefault();
    if (!commentInputText) {
      return;
    }
    const newComment = {
      id: commentObj.id,
      commentText: commentInputText,
      userId: currentUser.id,
      articleId: commentObj.articleId,
      likes: commentObj.likes,
      dislikes: commentObj.dislikes,
      createDateTime: commentObj.createDateTime,
      isEdited: true
    };
    putComment(newComment);
    setComments([
      ...comments.filter((c) => c.id !== commentObj.id),
      newComment,
    ]);
    setCommentInputText("");
    setIsEditing(false);
  }

  function removeComment(commentId) {
    deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  }

  return (
    <div>
      <div className="article">
        <ArticleHeading
          published={article["createDateTime"]}
          title={article["title"]}
          subtitle={article["caption"]}
        />
        <img
          className="article-image"
          alt={article["alt"]}
          //src={article.picture}
          src={articleImage}
        />
        <p className="main-text">{parse(article["text"])}</p>
        {article["commentsActive"] ? (
          <div className="comments-outer-box">
            <span className="comments-count">COMMENTS ({comments.length})</span>
            <div className="sort-by">
              <span> Sort by: </span>
              <SortByDropDown
                value={selectedSortingMethod}
                onChange={sortComments}
                options={[
                  { value: "popular", name: "Most popular" },
                  { value: "oldest", name: "Oldest first" },
                  { value: "newest", name: "Newest first" },
                ]}
              ></SortByDropDown>
            </div>
            <form className="write-comment-box">
              <img className="user-image" src={currentUser.image? currentUser.image: defaultUserImage} alt="user" />
              <textarea
                className="comment-input"
                rows="3"
                placeholder="&#10;Write a comment"
                value={commentInputText}
                onChange={(event) => setCommentInputText(event.target.value)}
              />
              <Button
                className="submit-btn"
                variant="light"
                onClick={isEditing ? putEditedComment : addNewComment}
              >
                Submit
              </Button>
            </form>
            {comments.length > 0 ? (
              <div className="read-comment-box">
                {comments.slice(0, commentsNum).map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment.id}
                    updateLikesCount={updateLikesCount}
                    updateDislikesCount={updateDislikesCount}
                    deleteComment={removeComment}
                    editComment={editComment}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
            {commentsNum < comments.length ? (
              <button
                id="showMoreBtn"
                className="show-more-less"
                onClick={showMoreComments}
              >
                Show more
                <img
                  className="small-arrow-down"
                  src={smallArrowDown}
                  alt="arrow-down"
                />
              </button>
            ) : comments.length > 10 ? (
              <button className="show-more-less" onClick={showLessComments}>
                <img
                  className="small-arrow-up"
                  src={smallArrowDown}
                  alt="arrow-up"
                />
                Show less
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
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
      <Header></Header>
      <NavBar></NavBar>
    </div>
  );
};

export default ArticlePage;
