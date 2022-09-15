import React, {useEffect, useState} from 'react';
import './shortarticleadmin.css';
import articleImage from "../../icons/shortArticleImg.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
    useNavigate
} from "react-router-dom";

// function BasicButtonExample() {
//     return (
//         <DropdownButton id="dropdown-basic-button" title="Dropdown button">
//             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//         </DropdownButton>
//     );
// }
// export default BasicButtonExample;

const ShortArticleAdmin = (props) => {
    const [menu, setMenu] = useState([]);
    const [isPublished, setIsPublished] = useState({});

    function displayMenu() {
        if (props.isPublished === true) {
            setMenu([
                {
                    "action": "Unpublish",
                    "onclick": "unpublish"
                },
                {
                    "action": "Delete",
                    "onclick": "delete"
                },
                {
                    "action": "Move",
                    "onclick": "move"
                }
            ])
        } else {
            setMenu([
                {
                    "action": "Publish",
                    "onclick": "publish"
                },
                {
                    "action": "Edit",
                    "onclick": "edit"
                },
                {
                    "action": "Delete",
                    "onclick": "delete"
                },
                {
                    "action": "Move",
                    "onclick": "move"
                }
            ])
        }
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
        displayMenu();
    }, []);

    return (
      <div className='n_shortArticle__outer'>
          <div className='n_shortArticle'>
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


          </div>
          <div className='n_shortarticle__button'>
              <DropdownButton id="dropdown-basic-button" onClick={displayMenu} title="...">
                  {/*<Dropdown.Item>Action</Dropdown.Item>*/}
                  {/*<Dropdown.Item>Another action</Dropdown.Item>*/}
                  {/*<Dropdown.Item>Something else</Dropdown.Item>*/}
                  {
                      menu.map(action => <Dropdown.Item onClick={action.onclick}>{action.action}</Dropdown.Item>)
                  }
              </DropdownButton>
          </div>
      </div>
    );
};

export default ShortArticleAdmin;