import React from 'react';
import '../style_components/header.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import ProfileSection from "./profileSectionHeader/profileSection";

export default function Header() {
    let navigate = useNavigate();

    function getUserRole() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user != null) {
            return JSON.parse(localStorage.getItem("user")).role;
        } else {
            return null;
        }
    }

    function login() {
        navigate("/login");
    }

    function signUp() {
        navigate("/registration");
    }

    return (
        <div className='main_header_sport_hub'>
            <div className='logo_sport_hub'>
                <span> Sports hub</span>
            </div>

            <InputGroup className="mb-3 search"></InputGroup>
            <div className='share_button'></div>

            {getUserRole() === null ?
                <div className='sign_up_login_in'>
                    <Button variant="light" onClick={signUp}>Sign up</Button>{' '}
                    <Button id='log_in_button' variant="light" onClick={login}>Log in</Button>{' '}
                </div>
                :
                <div className="profile-section">
                    <ProfileSection/>
                </div>
            }

        </div>
    )
}
