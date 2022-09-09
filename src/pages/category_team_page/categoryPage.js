import React, { useEffect, useState } from "react";
import "./categorypage.css";
import { useParams } from "react-router-dom";
import ArticleHeading from "../../Components/article/ArticleHeading";
import Button from "react-bootstrap/Button";
import articleImage from "../../icons/article/ArticlePhoto.jpg";
import parse from "html-react-parser";
import ShortArticle from "../../Components/article/ShortArticle";
import MiniArticle from "../../Components/article/MiniArticle";
import axios from "axios";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar";

const CategoryPage = ({ props, globalStore }) => {
  const [articlesByCategory, setArticlesByCategory] = useState([]);

  const article = {
    id: "1aa",
    title:
      "Register to receive the latest news on ticket sales for the four NBA London Games in 2019!",
    text:
      "    TOKYO — Major League Baseball begins its 2019 season on Wednesday in Japan\n" +
      "      with the first of two games between the Oakland Athletics and the\n" +
      "      <a href=\"#\">Seattle Mariners</a>. NBA which equipe is the best? But when\n" +
      "      the teams take the field at the Tokyo Dome, don’t say they’re playing on\n" +
      "      foreign soil.\n" +
      "      <br />\n" +
      "      <br />\n" +
      "      That’s because 12 tons of clay, silt and sand mixtures have been shipped\n" +
      "      by boat from the United States to make the batter’s box, pitcher’s mound,\n" +
      "      base pits and bullpens feel like home. The dirt swap was news to the\n" +
      "      veteran Seattle pitcher Mike Leake, who nonetheless gave his stomp of\n" +
      "      approval after starting the first of two exhibition games each club played\n" +
      "      against teams from <a href=\"#\">Japan’s Nippon Professional Baseball</a> as\n" +
      "      a tuneup.\n" +
      "      <br />\n" +
      "      <br />\n" +
      "      “Oh, you mean we weren’t pitching on the same mound the Japanese teams use\n" +
      "      during their season?” Leake said Sunday. “It felt like the same mound that\n" +
      "      we pitch on in the States. The only thing I would say is that maybe they\n" +
      "      put a little too much water at first, so some of the clay stuck to my\n" +
      "      spikes in the first inning, but that happens at home, too. After that, it\n" +
      "      was perfect.”",
    caption: "London Games return in 2019",
    alt: "Basketball ring",
    picture: "ArticlePhoto.jpg",
    isActive: true,
    commentsActive: true,
    createDateTime: "20.09.2019",
    updateDateTime: null,
    category: "NBA", // here should be obj
    team: "Seattle Mariners" // here should be obj
  };
  const miniArticles = [
    {
      id: "2fff",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur1",
      isActive: true,
      category: ""
    },
    {
      id: "2ffa",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur2",
      isActive: true,
      category: ""
    },
    {
      id: "2ffb",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur3",
      isActive: true,
      category: ""
    },
    {
      id: "2ffc",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur4",
      isActive: true,
      category: ""
    },
    {
      id: "2ffd",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur5",
      isActive: true,
      category: ""
    },
    {
      id: "2ffe",
      title: "Lorem ipsum",
      shortText: "Lorem ipsum dolor sit amet, consectetur6",
      isActive: true,
      category: ""
    }
  ];
  const { id } = useParams();
  useEffect(() => {
    getArticleByCategory(id);
    getMorePopularArticles();
  }, []);

  function getArticleByCategory(id) {
    console.log("function getArticleByCategory");
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    console.log("token: ", set1AuthToken["jwt"]);
    //document.getElementsByTagName("Nav.Link")[0].getAttribute("href")
    axios.get("http://localhost:8080/api/v1/articles/category_id/" + id, {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getArticles");
        console.log(response.data);
        setArticlesByCategory(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function getMorePopularArticles() {
    console.log("function getMorePopularArticles");
    const set1AuthToken = JSON.parse(localStorage.getItem("user"));
    console.log("token: ", set1AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/v1/articles/morePopular", {
      headers: {
        authorization: set1AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getMorePopularArticles");
        console.log(response.data);
        setMorePopularArticles(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  const [morePopularArticles, setMorePopularArticles] = useState([]);
  const [auth] = useState("Bearer ");
  return (
    <div className={"header-information"}>
      <Header />

      <div className={"nav-bar-information"}>
        <div className={"nav-bar"}>
          <NavBar />
        </div>
        <div className="category_page">
          <ArticleHeading
            published={article["createDateTime"]}
            title={article["title"]}
            subtitle={article["caption"]}
          />
          <img
            className="article-image"
            alt={article["alt"]}
            //src={article.picture}
            src={articleImage}
          />
          <div className="category_articles">
            {
              articlesByCategory.map(article =>
                <ShortArticle title={article.title} shortText={article.shortText}
                              category={null} />
              )
            }
          </div>
          <div className="mini-articles">
            <div className="mini-articles-l">
              <span className="more-popular">MORE POPULAR</span>
              <hr className="more-lin-l"></hr>
              {morePopularArticles.slice(0, 3).map((miniArticle) => (
                <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
              ))}
            </div>
            <div className="mini-articles-r">
              <span className="more-commented">MORE COMMENTED</span>
              <hr className="more-lin-r" />
              {miniArticles.slice(3, 7).map((miniArticle) => (
                <MiniArticle miniArticle={miniArticle} key={miniArticle.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
