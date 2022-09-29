import React from 'react';
import {useNavigate} from "react-router-dom";
import {userLogoutRequest} from "../../redux/auth/auth.actions";
import {connect} from "react-redux";
import "./profilesectionheader.css";
import Dropdown from 'react-bootstrap/Dropdown';
import polygon from "../../icons/Polygon.svg";
import defaultUserImage from "../../icons/defaultUser.jpg";

const ProfileSection = ({
                            logOutUser,
                        }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let navigate = useNavigate();

    function getUserRole() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user != null) {
            return JSON.parse(localStorage.getItem("user")).role;
        } else {
            return null;
        }
    }

    async function logOut() {
        await logOutUser()
        navigate("/login");
    }
    return (
        <div className='profile-section-header'>
            <Dropdown className="dropdown-profile-section-header">
                <Dropdown.Toggle className="dropdown-toggle-prodile" variant="success" id="dropdown-basic">
                    <div className="profile-section-header--image">
                        <img src={user.photo ? ("http://localhost:8080/api/v1/image/" + user.photo) : defaultUserImage} height="10%" width="10%"/>
                    </div>
                    <div className="profile-section-header--text">
                        <div>
                            <div className="profile-section-header--text-name">
                                <div className="profile-name">
                                    {user.firstName}
                                    {" "}
                                    {user.lastName}
                                </div>
                                <img src={polygon} height="100%" width="100%"/>
                            </div>
                            {getUserRole() === "ADMIN" ?
                                <div className="profile-section-header--text-admin">
                                    Administrator
                                </div> : <div className="profile-section-header--text-admin" >User</div>
                            }
                        </div>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className="dropdown-item" href="">
                        <div className="profile-name">
                            {user.firstName}
                            {" "}
                            {user.lastName}
                        </div>
                        <div className="profile-section-header--text-admin">
                            {user.email}
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item-active" href="/update-user-information/userInfo">View profile</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="/update-user-information/changePassword">Change password</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="/update-user-information/subscriptionUser">Team Hub</Dropdown.Item>
                    <Dropdown.Item onClick={logOut} className="dropdown-item" href="login">Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logOutUser: () => dispatch(userLogoutRequest()),
})
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection)