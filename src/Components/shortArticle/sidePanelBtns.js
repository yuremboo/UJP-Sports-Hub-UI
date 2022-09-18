import React from 'react';
import {ReactComponent as Surveys} from "../../icons/Surveys.svg";
import {ReactComponent as Banners} from "../../icons/Banners.svg";
import {ReactComponent as Languages} from "../../icons/Langueges.svg";
import {ReactComponent as Footer} from "../../icons/Footer.svg";
import {ReactComponent as Shares} from  "../../icons/Shares.svg";
import {ReactComponent as Myusers} from "../../icons/MyUsers.svg";
import {ReactComponent as IA} from "../../icons/IA.svg";
import {ReactComponent as Teams} from "../../icons/teams.svg";
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
                    <Surveys className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Surveys</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={bannersFunc}>
                    <Banners className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Banners</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={languagesFunc}>
                    <Languages className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Languages</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={footerFunc}>
                    <Footer className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Footer</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={sharesFunc}>
                    <Shares className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Social networks</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={myusersFunc}>
                    <Myusers className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Users</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={iaFunc}>
                    <IA className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">IA</span>
                </button>
            </div>

            <div className='sidePanelBtn'>
                <button onClick={teamsFunc}>
                    <Teams className="sidePanel_btn" width='100%' height='100%'/>
                    <span className="tooltiptext">Teams</span>
                </button>
            </div>
        </div>
    );
};

export default SidePanelBtns;