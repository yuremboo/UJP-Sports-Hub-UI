import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import React from "react";

function App() {
    return (
        <div className="App">
            {/* <header className="App-header">
                <Heder></Heder>
            </header>
            <Navbar></Navbar> */}
            <Outlet />
        </div>
    );
}

export default App;
