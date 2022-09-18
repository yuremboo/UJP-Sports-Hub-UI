import React from 'react';
import {LeftArrow, RightArrow} from "./arrows";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {useState, useEffect} from "react";
import axios from "axios";
import './horizontalscrollmenu.css';

const HorizontalScrollMenu = () => {
    //const [categories, setCategories] = useState([]);
    const [categories, setCategories] = useState(
        [
            {
                "id": "0",
                "name": "home",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": {
                    "id": "2",
                    "name": "name",
                    "description": "Description",
                    "isActive": true,
                    "createDateTime": "1998-11-13T00:00:00",
                    "updateDateTime": "1976-04-13T00:00:00",
                    "parent": null
                }
            },

            {
                "id": "1",
                "name": "nba",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": {
                    "id": "2",
                    "name": "name",
                    "description": "Description",
                    "isActive": true,
                    "createDateTime": "1998-11-13T00:00:00",
                    "updateDateTime": "1976-04-13T00:00:00",
                    "parent": null
                }
            },

            {
                "id": "2",
                "name": "nfl",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "3",
                "name": "mlb",
                "description": "Description category 3",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "4",
                "name": "nhl",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": {
                    "id": "2",
                    "name": "name",
                    "description": "Description",
                    "isActive": true,
                    "createDateTime": "1998-11-13T00:00:00",
                    "updateDateTime": "1976-04-13T00:00:00",
                    "parent": null
                }
            },

            {
                "id": "5",
                "name": "cbb",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "6",
                "name": "cfb",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "7",
                "name": "nascar",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": {
                    "id": "2",
                    "name": "name",
                    "description": "Description",
                    "isActive": true,
                    "createDateTime": "1998-11-13T00:00:00",
                    "updateDateTime": "1976-04-13T00:00:00",
                    "parent": null
                }
            },

            {
                "id": "8",
                "name": "golf",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "9",
                "name": "soccer",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "11",
                "name": "lifestyle",
                "description": "Description",
                "isActive": true,
                "createDateTime": "1998-11-13T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "12",
                "name": "dealbook",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            },

            {
                "id": "13",
                "name": "video",
                "description": "Description category",
                "isActive": true,
                "createDateTime": "2000-11-12T00:00:00",
                "updateDateTime": "1976-04-13T00:00:00",
                "parent": null
            }
        ])

    const [authToken, setAuthToken] = useState('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbWFpbDJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV0sImlhdCI6MTY2MDg0MTQ3NywiZXhwIjoxNjYxNjM0MDAwfQ.xkylFnDtkgIYgePPGCIila6BNiSZRryXC9LSY_jfijApRepHs4AQ7ED_JWI1vy8o9JusTSDYf4qVOV7wA86eWA');

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        console.log('function getAllCategories');
        console.log('token: ', authToken);
        axios.get("http://localhost:8080/api/categories", {
            headers: {
                "Authorization": authToken,
            }
        })
            .then((response) => {
                const data = response.data
                console.log('getCategories')
                console.log(response.data)
                setCategories(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status: ", error.response.status);
                }
            })
    }


    return (
        <div className='horizontal_scroll_menu'>
            <ScrollMenu itemClassName='scroll_menu'
                        LeftArrow={LeftArrow}
                        RightArrow={RightArrow}
                        options={{
                            ratio: 0.9,
                            rootMargin: "5px",
                            threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                        }}
            >
                {
                    categories.map(category => <div className='category_button'>
                    <button>{category.name.toUpperCase()}</button>
                </div>)
                }
            </ScrollMenu>
        </div>
    );
};

export default HorizontalScrollMenu;