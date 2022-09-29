import React, { useEffect, useState } from "react";
import "../../style_components/navbar.css";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get("http://localhost:8080/api/v1/categories", {

    })
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  return (
    <div className="main-nav">
      <div className="position_line">
        <ul>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link className="link-home" href="/">
              <li>HOME</li>
            </Nav.Link>
            {
              categories.map((category, index) =>
                <Nav.Link key={index} className="link-1" href={"/category/" + category.id}>
                  <li>{category.name}</li>
                </Nav.Link>
              )
            }
            <Nav.Link className="link-1" href="/teams">
              <li>TEAM HUB</li>
            </Nav.Link>
          </Nav>
        </ul>
      </div>
    </div>
  );
}