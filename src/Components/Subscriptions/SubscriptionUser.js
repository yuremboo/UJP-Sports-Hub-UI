import "./SubscriptionUser.css";
import React, {useEffect, useState} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import SubscriptionTeam from "./SubscriptionTeam";

//import { Formik, Field, Form } from "formik";
import CustomSelect from "../CustomSelect/CustomSelect";
import SelectTeam from "./SelectTeam";
import {useNavigate} from "react-router-dom";
const SubscriptionUser = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
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
      userId: AuthToken['id'],
      teamId: teamsSelected,
    };
    postSubscription(newSubscription);
    //setSubscriptionUser([...subscriptionUser, newSubscription]);
  }

  function postSubscription(newSubscription) {
    axios.post("http://localhost:8080/api/v1/subscription", newSubscription, {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
        .then((response) => {
          navigate(0);
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
      console.log("loadOptions",searchValue,teamsSearch)
      const filteredOptions=  teamsSearch.map(team =>team.name);
      console.log("loadOptions",filteredOptions)
      callback(teamsSearch);
    },1000)
  }
  return(
    <div>

      <form className={"change-subscription"}>
        <div className={"text"}>
          FOLLOW YOUR FAVORITE TEAMS
        </div>

        <CustomSelect
            label={"Teams*"}
            name={"teams"}
            enumeration={teamsSearch}
            handleChange={handleChange}
            loadOptions={loadOptions}
        />
        <div className="icon"><i className="fas fa-search"></i></div>
        <button className={"follow-button"} onClick={addNewTeamSubscription}>
          FOLLOW
        </button>

        <div className="subscriptions_teams">
        {
          subscriptionUser.map(team =>
            <SubscriptionTeam title={team.team.name} logo={team.team.logo}
                              subscriptionId={team.subscriptionId}  />
          )
        }
      </div>

      </form>
    </div>
  );

}

export default SubscriptionUser;