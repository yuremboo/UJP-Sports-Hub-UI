import React, { useState } from "react";
import "../../style_components/article/comment.css";
import userImage from "../../icons/article/ellipse.svg";
import inactiveLike from "../../icons/article/inactiveLike.svg";
import activeLike from "../../icons/article/activeLike.svg";

export default function Comment({ comment, updateLikesCount, updateDislikesCount, deleteComment, editComment }) {
  /*  const currentUser = {
      id: "777",
      email: "curus@gmail.com",
      firstName: "Ivan",
      lastName: "Baloh",
      role: "USER",
      isActive: true,
      createDateTime: "2022-07-03T10:15:30",
      updateDateTime: "2022-08-03T11:25:31",
    };*/

  const currentUser = JSON.parse(localStorage.getItem("user"));

  function getUserByID(userId) {
    const users = [
      {
        id: "4028d12a82e8c95e0182e8d2f5ac0000",
        firstName: "Andriy",
        lastName: "Barskyi",
        email: "andriy.barskyi@gmail.com",
        role: "USER",
        isActive: true,
        createDateTime: "2022-07-03T10:15:30",
        updateDateTime: "2022-08-03T11:25:31"
      },
      {
        id: "111",
        email: "oneone@gmail.com",
        firstName: "Willy",
        lastName: "Torrington",
        role: "USER",
        isActive: true,
        createDateTime: "2022-07-03T10:15:30",
        updateDateTime: "2022-08-03T11:25:31"
      },
      {
        id: "222",
        email: "romb@gmail.com",
        firstName: "Stephen",
        lastName: "Rombolo",
        role: "USER",
        isActive: true,
        createDateTime: "2022-07-03T10:15:30",
        updateDateTime: "2022-08-03T11:25:31"
      }
    ];

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i];
      }
    }
  }

  const commenter = getUserByID(comment.commenterId);

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

  function toggleLike(e) {
    e.preventDefault();

    if (likeDislikeStatus === null) {
      setLikeDislikeStatus(true);
      updateLikesCount(comment.likes + 1, comment.id);
    } else if (likeDislikeStatus) {
      setLikeDislikeStatus(null);
      updateLikesCount(comment.likes - 1, comment.id);
    } else {
      setLikeDislikeStatus(true);
      updateLikesCount(comment.likes + 1, comment.id);
      updateDislikesCount(comment.dislikes - 1, comment.id);
    }
  }

  function toggleDislike(e) {
    e.preventDefault();

    if (likeDislikeStatus === null) {
      setLikeDislikeStatus(false);
      updateDislikesCount(comment.dislikes + 1, comment.id);
    } else if (!likeDislikeStatus) {
      setLikeDislikeStatus(null);
      updateDislikesCount(comment.dislikes - 1, comment.id);
    } else {
      setLikeDislikeStatus(false);
      updateLikesCount(comment.likes - 1, comment.id);
      updateDislikesCount(comment.dislikes + 1, comment.id);
    }
  }

  function formatDate(date) {
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

  function deleteCommentById() { // TODO add pop up window
    deleteComment(comment.id);
  }

  return (
    <div className="comment-body">
      <img className="user-image" src={userImage} alt="commenter" />
      <div className="comment-content">
        <span className="commenter-name">
          {commenter.firstName + " " + commenter.lastName}
        </span>
        <span className="comment-date">
          {/*comment.updateDateTime? formatDate(new Date(comment.updateDateTime)) :*/}{" "}
          {formatDate(new Date(comment.createDateTime))}
        </span>
        {comment.updateDateTime ? (
          <span className="edited"> edited</span>
        ) : (
          <></>
        )}
        <p className="comment-text">{comment.comment}</p>
        <hr />
        <div className="underline-options">
          {" "}
          {likeDislikeStatus === null ? (
            <span>
              <button className="like" onClick={toggleLike}>
                <img className="like-icon" src={inactiveLike} alt="like" />
                {comment.likes}
              </button>
              <button className="dislike" onClick={toggleDislike}>
                <img
                  className="dislike-icon"
                  src={inactiveLike}
                  alt="dislike"
                />{" "}
                {comment.dislikes}
              </button>
            </span>
          ) : (
            <span>
              {likeDislikeStatus ? (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={activeLike} alt="like" />
                    {comment.likes}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={inactiveLike}
                      alt="dislike"
                    />{" "}
                    {comment.dislikes}
                  </button>
                </span>
              ) : (
                <span>
                  <button className="like" onClick={toggleLike}>
                    <img className="like-icon" src={inactiveLike} alt="like" />
                    {comment.likes}
                  </button>
                  <button className="dislike" onClick={toggleDislike}>
                    <img
                      className="dislike-icon"
                      src={activeLike}
                      alt="dislike"
                    />{" "}
                    {comment.dislikes}
                  </button>
                </span>
              )}
            </span>
          )}
          {comment.commenterId === currentUser.id ||
          currentUser.role === "ADMIN" ? (
            <span>
              <button className="delete" onClick={deleteCommentById}>Delete</button>
              <button className="comment">Comment</button>
              <button className="edit" onClick={() => editComment(comment)}>
                Edit
              </button>
            </span>
          ) : (
            <button className="comment">Comment</button>
          )}
        </div>
      </div>
    </div>
  );
}
