import React, { useState } from "react";
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

const ArticlePage = () => {
  const currentUser = {
    id: "777",
    email: "curus@gmail.com",
    firstName: "Ivan",
    lastName: "Baloh",
    role: "ROLE_USER",
    isActive: true,
    createDateTime: "2022-07-03T10:15:30",
    updateDateTime: "2022-08-03T11:25:31",
  };

  const article = {
    id: "1aa",
    title:
      "Register to receive the latest news on ticket sales for the four NBA London Games in 2019!",
    text:
      "    TOKYO — Major League Baseball begins its 2019 season on Wednesday in Japan\n" +
      "      with the first of two games between the Oakland Athletics and the\n" +
      '      <a href="#">Seattle Mariners</a>. NBA which equipe is the best? But when\n' +
      "      the teams take the field at the Tokyo Dome, don’t say they’re playing on\n" +
      "      foreign soil.\n" +
      "      <br />\n" +
      "      <br />\n" +
      "      That’s because 12 tons of clay, silt and sand mixtures have been shipped\n" +
      "      by boat from the United States to make the batter’s box, pitcher’s mound,\n" +
      "      base pits and bullpens feel like home. The dirt swap was news to the\n" +
      "      veteran Seattle pitcher Mike Leake, who nonetheless gave his stomp of\n" +
      "      approval after starting the first of two exhibition games each club played\n" +
      '      against teams from <a href="#">Japan’s Nippon Professional Baseball</a> as\n' +
      "      a tuneup.\n" +
      "      <br />\n" +
      "      <br />\n" +
      "      “Oh, you mean we weren’t pitching on the same mound the Japanese teams use\n" +
      "      during their season?” Leake said Sunday. “It felt like the same mound that\n" +
      "      we pitch on in the States. The only thing I would say is that maybe they\n" +
      "      put a little too much water at first, so some of the clay stuck to my\n" +
      "      spikes in the first inning, but that happens at home, too. After that, it\n" +
      "      was perfect.”",
    caption: "London Games return in 2019",
    alt: "Basketball ring",
    picture: "ArticlePhoto.jpg",
    isActive: true,
    commentsActive: true,
    createDateTime: "20.09.2019",
    updateDateTime: null,
    category: "NBA", // here should be obj
    team: "Seattle Mariners", // here should be obj
  };

  const commentsList = [
    {
      id: "123213dfsdsf2",
      comment:
        "Not interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "111",
      articleId: "1aa",
      likes: 100,
      dislikes: 15,
      createDateTime: Date.now(),
      updateDateTime: null,
    },
    {
      id: "123sad",
      comment:
        "Very interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "777",
      articleId: "1aa",
      likes: 100,
      dislikes: 133,
      createDateTime: 1649999999999,
      updateDateTime: 1650000335308
    },
    {
      id: "2123sds",
      comment:
        "Slightly interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "222",
      articleId: "1aa",
      likes: 200,
      dislikes: 22,
      createDateTime: 1634993499999,
      updateDateTime: 1636080335308,
    }
  ];

  commentsList.sort((a, b) =>
    a.likes + a.dislikes > b.likes + b.dislikes ? -1 : 1
  );

  const [comments, setComments] = useState(commentsList);
  const [comment, setComment] = useState("");

  const [selectedSort, setSelectedSort] = useState("");

  const initialCommentsNum = 10;

  const [commentsNum, setCommentsNum] = useState(initialCommentsNum);

  const miniArticles = [
    {
      id: "2fff",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur1",
      isActive: true,
      category: "",
    },
    {
      id: "2ffa",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur2",
      isActive: true,
      category: "",
    },
    {
      id: "2ffb",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur3",
      isActive: true,
      category: "",
    },
    {
      id: "2ffc",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur4",
      isActive: true,
      category: "",
    },
    {
      id: "2ffd",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur5",
      isActive: true,
      category: "",
    },
    {
      id: "2ffe",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur6",
      isActive: true,
      category: "",
    },
  ];

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function addNewComment(e) {
    e.preventDefault();
    if (!comment) {
      return;
    }
    const newComment = {
      id: uuidv4(),
      comment: comment,
      commenterId: currentUser.id,
      articleId: "1aa",
      likes: 0,
      dislikes: 0,
      createDateTime: Date.now(),
      updateDateTime: null,
      edited: false,
    };
    setComments([...comments, newComment]);
    setComment("");
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

  function deleteComment(commentId) {
    setComments(comments.filter(comment => comment.id !== commentId));
  }

  return (
    <div className="article">
      <ArticleHeading
        published={article.createDateTime}
        title={article.title}
        subtitle={article.caption}
      />
      <img className="article-image" alt={article.alt} src={articleImage} />
      <p className="main-text">{parse(article.text)}</p>
      {article.commentsActive ? (
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
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              className="submit-btn"
              variant="light"
              onClick={addNewComment}
            >
              Submit
            </Button>
          </form>
          {comments.length > 0 ? (
            <div className="read-comment-box">
              {comments.slice(0, commentsNum).map((comment) => (
                <Comment comment={comment} key={comment.id} updateLikesCount = {updateLikesCount} updateDislikesCount = {updateDislikesCount} deleteComment={deleteComment}/>
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
          ) : (
            <button className="show-more-less" onClick={showLessComments}>
              <img
                className="small-arrow-up"
                src={smallArrowDown}
                alt="arrow-up"
              />
              Show less
            </button>
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
  );
};

export default ArticlePage;
