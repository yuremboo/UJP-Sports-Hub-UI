import React from 'react';
import cl from "../../style_components/article/deletecommentpopup.css";

const DeleteCommentPopUp = ({children}) => {
    return (
        <div className={[cl.deleteCommentPopup, cl.active].join(' ')}>
            <div className={cl.deleteCommentContent}>
                {children}
            </div>
        </div>
    );
};

export default DeleteCommentPopUp;