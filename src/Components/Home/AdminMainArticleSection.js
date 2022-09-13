import React, {useEffect, useState} from 'react';
import './admin-main-article-section.css';
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import ShortArticle from "../article/ShortArticleUser";
import axios from "axios";
import { MDBSwitch } from "mdb-react-ui-kit";
export default function AdminMainArticleSection ({key,handleChange,deleteSection,categories,teams,allArticles}) {
  function deleteSectionById() {
    deleteSection(key);
  }
  return (
    <div className='admin-main-article-section'>
      {/*<div className='breakdown-header'>*/}
      {/*  <hr />*/}
      {/*  <div className='article-home-main-header__text'>*/}
      {/*    <p>MAIN ARTICLES</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="article-home-more">*/}
      {/*  <hr className="article-home-more-line-l"></hr>*/}
      {/*  <span className="more-articles">MORE ARTICLES</span>*/}
      {/*  <hr className="article-home-more-line-r" />*/}
      {/*</div>*/}
      <div className="custom-select-container">
        <CustomSelect
          label={"Category*"}
          name={"Category"}
          enumeration={categories}
          get={".name"}
          handleChange={handleChange}
          // defaultOptions={article.category}
        />
        <CustomSelect
          label={"Subcategory"}
          name={"subcategory"}
          enumeration={categories}
          get={".name"}
          handleChange={handleChange}
        />
        <CustomSelect
          label={"Team"}
          name={"Team"}
          enumeration={teams}
          get={".name"}
          handleChange={handleChange}
        />

      </div>
      <CustomSelect
        label={"Article*"}
        name={"article"}
        enumeration={allArticles}
        get={".title"}
        handleChange={handleChange}
      />
      <div>
        <button className={"delete1-section"}
                onClick={deleteSectionById}>
          <span className={"span-delete1-section"}>Delete</span>
        </button>
      </div>
      <div className={"comments-show"}>
        <span className={"span-comments"}>Show on the main page:</span>
        <MDBSwitch id="show-hide-toggle"
                   className={"show-hide-toggle"}
                   //value={article.isHidden}
                   // onClick={() => {
                   //   setArticle({ ...article, isHidden: !article.isHidden });
                   // }}
        />
      </div>
      <div className='breakdown-header'>
        <hr />
      </div>
    </div>
  );
};