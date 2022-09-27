import React from 'react';
import {LeftArrow, RightArrow} from "./arrows";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {useState, useEffect} from "react";
import axios from "axios";
import './horizontalscrollmenu.css';
import Nav from "react-bootstrap/Nav";
import {useNavigate} from "react-router-dom";

const HorizontalScrollMenu = () => {
    const [categories, setCategories] = useState([]);
    // const authToken = "Bearer " + JSON.parse(localStorage.getItem("user")).jwt;
    let navigate = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        axios.get("http://localhost:8080/api/v1/categories", {
            // headers: {
            //     "Authorization": authToken,
            // }
        })
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }

    function returnHome() {
        navigate("/");
    }

    return (
        <div className="horizontal_scroll_menu">
            <ScrollMenu itemClassName="scroll_menu"
                        LeftArrow={LeftArrow}
                        RightArrow={RightArrow}
                        options={{
                            ratio: 0.9, rootMargin: "5px", threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                        }}
            >
                <div className="category_button">
                    <button onClick={returnHome}>HOME</button>
                </div>

                {
                    categories.map(category =>
                        <Nav.Link className="category_button" href={"/admin/articles/category/" + category.id}>
                            <li>{category.name}</li>
                        </Nav.Link>
                    )
                }
            </ScrollMenu>
        </div>
    );
};

export default HorizontalScrollMenu;