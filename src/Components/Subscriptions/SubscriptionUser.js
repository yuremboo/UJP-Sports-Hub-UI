import "./SubscriptionUser.css";
import React, {useEffect, useState} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import SubscriptionTeam from "./SubscriptionTeam";

import { Formik, Field, Form } from "formik";
import CustomSelect from "../CustomSelect/CustomSelect";
import SelectTeam from "./SelectTeam";
const SubscriptionUser = () => {
  const [team, setTeam] = useState([

      {
        "subscriptionId": "1",
        "team": {
          "id": "1",
          "name": "name",
          "location": "location",
          "logo": 1,
          "description": "description",
          "createDateTime": "1998-11-13T00:00:00",
          "updateDateTime": "1976-04-13T00:00:00",
          "category": {
            "id": "1",
            "name": "name",
            "description": "Description",
            "isActive": true,
            "createDateTime": "1998-11-13T00:00:00",
            "updateDateTime": "1976-04-13T00:00:00",
            "parent": {
              "id": "2",
              "name": "name",
              "description": "Description",
              "isActive": true,
              "createDateTime": "1998-11-13T00:00:00",
              "updateDateTime": "1976-04-13T00:00:00",
              "parent": null
            }
          }
        }

    }
  ]);
  const [subscriptionUser, setSubscriptionUser] = useState([]);
  const [teamsSearch, setTeamsSearch] = useState([]);
  const AuthToken = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getSubscriptionUser();
    //constantu();
    //myFunctionSuggestions(subscriptionUser);
  }, []);

  function getSubscriptionUser() {
    console.log('function getSubscriptionUser');
    console.log('token: ', AuthToken['jwt']);
    axios.get("http://localhost:8080/api/teams/subscription", {
      headers: {
        authorization: AuthToken['jwt'],
      }
    })
      .then((response) => {
        const data = response.data
        console.log('getSubscriptionUser')
        console.log(response.data)
        setSubscriptionUser(data)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
  }

  function getTeamsByName(search_name) {
    axios.get("http://localhost:8080/api/teams/search_name/"+search_name, {
      headers: {
        authorization:AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        setTeamsSearch(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function addNewTeamSubscription(e) {
    e.preventDefault();

    const newSubscription = {
      id: uuidv4(),
      user: AuthToken['jwt'],
      //team: team.id,
      createDateTime: Date.now(),
      updateDateTime: null
    };
    //postSubscription(newSubscription);
    //setSubscriptionUser([...subscription, newSubscription]);
  }

  // function postSubscription(newSubscription) {
  //   console.log('token: ', AuthToken['jwt']);
  //   axios.post("http://localhost:8080/api/subscription", newSubscription, {
  //     headers: {
  //       authorization: AuthToken["jwt"]
  //     }
  //   })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log("error.response.status: ", error.response.status);
  //       }
  //     });
  // }

  function deleteSubscription(team) {
    console.log('token: ', AuthToken['jwt']);
    axios.delete("http://localhost:8080/api/subscription/" + team.subscriptionId + "/team", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }
  let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
  ];

  const handleChange = event => {
    const {name, value} = event.target
    //setArticle({...article, [name]: value})
   // console.log(article)
  }
  const loadOptions = (searchValue,callback) => {
    setTimeout(()=>{
      const filteredOptions= subscriptionUser.filter((data) => {
                return data.team.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      console.log("loadOptions",searchValue,filteredOptions,subscriptionUser)
      callback(filteredOptions);
    },2000)
  }
  // function constantu() {
  //   // getting all required elements
  //   const searchWrapper = document.querySelector(".search-input");
  //   const inputBox = searchWrapper.querySelector("input");
  //   const suggBox = searchWrapper.querySelector(".autocom-box");
  //   const icon = searchWrapper.querySelector(".icon");
  //   let linkTag = searchWrapper.querySelector("a");
  //   let webLink;
  //
  //   inputBox.onkeyup = (e) => {
  //     let userData = e.target.value; //user enetered data
  //     let emptyArray = [];
  //     console.log(inputBox.value)
  //
  //     //getTeamsByName(inputBox.value);
  //     //myFunctionSuggestions(teamsSearch);
  //     console.log(suggestions)
  //     if (userData) {
  //       icon.onclick = () => {
  //         webLink = `https://www.google.com/search?q=${userData}`;
  //         linkTag.setAttribute("href", webLink);
  //         linkTag.click();
  //       }
  //       emptyArray = suggestions.filter((data) => {
  //         //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
  //         return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
  //       });
  //       emptyArray = emptyArray.map((data) => {
  //         // passing return data inside li tag
  //         return data = `<li>${data}</li>`;
  //       });
  //       searchWrapper.classList.add("active"); //show autocomplete box
  //       showSuggestions(emptyArray);
  //       let allList = suggBox.querySelectorAll("li");
  //       for (let i = 0; i < allList.length; i++) {
  //         //adding onclick attribute in all li tag
  //         allList[i].setAttribute("onclick", "select(this)");
  //       }
  //     } else {
  //       searchWrapper.classList.remove("active"); //hide autocomplete box
  //     }
  //   }
  //
  //   function select(element){
  //     let selectData = element.textContent;
  //     inputBox.value = selectData;
  //     icon.onclick = ()=>{
  //       webLink = `https://www.google.com/search?q=${selectData}`;
  //       linkTag.setAttribute("href", webLink);
  //       linkTag.click();
  //     }
  //     searchWrapper.classList.remove("active");
  //   }
  //   function showSuggestions(list){
  //     let listData;
  //     if(!list.length){
  //       let userValue;
  //       userValue = inputBox.value;
  //       listData = `<li>${userValue}</li>`;
  //     }else{
  //       listData = list.join('');
  //     }
  //     suggBox.innerHTML = listData;
  //   }
  // }
  return(
    <div>

      <form className={"change-subscription"}>
        <div className={"text"}>
          FOLLOW YOUR FAVORITE TEAMS
        </div>
        {/*<div className={"field-input"}>*/}

        {/*  <div className="wrapper">*/}
        {/*    <div className="search-input">*/}
        {/*      <a href="" target="_blank" hidden></a>*/}
        {/*      <input type="text" placeholder="Type to search.."/>*/}
        {/*      <div className="autocom-box">*/}
        {/*      </div>*/}

        {/*      <div className="icon"><i className="fas fa-search"></i></div>*/}
        {/*        <button className={"follow-button"} onClick={addNewTeamSubscription}>*/}
        {/*        FOLLOW*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}


        <SelectTeam
          label={"Subcategory"}
          name={"subcategory"}
          enumeration={subscriptionUser}
          loadOptions={loadOptions}
          handleChange={handleChange}
        />
        <div className="subscriptions_teams">
        {
          subscriptionUser.map(team =>
            <SubscriptionTeam title={team.team.name} image={team.team.alt}
                              subscriptionId={team.subscriptionId}  />
          )
        }
      </div>
      {/*<Formik*/}
      {/*  initialValues={{ name: "", email: "" }}*/}
      {/*  onSubmit={async (values) => {*/}
      {/*    await new Promise((resolve) => setTimeout(resolve, 500));*/}
      {/*    alert(JSON.stringify(values, null, 2));*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Form>*/}
      {/*    <Field name="name" type="text" />*/}
      {/*    <Field name="email" type="email" />*/}
      {/*    <button type="submit">Submit</button>*/}
      {/*  </Form>*/}
      {/*</Formik>*/}
      </form>
    </div>
  );

  //
  // function myFunctionSuggestions(teamsSearch) {
  //   for(var sub in teamsSearch )
  //   {
  //     suggestions.push(sub.team.name);
  //   }
  // }
}

export default SubscriptionUser;