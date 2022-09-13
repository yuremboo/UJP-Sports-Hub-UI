import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import {Provider} from "react-redux";

function App() {
    return (
        <div className="App">
            <Outlet/>
        </div>
    );
}

export default App;
