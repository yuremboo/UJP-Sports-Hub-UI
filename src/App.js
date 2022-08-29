import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import Heder from './components/Header'
import Navbar from './components/NavBar'
import LoginPage from './pages/login/loginPage';
import RegistrationPage from './pages/registration/registrationPage';
import {Provider} from "react-redux";
import AllArticlesAdmin from "./pages/allArticlesAdmin/AllArticlesAdmin";

function App() {
    return (
        <div className="App">
            {/* <header className="App-header">
                <Heder></Heder>
            </header>
            <Navbar></Navbar>*/}
            <Outlet />
            {/* <RegistrationPage/> */}
        </div>
    );
}

export default App;
