import React, { useEffect, useState } from "react";
import "../../style_components/article/comment.css";
import defaultUserImage from "../../icons/defaultUser.jpg";
import inactiveLike from "../../icons/article/inactiveLike.svg";
import activeLike from "../../icons/article/activeLike.svg";
import axios from "axios";

export default function Comment({ comment, deleteComment, editComment }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [commenter, setCommenter] = useState(null);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [dislikesCount, setDislikesCount] = useState(comment.dislikes);
  const bearer = "Bearer ";

  useEffect(() => {
    if (comment) {
    getUserById(comment.userId);
    if(currentUser !== null){
      getLikeDislikeStatusByUserIdAndCommentId(currentUser.id, comment.id);
    }
    }
  }, []);

  async function getUserById(userId) {
      await axios
        // .get("http://localhost:8080/api/v1/users/" + userId, {})
        .get("https://ujp-sports-hub.herokuapp.com/api/v1/users/" + userId, {})
        .then((response) => {
          const data = response.data;
            setCommenter(data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("error.response.status: ", error.response.status);
          }
        });
  }

  async function getLikeDislikeStatusByUserIdAndCommentId(userId, commentId) {
    await axios
      // .get("http://localhost:8080/api/v1/like-dislike-statuses/users/" + userId + "/comments/" + commentId, {
     .get("https://ujp-sports-hub.herokuapp.com/api/v1/like-dislike-statuses/users/" + userId + "/comments/" + commentId, {
        headers: {
          authorization: bearer + currentUser["jwt"],
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLikeDislikeStatus(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  async function postLikeDislikeStatus(newLikeDislikeStatus) {
    await axios
        // .post("http://localhost:8080/api/v1/like-dislike-statuses", newLikeDislikeStatus, {
      .post("https://ujp-sports-hub.herokuapp.com/api/v1/like-dislike-statuses", newLikeDislikeStatus, {
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

  async function putLikeDislikeStatus(likeDislikeStatus) {
    console.log("put likedislike: " + likeDislikeStatus);
    await axios
      .put("https://ujp-sports-hub.herokuapp.com/api/v1/like-dislike-statuses/" + likeDislikeStatus.id, likeDislikeStatus, {
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

  async function deleteLikeDislikeStatus(likeDislikeStatusId) {
    await axios
      .delete("https://ujp-sports-hub.herokuapp.com/api/v1/like-dislike-statuses/" + likeDislikeStatusId, {
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

  async function putComment(comment) {
    await axios
      .put("https://ujp-sports-hub.herokuapp.com/api/v1/comments/" + comment.id, comment, {
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

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const [likeDislikeStatus, setLikeDislikeStatus] = useState(null);

  async function toggleLike(e) {
    e.preventDefault();
    if (likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "") {
      const lDStatus = {
        likedDisliked: true,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      await postLikeDislikeStatus(lDStatus);
      comment.likes += 1;
      setLikesCount(likesCount + 1)
      await putComment(comment, comment.id);
    } else if (likeDislikeStatus.likedDisliked === true) {
      await deleteLikeDislikeStatus(likeDislikeStatus.id);
      setLikeDislikeStatus(null);
      comment.likes -= 1;
      setLikesCount(likesCount - 1)
      await putComment(comment, comment.id);
    } else {
      const lDStatus = {
        id: likeDislikeStatus.id,
        likedDisliked: true,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      await putLikeDislikeStatus(lDStatus);
      comment.likes += 1;
      setLikesCount(likesCount + 1)
      comment.dislikes -= 1;
      setDislikesCount(dislikesCount - 1)
      await putComment(comment, comment.id);
    }
  }

  async function toggleDislike(e) {
    e.preventDefault();
    if (likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "") {
      const lDStatus = {
        likedDisliked: false,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      await postLikeDislikeStatus(lDStatus);
      comment.dislikes += 1;
      setDislikesCount(dislikesCount + 1);
      await putComment(comment, comment.id);
    } else if (likeDislikeStatus.likedDisliked === false) {
      await deleteLikeDislikeStatus(likeDislikeStatus.id);
      setLikeDislikeStatus(null);
      comment.dislikes -= 1;
      setDislikesCount(dislikesCount - 1);
      await putComment(comment, comment.id);
    } else {
      const lDStatus = {
        id: likeDislikeStatus.id,
        likedDisliked: false,
        userId: currentUser.id,
        commentId: comment.id
      };
      setLikeDislikeStatus(lDStatus);
      await putLikeDislikeStatus(lDStatus);
      comment.likes -= 1;
      setLikesCount(likesCount - 1);
      comment.dislikes += 1;
      setDislikesCount(dislikesCount + 1);
      await putComment(comment, comment.id);
    }
  }

  function formatDate(date) {
    if (isNaN(date.getFullYear())) {
      date = new Date();
    }
    if (date.getFullYear() === new Date().getFullYear()) {
      return monthNames[date.getMonth()] + " " + date.getDate();
    }
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      " " +
      date.getFullYear()
    );
  }

  function deleteCommentById() {
    deleteComment(comment.id);
  }

  return (
    <div className="comment-body">
      <img className="user-image" src={commenter && commenter.photo ? ("https://ujp-sports-hub.herokuapp.com/api/v1/image/" + commenter.photo) : defaultUserImage} alt="commenter" />
      <div className="comment-content">
        <span className="commenter-name">
          {commenter !== null ? commenter["firstName"] + " " + commenter["lastName"] : "Firstname Lastname"}
        </span>
        <span className="comment-date">
          {formatDate(new Date(comment.createDateTime))}
        </span>
        {comment.isEdited ? (
          <span className="edited"> edited</span>
        ) : (
          <></>
        )}
        <p className="comment-text">{comment.commentText}</p>
        <hr />
        <div className="underline-options">
          {" "}
          {likeDislikeStatus === null || likeDislikeStatus === undefined || likeDislikeStatus === "" ? (
            <span>
              <button className="like" onClick={toggleLike}>
                <img className="like-icon" src={inactiveLike} alt="like" />
                {likesCount}
              </button>
              <button className="dislike" onClick={toggleDislike}>
                <img
                  className="dislike-icon"
                  src={inactiveLike}
                  alt="dislike"
                />{" "}
                {dislikesCount}
              </button>
            </span>
          ) : (
            <span>
              {likeDislikeStatus.likedDisliked === true ? (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={activeLike} alt="like" />
                    {likesCount}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={inactiveLike}
                      alt="dislike"
                    />{" "}
                    {dislikesCount}
                  </button>
                </span>
              ) : (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={inactiveLike} alt="like" />
                    {likesCount}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={activeLike}
                      alt="dislike"
                    />{" "}
                    {dislikesCount}
                  </button>
                </span>
              )}
            </span>
          )}
         {currentUser === null || (currentUser.role === "USER" && currentUser.id !== commenter.id)? (
            <></>
          ) :(
            <span>
              <button className="delete" onClick={deleteCommentById}>Delete</button>
              <button className="edit" onClick={() => editComment(comment)}>
                Edit
              </button>
            </span>
          ) }
        </div>
      </div>
    </div>
  );
}
