import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import React from "react";

function App() {
    return (
        <div className="App">
            <Outlet/>
        </div>
    );
}

export default App;
