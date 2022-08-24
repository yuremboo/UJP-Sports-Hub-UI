import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import AllArticlesAdmin from "./pages/allArticlesAdmin/AllArticlesAdmin";

function App() {
    return (
        <div className="App">
            {/*<Outlet/>*/}
            <AllArticlesAdmin/>
            {/*<RegistrationPage/>*/}
        </div>
    );
}

export default App;
