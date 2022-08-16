import React from 'react';
import '../../style_components/article/articleheading.css';
import share from "../../icons/Share.svg";

export default function ArticleHeading(props) {
    return (
        <div className="headline-body">
            <p className="publishing-date"> Published / {props.published}</p>
            <p className="subtitle">{props.subtitle}</p>
            <p className="title" >{props.title}</p>
            <button className="share-article-btn"><img className="icon-share" alt="share" src={share}/> </button>
        </div>
    )
}