import React, { useEffect, useState } from "react";
import "./articlepage.css";
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
import NavBar from "../../Components/NavBar/MainNavBar";
import Header from "../../Components/Header";


const ArticlePage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [auth] = useState("Bearer ");

  const [comments, setComments] = useState([]);
  const [commentInputText, setCommentInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentObj, setCommentObj] = useState(null);

  const [selectedSort, setSelectedSort] = useState("");

  const initialCommentsNum = 10;

  const [commentsNum, setCommentsNum] = useState(initialCommentsNum);

  const [miniArticles, setMiniArticles] = useState([]);

  useEffect(() => {
    getArticleById();
    getSixActiveMiniArticlesByCategoryId();
    getCommentsByArticleId();
  }, []);

  function getArticleById() {
    console.log("function getArticleById");
    axios
      .get("http://localhost:8080/api/v1/articles/1aa", {
        headers: {
          authorization: auth + currentUser["jwt"],
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

  // useEffect(()=>{
  //   getCommentsByArticleId();
  // }, [comments]);

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

  function getCommentsByArticleId() {
    axios
      .get("http://localhost:8080/api/v1/" + article.id.toString() +"/comments", {
        headers: {
          authorization: auth + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setComments(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getSixActiveMiniArticlesByCategoryId() {
    axios
      .get("http://localhost:8080/api/v1/articles/categories/" + article.categoryId, {
        headers: {
          authorization: auth + currentUser["jwt"],
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
          authorization: auth + currentUser["jwt"],
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
          authorization: auth + currentUser["jwt"],
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function deleteComment(comment) {
    axios
      .delete("http://localhost:8080/api/v1/comments/" + comment.id, {
        headers: {
          authorization: auth + currentUser["jwt"],
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
      articleId: article.id,
      likes: 0,
      dislikes: 0,
      createDateTime: Date.now(),
      updateDateTime: null,
      edited: false
    };
    postComment(newComment);
    setComments([...comments, newComment]);
    setCommentInputText("");
  }

  function updateLikesCount(newLikesVal, commentId) {
    let newComments = [...comments];
    newComments[getCommentIndex(commentId)].likes = newLikesVal;
    setComments(newComments);
  }

  function updateDislikesCount(newDislikesVal, commentId) {
    let newComments = [...comments];
    newComments[getCommentIndex(commentId)].dislikes = newDislikesVal;
    setComments(newComments);
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

  function sortComments(sort) {
    setSelectedSort(sort);
    if (sort === "mostPop") {
      setComments([
        ...comments.sort((a, b) =>
          a.likes + a.dislikes > b.likes + b.dislikes ? -1 : 1
        ),
      ]);
    } else if (sort === "oldest") {
      setComments([
        ...comments.sort((a, b) =>
          a.createDateTime > b.createDateTime ? 1 : -1
        ),
      ]);
    } else if (sort === "newest") {
      setComments([
        ...comments.sort((a, b) =>
          b.createDateTime > a.createDateTime ? 1 : -1
        ),
      ]);
    }
  }

  function editComment(comment) {
    setIsEditing(true);
    setCommentInputText(comment.comment);
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
      updateDateTime: Date.now(),
      edited: true,
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
                value={selectedSort}
                onChange={sortComments}
                options={[
                  { value: "mostPop", name: "Most popular" },
                  { value: "oldest", name: "Oldest first" },
                  { value: "newest", name: "Newest first" },
                ]}
              ></SortByDropDown>
            </div>
            <form className="write-comment-box">
              <img className="user-image" src={userImage} alt="user" />
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
