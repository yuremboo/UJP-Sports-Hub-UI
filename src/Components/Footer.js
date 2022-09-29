import React, { useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from "mdb-react-ui-kit";
import axios from "axios";

export default function Footer() {
  const [emailInputText, setEmailInputText] = useState([]);

  function postSubscription(newSubscription) {
    axios.post("https://ujp-sports-hub.herokuapp.com/api/v1/newEmail", newSubscription, {
    })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      });
  }

  function addNewEmail(e) {
    e.preventDefault();
    if (!emailInputText) {
      return;
    }
    const newEmail = {
      email: emailInputText
    };
    postSubscription(newEmail);
  }
  const isValidEmailInput = event => {
    event.preventDefault();
    setEmailInputText(event.target.value);
  };
  return (
    <MDBFooter className="text-center">
      <MDBContainer className="p-4">
        <hr />
        <section className="">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">COMPANY INFO </h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-reset">
                    About Sports Hub
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    News / In the Press
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Advertising / Sports Blogger Ad Network
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Contact Us
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">CONTRIBUTORS</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-reset">
                    Featured Writers Program
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Featured Team Writers Program
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-reset">
                    Internship Program
                  </a>
                </li>
              </ul>
            </MDBCol>
            <MDBCol size="auto">
              <p className="pt-2">
                <strong>NEWSLETTER</strong>
              </p>
              <p className="pt-4">
                Sign up to receive the latest sport news
              </p>
              <MDBInput contrast type="email"
                        label="Email address"
                        value={emailInputText}
                        onChange={isValidEmailInput}
              />
              <MDBBtn color="light" type="submit" onClick={addNewEmail} className="text-white"
                      style={{ backgroundColor: "#D72130" }}>
                Subscribe
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className="text-center p-3" style={{ backgroundColor: "#D72130" }}>
        Copyright ©2019
        <a className="text-white" href="https://mdbootstrap.com/">
          Sports Hub
        </a>
        Privacy / Terms
      </div>
    </MDBFooter>
  );
}