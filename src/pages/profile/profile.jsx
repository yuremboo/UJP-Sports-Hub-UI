import "./profile.style.css";
import React from 'react';
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar/MainNavBar";
import UpdateUserInfo from "../../Components/UpdateUserInfo/UpdateUserInfo";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import SubscriptionUser from "../../Components/Subscriptions/SubscriptionUser";
import {useEffect} from "react";
import {render} from "react-dom";

const Profile = ({props, globalStore}) => {
    const {profile} = useParams();
        return (
            <div className={"update-user-information"}>
                <Header/>

                <div className={"update-user__wrapper"}>
                    <div className={"nav-bar-user"}>
                        <NavBar/>
                    </div>

                    <div className={"user-panel"}>
                        <div>
                            <a  href={"http://localhost:3000/update-user-information/userInfo"}>
                            <button className={"panel-button"}>
                                <span className={"span-button"}>Personal</span>
                            </button>
                            </a>
                        </div>
                        <div>
                            <a  href={"http://localhost:3000/update-user-information/changePassword"}>
                            <button className={"panel-button"}>
                                <span className={"span-button"}>Change password</span>
                            </button>
                            </a>
                        </div>
                        <div>
                            <button className={"panel-button"}>
                                <span className={"span-button"}>My surveys</span>
                            </button>
                        </div>
                        <div>
                            <a  href={"http://localhost:3000/update-user-information/subscriptionUser"}>
                            <button className={"panel-button"}>
                                <span className={"span-button"}>Team hub</span>
                            </button>
                            </a>
                        </div>
                    </div>
                    {
                        (() => {
                            switch (profile) {

                                case("userInfo"): {
                                    return <UpdateUserInfo/>;
                                }
                                    break;

                                case("changePassword"): {
                                    return <ChangePassword/>;
                                }
                                    break;
                                case("subscriptionUser"): {
                                    return <SubscriptionUser/>;
                                }
                                    break;
                                default: {
                                    return (
                                        <p>Bye</p>
                                    )
                                }
                                    break;
                            }
                        })()
                    }

                </div>
            </div>
        );
    };

    export default Profile;