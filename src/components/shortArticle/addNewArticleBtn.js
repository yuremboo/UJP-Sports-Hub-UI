import React from 'react';
import './addnewarticlebtn.css';

const AddNewArticleBtn = () => {
    function addNewArticle(){
        console.log("new article was added");
    }

    return (
        <div className='add_new_article_button'>
            <button onClick={addNewArticle}>
                + New Article
            </button>
        </div>
    );
};

export default AddNewArticleBtn;