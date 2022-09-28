import React, {useEffect, useState} from 'react';
import './admin-main-article-section.css';
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { MDBSwitch } from "mdb-react-ui-kit";
export default function AdminMainArticleSection ({key,deleteSection,getArticleList,categories,teams,allArticles}) {
  const [article, setArticle] = useState({
    //picture: "Picture",
  });
  const [teamName, setTeamName] = useState();
  //const [allArticles, setAllArticle] = useState([]);
  //   useEffect(() => {
  //       getArticleByTeamsFollow(teamName);
  //   }, [teamName]);
  //
  // function getArticleByTeamsFollow(teamName) {
  //   console.log('function getArticleByTeamsFollow');
  //   const set1AuthToken = JSON.parse(localStorage.getItem('user'))
  //   console.log('token: ', set1AuthToken['jwt']);
  //     console.log(teamName);
  //   // var id;
  //   // var idNull;
  //   // {
  //   //   teams.map(team =>
  //   //       (team.team.name=teamName )?(id=team.team.id):(idNull=null)
  //   //     )
  //   // }
  //   axios.get("http://localhost:8080/api/v1/articles/team/"+{teamName}//+team.team.id
  //     , {
  //     headers: {
  //       authorization:set1AuthToken['jwt'],
  //     }
  //   })
  //     .then((response) => {
  //       const data = response.data
  //       console.log('getArticles')
  //       console.log(response.data)
  //       setAllArticle(prevState => [...data])
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log("error.response.status: ", error.response.status);
  //       }
  //     })
  // }
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
          get={"name"}
          handleChange={handleChange}
          // defaultOptions={article.category}
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
        //getArticleByTeamsFollow(teamName)}
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