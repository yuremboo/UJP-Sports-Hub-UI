import React, {useEffect, useState} from 'react';
import './shortarticleadmin.css';
import articleImage from "../../icons/shortArticleImg.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
    useNavigate
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import axios from "axios";

const ShortArticleAdmin = (props) => {
    const authToken = JSON.parse(localStorage.getItem("user")).jwt;
    const [isPublished, setIsPublished] = useState({});
    const [isActive, setIsActive] = useState(props.isActive);
    let navigate = useNavigate();

    function UnPublish(){
        axios.put("http://localhost:8080/api/v1/admin/articles/publish/" + props.id, null,{
            headers: {
                "Authorization": authToken
            }
        })
            .then((response) => {
                setIsActive(!props.isPublished);
                console.log("isActive was changed");
                navigate(0);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    function isArticlePublished() {
        {
            if (props.isPublished === true) {
                setIsPublished({"dot": ".", "isPubl": "Published"});
            } else {
                setIsPublished({"dot": "", "isPubl": ""});
            }
        }
    }

    useEffect(() => {
        isArticlePublished();
    }, []);

    function deleteArticle(){
        axios.delete("http://localhost:8080/api/v1/admin/articles/" + props.id, {
            headers: {
                "Authorization": authToken
            }
        })
            .then((response) => {
                console.log("was deleted");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            });
    }

    return (
      <div className='n_shortArticle__outer'>
              <Nav.Link className='n_shortArticle' href={"/articles/" + props.id}>
              <div className='n_shortarticle__image'>
                  <img src={articleImage} alt="article"
                       width="100%" height="100%"/>
              </div>

              <div className='n_shortarticle__body'>
                  <div className='n_shortarticle__title'>
                      {props.title}
                  </div>
                  <div className='n_shortarticle__short_text'>
                      {props.shortText}
                  </div>
                  <div className='n_shortarticle__bottom'>
                      <div className='n_shortarticle__category'>
                          {props.category}
                      </div>
                      <div className='n_shortarticle__is_published'>
                          <div className='n_shortarticle__is_published__dot'>
                              {isPublished.dot}
                          </div>
                          <div className='n_shortarticle__is_published__ispubl'>
                              {isPublished.isPubl}
                          </div>

                      </div>
                  </div>
              </div>
          </Nav.Link>
          {
              props.isPublished === true ? <div className='n_shortarticle__button'>
                  <DropdownButton id="dropdown-basic-button" title="...">
                      <Dropdown.Item onClick={UnPublish}>Unpublish</Dropdown.Item>
                      <Dropdown.Item onClick={deleteArticle}>Delete</Dropdown.Item>
                      <Dropdown.Item>Move</Dropdown.Item>
                  </DropdownButton>
              </div>
                  :
                  <div className='n_shortarticle__button'>
                      <DropdownButton id="dropdown-basic-button" title="...">
                          <Dropdown.Item onClick={UnPublish}>Publish</Dropdown.Item>
                          <Dropdown.Item href={"/edit-article/"+props.id+"/"+props.category}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={deleteArticle}>Delete</Dropdown.Item>
                          <Dropdown.Item>Move</Dropdown.Item>
                      </DropdownButton>
                  </div>
          }
      </div>
    );
};

export default ShortArticleAdmin;