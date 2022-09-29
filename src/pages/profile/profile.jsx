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
import accountSwitcher from "../../icons/accountSwitcher.svg";
import ProfileSection from "../../Components/profileSectionHeader/profileSection";
import SaveCancelChanges from "../../Components/SaveCancelChanges/SaveCancelChanges";
import HorizontalScrollMenu from "../../Components/horizontal-scroll-menu/horizontalScrollMenu";
import EllipseAvatar from "../../icons/EllipseAvatar.jpg";

const Profile = ({props, globalStore}) => {
    const {profile} = useParams();
        return (
            <div className={"update-user-information"}>
                    <div className="profile_admin__header__outer_fixed">
                        <div className="profile_admin__header">
                            <div className="sportshub">Sports hub</div>
                            <div className="n_all_articles_admin__right_header">
                                <div className="n_admin__profile_section">
                                    <ProfileSection/>
                                </div>
                            </div>
                        </div>
                    </div>

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