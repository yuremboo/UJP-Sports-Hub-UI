import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import ForgotPassword from "./pages/login/forgotPassword";
import HomePage from "./pages/home/homePage";
import RegistrationPage from "./pages/registration/registrationPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AllArticlesAdmin from "./pages/allArticlesAdmin/AllArticlesAdmin";

const root = ReactDOM.createRoot(document.getElementById('root'));

// var cors = require('cors')

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// router.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
// });


root.render(

    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="forgot" element={<ForgotPassword />} />
                    <Route path="registration" element={<RegistrationPage />} />
                    <Route path="admin/articles" element={<AllArticlesAdmin/>}/>
                </Route>
                {/*<Route>*/}
                {/*    <Route path="registration" element={<RegistrationPage/>} />*/}
                {/*    <Route path="login" element={<LoginPage/>} />*/}
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>
    </Provider>
// >>>>>>> 8addd2c4671e20ede570e31cbc2e3381c994c1e0
);

// root.use(cors(corsOptions));
