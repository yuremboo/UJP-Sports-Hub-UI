import "./SubscriptionUser.css";
import React, {useEffect, useState} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import SubscriptionTeam from "./SubscriptionTeam";

//import { Formik, Field, Form } from "formik";
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
  const [teamsSelected, setTeamsSelected] = useState([]);
  const AuthToken = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getSubscriptionByUserId();
    getTeamsByName();
  }, []);

  function getSubscriptionByUserId() {
    console.log('function getSubscriptionUser');
    console.log('token: ', AuthToken['jwt']);
    axios.get("http://localhost:8080/api/v1/teams/subscription", {
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

  function getTeamsByName() {
    axios.get("http://localhost:8080/api/v1/teams", {
      headers: {
        authorization:AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log('getTeamsByName')
        console.log(response.data)
        setTeamsSearch(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }


  function addNewTeamSubscription(e) {
    e.preventDefault();

    const newSubscription = {
      //id: uuidv4(),
      userId: AuthToken['id'],
      teamId: teamsSelected,
      //createDateTime: Date.now(),
      //updateDateTime: null
    };
    postSubscription(newSubscription);
    //setSubscriptionUser([...subscription, newSubscription]);
  }

  function postSubscription(newSubscription) {
    console.log('token: ', AuthToken['jwt']);
    axios.post("http://localhost:8080/api/v1/subscription", newSubscription, {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
          console.log(newSubscription);
        }
      });
  }

  const handleChange = event => {
    const {value} = event.target
    setTeamsSelected(value)
    console.log(value)
   console.log(teamsSelected)
  }
  const loadOptions = (searchValue,callback) => {
    setTimeout(()=>{
      getTeamsByName(searchValue);
      // const filteredOptions= teamsSearch.filter((data) => {
      //           return data.team.name.toLowerCase().includes(searchValue.toLowerCase());
      // })
      console.log("loadOptions",searchValue,teamsSearch)
      const filteredOptions=  teamsSearch.map(team =>team.name);
      console.log("loadOptions",filteredOptions)
      callback(teamsSearch);
          //teamsSearch.map(team =>teamsSearch.name));
    },1000)
  }
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

              {/*<div className="icon"><i className="fas fa-search"></i></div>*/}
              {/*  <button className={"follow-button"} onClick={addNewTeamSubscription}>*/}
              {/*  FOLLOW*/}
              {/*</button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <CustomSelect
            label={"Teams*"}
            name={"teams"}
            enumeration={teamsSearch}
            // enumeration={teamsSearch.map((article)=>({...article, name:article.team.name, id:article.team.name}))}
            handleChange={handleChange}
            loadOptions={loadOptions}
        />
        <div className="icon"><i className="fas fa-search"></i></div>
        <button className={"follow-button"} onClick={addNewTeamSubscription}>
          FOLLOW
        </button>
        {/*<SelectTeam*/}
        {/*  label={"Subcategory"}*/}
        {/*  name={"subcategory"}*/}
        {/*  enumeration={teamsSearch}*/}
        {/*  //loadOptions={loadOptions}*/}
        {/*  handleChange={handleChange}*/}
        {/*/>*/}

        <div className="subscriptions_teams">
        {
          subscriptionUser.map(team =>
            <SubscriptionTeam title={team.team.name} image={team.team.alt}
                              subscriptionId={team.subscriptionId}  />
          )
        }
      </div>

      </form>
    </div>
  );

}

export default SubscriptionUser;