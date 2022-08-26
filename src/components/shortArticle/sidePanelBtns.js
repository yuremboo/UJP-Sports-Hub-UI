import React from 'react';
import surveys from "../../icons/Surveys.svg";
import banners from "../../icons/Banners.svg";
import languages from "../../icons/Langueges.svg";
import footer from "../../icons/Footer.svg";
import shares from  "../../icons/Shares.svg";
import myusers from "../../icons/MyUsers.svg";
import ia from "../../icons/IA.svg";
import teams from "../../icons/teams.svg";
import "./sidepanelbtns.css";

const SidePanelBtns = () => {
    function surveysFunc(){
        console.log("surveys btn");
    }

    function bannersFunc(){
        console.log("banners btn");
    }

    function languagesFunc(){
        console.log("languages btn");
    }

    function footerFunc(){
        console.log("footer btn");
    }
    function sharesFunc(){
        console.log("shares btn");
    }

    function myusersFunc(){
        console.log("myusers btn");
    }
    function iaFunc(){
        console.log("ia btn");
    }

    function teamsFunc(){
        console.log("teams btn");
    }


    return (
        <div className='allSidePanelBtns'>
            <div className='sidePanelBtn'>
                <button onClick={surveysFunc}>
                    <img src={surveys} alt="surveys"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={bannersFunc}>
                    <img src={banners} alt="banners"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={languagesFunc}>
                    <img src={languages} alt="languages"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={footerFunc}>
                    <img src={footer} alt="footer"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={sharesFunc}>
                    <img src={shares} alt="shares"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={myusersFunc}>
                    <img src={myusers} alt="myusers"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={iaFunc}>
                    <img src={ia} alt="ia"/>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={teamsFunc}>
                    <img src={teams} alt="teams"/>
                </button>
            </div>
        </div>
    );
};

export default SidePanelBtns;