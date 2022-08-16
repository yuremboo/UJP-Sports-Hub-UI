import React from 'react';
import '../../style_components/article/comment.css';
import userImage from "../../icons/article/ellipse.svg";
import inactiveLike from "../../icons/article/inactiveLike.svg";

export default function Comment(props) {
    return (
        <div className="comment-body">
            <img className="user-image" src={userImage} alt="commenter" />
            <div className="comment-content">
                <span className="commenter-name">Baloh Ivan</span>
                <span className="comment-date">Mar 15</span>
                <span className="edited"> edited</span>
                <p className="comment-text">
                    {" "}
                    Interesting article. Personally I am trying to slowly move away
                    from Whatsapp as I am doing with Facebook. Most of the Whatsapp
                    group I belong to are permanently on mute; otherwise.
                </p>
                <hr />
                <div className="underline-options">
                    <a className="like" href="src/components/article/Comment#">
                        <img className="like-icon" src={inactiveLike} alt="like" />66
                    </a>
                    <a className="dislike" href="src/components/article/Comment#">
                        <img
                            className="dislike-icon"
                            src={inactiveLike}
                            alt="dislike"
                        />{" "}
                        333
                    </a>
                    <a className="delete" href="src/components/article/Comment#">
                        Delete
                    </a>
                    <a className="comment" href="src/components/article/Comment#">
                        Comment
                    </a>
                    <a className="edit" href="src/components/article/Comment#">
                        Edit
                    </a>
                </div>
            </div>
        </div>
    )
}