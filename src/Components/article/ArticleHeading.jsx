import React from "react";
import "../../style_components/article/articleheading.css";
import share from "../../icons/Share.svg";
import google from "../../icons/GoogleSmall.png"
import plus from "../../icons/Plus.png"
import facebook from "../../icons/facebook.svg"
import twitter from "../../icons/Twitter.png"

export default function ArticleHeading({article, isArticlePage}) {
    return (
        <div className="headline-body">
            <p className="publishing-date"> Published / {article["createDateTime"].toString().slice(0, 10)}</p>
            <p className="subtitle">{article["caption"]}</p>
            <p className="title">{article["title"]}</p>
            {isArticlePage ?
                <button className="share-article-btn">
                    <img className="icon-share" alt="share" src={share}/>
                    <span className="share-images">
                        <img className="facebook-icon" src={facebook} alt="facebook"/>
                        <img className="twitter-icon" src={twitter} alt="twitter"/>
                        <img className="google-icon" src={google} alt="google"/>
                        <img src={plus} alt="plus"/>
                    </span>
                </button>
                :
                <a className="more-button" href={"http://localhost:3000/articles/" + article["id"]}>
                    More
                </a>
            }
        </div>
    );
}
