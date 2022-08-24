import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import React from "react";
import HorizontalScrollMenu from "./components/horizontal-scroll-menu/horizontalScrollMenu";

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
