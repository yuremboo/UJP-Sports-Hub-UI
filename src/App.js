import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";

import {Provider} from "react-redux";
import ProfileSection from "./Components/profileSectionHeader/profileSection";


function App() {
    return (
        <div className="App">
            <Outlet />
            {/*<ProfileSection/>*/}
        </div>
    );
}

export default App;
