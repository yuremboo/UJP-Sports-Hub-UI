import React from "react";
import "../../style_components/article/articleheading.css";
import share from "../../icons/Share.svg";
import google from "../../icons/GoogleSmall.png"
import plus from "../../icons/Plus.png"
import facebook from "../../icons/facebook.svg"
import twitter from "../../icons/Twitter.png"

export default function CategoryHeading({article}) {
  return (
    <div className="headline-body">
      {/*<p className="publishing-date"> Published / {article.published.toString().slice(0, 10)}</p>*/}
      <p className="subtitle">{article.subtitle}</p>
      <p className="title">{article.title}</p>
      <button className="share-article-btn">
        More
        {/*<img className="icon-share" alt="share" src={share} />*/}
        {/*<span className="share-images">*/}
        {/*  <img className="facebook-icon" src={facebook} alt="facebook"/>*/}
        {/*  <img className="twitter-icon" src={twitter} alt="twitter"/>*/}
        {/*  <img className="google-icon" src={google} alt="google"/>*/}
        {/*  <img src={plus} alt="plus"/>*/}
        {/*  </span>*/}
      </button>
    </div>
  );
}
