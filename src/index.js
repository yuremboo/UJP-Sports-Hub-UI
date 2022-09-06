import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import ForgotPassword from "./pages/login/forgotPassword";
import HomePage from "./pages/home/homePage";
import TeamHub from "./pages/teamHub/teamHub";
import RegistrationPage from "./pages/registration/registrationPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import EditArticle from "./pages/editArticle/editArticle";
import Profile from "./pages/profile/profile";
import ArticlePage from "./pages/article/articlePage";
import AllArticlesAdmin from "./pages/allArticlesAdmin/AllArticlesAdmin";
import CategoryPage from "./pages/category_team_page/categoryPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route index element={<HomePage />} />
                    <Route path="forgot" element={<ForgotPassword />} />
                    <Route path="registration" element={<RegistrationPage />} />
                    <Route path="edit-article" element={<EditArticle/>} />
                    <Route path="update-user-information" element={<Profile/>} />
                    <Route path="articles" element={<ArticlePage/>}/>
                    <Route path="teams" element={<TeamHub/>}/>
                    <Route path="admin/articles" element={<AllArticlesAdmin/>}/>
                    <Route path="category" element={<CategoryPage/>}/>
                </Route>
                {/*<Route>*/}
                {/*    <Route path="registration" element={<RegistrationPage/>} />*/}
                {/*    <Route path="login" element={<LoginPage/>} />*/}
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>
    </Provider>
);
