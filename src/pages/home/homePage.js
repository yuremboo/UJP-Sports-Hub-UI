import React from 'react';
import {
    useNavigate
} from "react-router-dom";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import AllArticlesAdmin from "../allArticlesAdmin/AllArticlesAdmin";

const HomePage = () => {
    let navigate = useNavigate();

    function logIn(){
        navigate("/login");
    }

    return (
        <div>
            {/*<h2>Home page</h2>*/}
            <Header/>
            <NavBar/>
            <button onClick={logIn}>LOG IN</button>
            {/*<AllArticlesAdmin/>*/}
        </div>
    );
};

export default HomePage;