import React, { useEffect, useState } from "react";
import "../../style_components/navbar.css";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function NavBar() {

  const AuthToken = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    console.log("function getCategories");
    console.log("token: ", AuthToken["jwt"]);
    axios.get("http://localhost:8080/api/categories", {
      headers: {
        authorization: AuthToken["jwt"]
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("getCategories");
        console.log(response.data);
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
        <div className="line">
          <svg width="4" height="111" viewBox="0 0 4 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="111" rx="2" fill="#D4D9E2" />
          </svg>
        </div>
        <ul>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link className="link-home" href="/home">
              <li>HOME</li>
            </Nav.Link>
            {
              categories.map(category =>
                <Nav.Link className="link-1" href={"/category/" + category.id}>
                  <li>{category.name}</li>
                </Nav.Link>
              )
            }
            <Nav.Link className="link-1" href="/teams">
              <li>TEAM HUB</li>
            </Nav.Link>
            <Nav.Link className="link-1" eventKey="link-11">
              <li>LIFESTYLE</li>
            </Nav.Link>
            <Nav.Link className="link-1" eventKey="link-12">
              <li>DEALBOOK</li>
            </Nav.Link>
            <Nav.Link className="link-1" eventKey="link-13">
              <li>VIDEO</li>
            </Nav.Link>
          </Nav>
        </ul>
      </div>
      <div className="follow-link">
        <div className="follow-logo">Follow</div>
        <div className="but-1"><Button variant="light">
          <svg width="19" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.38892 5.21496H5.6644V3.54342C5.6644 2.91568 6.10916 2.76933 6.42242 2.76933C6.73496 2.76933 8.34508 2.76933 8.34508 2.76933V0.00966782L5.69719 0C2.75777 0 2.08885 2.05825 2.08885 3.3754V5.21496H0.388916V8.05863H2.08885C2.08885 11.7081 2.08885 16.1053 2.08885 16.1053H5.6644C5.6644 16.1053 5.6644 11.6647 5.6644 8.05863H8.07709L8.38892 5.21496Z"
              fill="black" />
          </svg>
        </Button>{" "}
          <Button variant="light">
            <svg width="19" height="17" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.3889 1.68216C16.764 1.96791 16.0914 2.16065 15.3857 2.24691C16.1062 1.8032 16.6587 1.10038 16.9193 0.261962C16.2453 0.673362 15.4992 0.971884 14.7045 1.13304C14.0685 0.435893 13.162 0 12.1588 0C10.2329 0 8.67134 1.6062 8.67134 3.5876C8.67134 3.86837 8.70205 4.14205 8.76175 4.40507C5.86302 4.25528 3.29282 2.82727 1.57256 0.656679C1.27234 1.18628 1.10048 1.80249 1.10048 2.46059C1.10048 3.70509 1.71612 4.80334 2.65199 5.44653C2.08053 5.42772 1.54254 5.26621 1.07219 4.9975C1.07184 5.01241 1.07184 5.02767 1.07184 5.04294C1.07184 6.78083 2.27412 8.23049 3.8698 8.56061C3.57717 8.64225 3.26901 8.68626 2.95084 8.68626C2.72584 8.68626 2.5074 8.6639 2.29448 8.62166C2.73861 10.0468 4.02647 11.0844 5.55245 11.1131C4.35879 12.0754 2.85525 12.6491 1.22092 12.6491C0.939674 12.6491 0.66188 12.632 0.388916 12.5986C1.93283 13.617 3.76593 14.2105 5.73534 14.2105C12.1508 14.2105 15.6587 8.74412 15.6587 4.00325C15.6587 3.84778 15.6555 3.69266 15.649 3.53861C16.3302 3.03386 16.9217 2.40167 17.3889 1.68216Z"
                fill="black" />
            </svg>
          </Button>{" "}
        </div>
        <div><Button variant="light">
          <svg width="19" height="17" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.62149 7.50011C3.62149 7.01296 3.70235 6.54585 3.84684 6.10781L1.31911 4.17761C0.82645 5.17781 0.54895 6.30492 0.54895 7.50011C0.54895 8.69437 0.826216 9.82066 1.31805 10.8203L3.84438 8.88632C3.70129 8.45027 3.62149 7.98492 3.62149 7.50011Z"
                  fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.05972 3.0682C9.11804 3.0682 10.0739 3.4432 10.825 4.0568L13.0098 1.875C11.6785 0.715898 9.97152 0 8.05972 0C5.0916 0 2.54066 1.69734 1.31921 4.1775L3.84683 6.1077C4.42925 4.3398 6.08945 3.0682 8.05972 3.0682Z"
                  fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.05972 11.9319C6.08957 11.9319 4.42937 10.6603 3.84695 8.89246L1.31921 10.8223C2.54066 13.3028 5.0916 15.0002 8.05972 15.0002C9.8916 15.0002 11.6406 14.3496 12.9532 13.1309L10.5539 11.2761C9.87695 11.7025 9.02441 11.9319 8.05972 11.9319Z"
                  fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.2288 7.49982C15.2288 7.05662 15.1604 6.57932 15.058 6.13623H8.05957V9.03393H12.088C11.8866 10.0219 11.3384 10.7814 10.5538 11.2757L12.9531 13.1306C14.3319 11.8509 15.2288 9.94447 15.2288 7.49982Z"
                  fill="black" />
          </svg>
        </Button>{" "}
          <Button className="button-even" variant="light">
            <svg width="19" height="17" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M18.3645 1.74212C18.4437 1.82131 18.4437 1.9005 18.4437 1.97969C18.602 2.77156 18.7604 4.4345 18.7604 6.335C18.7604 7.88744 18.6019 9.28136 18.5007 10.1715C18.478 10.371 18.4582 10.5453 18.4437 10.6903C18.3645 10.7695 18.3645 10.8487 18.3645 10.9279V11.0071C18.1269 11.7197 17.4934 12.1949 16.7015 12.1949H16.8599C16.8599 12.1949 13.6924 12.67 9.57466 12.67C5.37773 12.67 2.28942 12.1949 2.28942 12.1949H2.44779C1.65592 12.1949 1.02242 11.7197 0.784853 11.0071V10.9279C0.705666 10.8487 0.705666 10.7695 0.705666 10.6903C0.691163 10.5453 0.671349 10.371 0.648654 10.1715C0.547431 9.28136 0.388916 7.88744 0.388916 6.335C0.388916 4.78256 0.547432 3.38863 0.648655 2.49852C0.671349 2.29895 0.691164 2.12471 0.705666 1.97969C0.784853 1.9005 0.784853 1.82131 0.784853 1.74212V1.66294C1.02242 0.95025 1.65592 0.475125 2.44779 0.475125H2.28942C2.28942 0.475125 5.45691 0 9.57466 0C13.7716 0 16.8599 0.475125 16.8599 0.475125H16.7015C17.4934 0.475125 18.1269 0.95025 18.3645 1.66294V1.74212ZM8.54664 9.42311L12.2684 6.73073C12.4268 6.65155 12.506 6.49317 12.4268 6.3348C12.4268 6.17642 12.3476 6.01805 12.2684 5.93886L8.54664 3.24648C8.38826 3.1673 8.22989 3.1673 8.07151 3.24648C7.91314 3.32567 7.83395 3.48405 7.83395 3.64242V9.02717C7.83395 9.18554 7.91314 9.34392 8.07151 9.42311C8.1507 9.5023 8.22989 9.5023 8.30907 9.5023C8.38826 9.5023 8.46745 9.5023 8.54664 9.42311Z"
                    fill="black" />
            </svg>
          </Button>{" "}


        </div>
      </div>
    </div>
  );
}