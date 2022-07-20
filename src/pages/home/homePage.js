import React from 'react';
import {
    useNavigate
} from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();

    function logIn(){
        navigate("/login");
    }

    return (
        <div>
            <h2>Home page</h2>
            <button onClick={logIn}>LOG IN</button>
        </div>
    );
};

export default HomePage;