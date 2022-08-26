import React, {useState, useEffect} from 'react';
import './categorybutton.css';
import axios from "axios";

const CategoryButton = (props) => {
    const [allArticlesByCatId, setAllArticlesByCatId] = useState([
        {
            "id": "1",
            "title": "I'ts title of article 1",
            "shortText": "I'ts short text article 1. Akjhgf ghjki hyuioghj ghyjui ghjui ghyuji ghyui ghyui",
            "isActive": true,
            "category": {
                "id": "1",
                "name": "soccer",
                "description": "its description11",
                "isActive": true,
                "createDateTime": "2002-11-12T00:00:00",
                "updateDateTime": "2021-11-12T00:00:00",
                "parent": null
            }
        },
        {
            "id": "2",
            "title": "It is a title of article 2",
            "shortText": "I'ts a short text article 2. Akjhgf ghjki hyuioghj ghyjui ghjui ghyuji ghyui ghyui",
            "isActive": true,
            "category": {
                "id": "1",
                "name": "soccer",
                "description": "its description11",
                "isActive": true,
                "createDateTime": "2002-11-12T00:00:00",
                "updateDateTime": "2021-11-12T00:00:00",
                "parent": null
            }
        },
        {
            "id": "5",
            "title": "its title article 5",
            "shortText": "I'ts short text article 5. Akjhgf ghjki hyuioghj ghyjui ghjui ghyuji ghyui ghyui",
            "isActive": false,
            "category": {
                "id": "1",
                "name": "soccer",
                "description": "its description11",
                "isActive": true,
                "createDateTime": "2002-11-12T00:00:00",
                "updateDateTime": "2021-11-12T00:00:00",
                "parent": null
            }
        },
        {
            "id": "6",
            "title": "It is title article 6",
            "shortText": "It is text article 6 and it is first sentence",
            "isActive": true,
            "category": {
                "id": "1",
                "name": "soccer",
                "description": "its description11",
                "isActive": true,
                "createDateTime": "2002-11-12T00:00:00",
                "updateDateTime": "2021-11-12T00:00:00",
                "parent": null
            }
        },
        {
            "id": "7",
            "title": "its title article 7",
            "shortText": "First sentence of article 7",
            "isActive": true,
            "category": {
                "id": "1",
                "name": "soccer",
                "description": "its description11",
                "isActive": true,
                "createDateTime": "2002-11-12T00:00:00",
                "updateDateTime": "2021-11-12T00:00:00",
                "parent": null
            }
        }
    ]);
    useEffect(() => {
        findArticlesByCategoryId(props.categoryId);
    }, []);

    function findArticlesByCategoryId(id){
        axios.get("http://localhost:8080/api/v1/articles/category_id/"+id, {
            headers:{
                "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXgiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sImlhdCI6MTY1OTYzOTcwOCwiZXhwIjoxNjYwNDI0NDAwfQ.G_poCxvtku1FYp4r2BuSRdYwNxQcHxvQ1z9yzrLgDoSMsh7zf3QIWXGLfwA8w--M4pHaCRUA4OIEeiyh-SsiCQ",
            }
        })
            .then((response)=> {
                const data = response.data;
                console.log('getArticles');
                console.log(response.data);
                setAllArticlesByCatId(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("error.response.status");
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
    }

    return (
        <div className='category_button'>
            <button onClick={findArticlesByCategoryId}>{props.categoryName}</button>
        </div>
    );
};

export default CategoryButton;