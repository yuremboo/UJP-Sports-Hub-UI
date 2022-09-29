import React from "react";
import "../../style_components/article/articleheading.css";

export default function ArticleHeading({article, isArticlePage}) {
    return (
        <div className="headline-body">
            <p className="publishing-date"> Published / {article["createDateTime"].toString().slice(0, 10)}</p>
            <p className="subtitle">{article["caption"]}</p>
            <p className="title">{article["title"]}</p>
            {isArticlePage ?
                <>
                </>
                :
                // <a className="more-button" href={"http://localhost:3000/articles/" + article["id"]}>
                <a className="more-button" href={"https://ujp-sports-hub-ui.herokuapp.com/articles/" + article["id"]}>
                    More
                </a>
            }
        </div>
    );
}
