import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import Heder from './Components/Header'
import Navbar from './Components/NavBar'
import LoginPage from './pages/login/loginPage';
import RegistrationPage from './pages/registration/registrationPage';
import {Provider} from "react-redux";

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
