import {ReactComponent as Surveys} from "../../icons/iconsNavBar/Surveys.svg"
import React from 'react';
import {ReactComponent as Banners} from "../../icons/iconsNavBar/Banners.svg"
import {ReactComponent as Languages} from "../../icons/iconsNavBar/Langueges.svg"
import {ReactComponent as Footer} from "../../icons/iconsNavBar/Footer.svg"
import {ReactComponent as Shares} from "../../icons/iconsNavBar/Shares.svg"
import {ReactComponent as My_users} from "../../icons/iconsNavBar/My users.svg"
import {ReactComponent as IA} from "../../icons/iconsNavBar/IA.svg"
import {ReactComponent as Teams} from "../../icons/iconsNavBar/teams.svg"
import {ReactComponent as News_partnerds} from "../../icons/iconsNavBar/News partnerds.svg"
import {ReactComponent as Advertising} from "../../icons/iconsNavBar/Advertising.svg"
import "./nav-bar-icons.style.css";

const NavBarIcons = () => {
    return (
        <div className='nav-bar-icons'>
            <button><Surveys/></button>
            <button><Banners/></button>
            <button><Languages/></button>
            <button><Footer/></button>
            <button><Shares/></button>
            <button><My_users/></button>
            <button><IA/></button>
            <button><Teams/></button>
            <button><News_partnerds/></button>
            <button><Advertising/></button>
        </div>
    );
}

export default NavBarIcons;