import React from 'react';
import './addnewarticlebtn.css';
import {useNavigate} from "react-router-dom";

const AddNewArticleBtn = () => {
    const navigate = useNavigate();
  function addNewArticle(){
    console.log("new article was added");
      navigate("/add-article");
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