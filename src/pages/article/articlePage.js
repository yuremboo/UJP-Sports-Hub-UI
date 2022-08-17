import React, { useState } from "react";
import "./articlepage.css";
import ArticleHeading from "../../components/article/ArticleHeading";
import Comment from "../../components/article/Comment";
import Button from "react-bootstrap/Button";
import articleImage from "../../icons/article/ArticlePhoto.jpg";
import userImage from "../../icons/article/ellipse.svg";
import smallArrowDown from "../../icons/article/smallArrowDown.svg";
import MiniArticle from "../../components/article/MiniArticle";

const ArticlePage = () => {
  const publicationDate = "20.09.2019";
  const articleTitle =
    "Register to receive the latest news on ticket sales for the four NBA London\n" +
    "                Games in 2019!";
  const articleSubtitle = "London Games return in 2019";

  const mainText = "";

  const [comments, setComments] = useState([
    {
      id: "123213dfsdsf2",
      commentText:
        "Interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "1ff",
      articleId: "1aa",
      likes: 13,
      dislikes: 3,
      createDateTime: "27/07/22",
      updateDateTime: "28/07/22",
    },
    {
      id: "123sad",
      commentText:
        "Interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "1ff",
      articleId: "1aa",
      likes: 12,
      dislikes: 13,
      createDateTime: "27/07/22",
      updateDateTime: "28/07/22",
    },
    {
      id: "2123sds",
      commentText:
        "Interesting article. Personally I am trying to slowly move away from\n" +
        "          Whatsapp as I am doing with Facebook. Most of the Whatsapp group I\n" +
        "          belong to are permanently on mute; otherwise.",
      commenterId: "1ff",
      articleId: "1aa",
      likes: 23,
      dislikes: 23,
      createDateTime: "27/07/22",
      updateDateTime: "28/07/22",
    }
  ]);

  const miniHeading = "Lorem ipsum";
  const miniTextPreview = "Lorem ipsum dolor sit amet, consectetur";

  return (
    <div className="article">
      <ArticleHeading
        published={publicationDate}
        title={articleTitle}
        subtitle={articleSubtitle}
      />
      <img
        className="article-image"
        alt="An article image is supposed to be here"
        src={articleImage}
      />
      <p className="main-text">
        TOKYO — Major League Baseball begins its 2019 season on Wednesday in
        Japan with the first of two games between the Oakland Athletics and the{" "}
        <a href="#">Seattle Mariners</a>. NBA which equipe is the best? But when
        the teams take the field at the Tokyo Dome, don’t say they’re playing on
        foreign soil.
        <br />
        <br />
        That’s because 12 tons of clay, silt and sand mixtures have been shipped
        by boat from the United States to make the batter’s box, pitcher’s
        mound, base pits and bullpens feel like home. The dirt swap was news to
        the veteran Seattle pitcher Mike Leake, who nonetheless gave his stomp
        of approval after starting the first of two exhibition games each club
        played against teams from{" "}
        <a href="#">Japan’s Nippon Professional Baseball</a> as a tuneup.
        <br />
        <br />
        “Oh, you mean we weren’t pitching on the same mound the Japanese teams
        use during their season?” Leake said Sunday. “It felt like the same
        mound that we pitch on in the States. The only thing I would say is that
        maybe they put a little too much water at first, so some of the clay
        stuck to my spikes in the first inning, but that happens at home, too.
        After that, it was perfect.”
      </p>
      <div className="comments-outer-box">
        <span className="comments-count">COMMENTS ({comments.length})</span>
        <select className="sort-by" name="Sort by" id="sortBy">
          <option>Most popular</option>
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
        <span className="sort-by"> Sort by: </span>
        <form className="write-comment-box">
          <img className="user-image" src={userImage} alt="user" />
          <textarea
            className="comment-input"
            rows="3"
            placeholder="&#10;Write a comment"
          />
          <Button className="submit-btn" variant="light">
            Submit
          </Button>
        </form>
        <div className="read-comment-box">
          {comments.map((comment, id) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
        <div className="show-more">
          <a className="show-more-link" href="#">
            <span>Show more</span>
            <img
              className="small-arrow-down"
              src={smallArrowDown}
              alt="arrow"
            />
          </a>
        </div>
      </div>
      <div className="more">
        <hr className="more-line-l"></hr>
        <span className="more-articles">MORE ARTICLES</span>
        <hr className="more-line-r" />
      </div>
      <div className="mini-articles">
        <div className="mini-articles-l">
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
        </div>
        <div className="mini-articles-r">
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
          <MiniArticle heading={miniHeading} textPreview={miniTextPreview} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
