import React, {useEffect, useState} from 'react';
import './admin-main-article-section.css';
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { MDBSwitch } from "mdb-react-ui-kit";
export default function AdminMainArticleSection ({key,deleteSection,getArticleList,categories,teams,allArticles}) {
  const [article, setArticle] = useState({ });
  const [teamName, setTeamName] = useState();

    const handleChange = event => {
        const { name, value } = event.target;
        setArticle({ ...article, [name]: value });
        console.log(article);
    };
  function deleteSectionById() {
    deleteSection(key);
  }
    function getIdArticle(event) {
        const { value } = event.target;
        console.log(value);
        getArticleList(value);
    }

  const getTeam = event => {
    const { value } = event.target;
    setTeamName({ ...teamName,value });
    console.log(value);
    console.log(teamName);
  };
  return (
    <div className='admin-main-article-section'>

      <div className="custom-select-container">
        <CustomSelect
          label={"Category*"}
          name={"Category"}
          enumeration={categories}
          get={"name"}
          handleChange={handleChange}
        />
        <CustomSelect
          label={"Subcategory"}
          name={"subcategory"}
          enumeration={categories}
          handleChange={handleChange}
        />
        <CustomSelect
          label={"Team"}
          name={"Team"}
          enumeration={teams}
          handleChange={getTeam}
        />

      </div>
      <CustomSelect
        label={"Article*"}
        name={"article"}
        enumeration={allArticles.map((article)=>({...article, name:article.title, id:article.id}))}
        handleChange={getIdArticle}
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
        />
      </div>
      <div className='breakdown-header'>
        <hr />
      </div>
    </div>
  );
};