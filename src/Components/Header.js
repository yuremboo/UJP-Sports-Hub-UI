import React from 'react'

import '../style_components/header.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import facebook from '../icons/facebook.png'
import path from '../icons/Twitter.png'
import google from '../icons/GoogleSmall.png'
import google1 from '../icons/Plus.png'
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();

  function login(){
    // await logOutUser()
    navigate("/login");
  }

  function signUp(){
    navigate("/registration");
  }

  return (

    <div className='main_header_sport_hub'>
      <div className='logo_sport_hub'>
        <span> Sports Hub</span>
      </div>

      <InputGroup className="mb-3 search">
        <Button variant="outline-secondary" className='button_search' id="button-addon2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Button>

        <Form.Control
          id='form_search'
          placeholder="Search by"
          aria-label="Search by"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <div className='share_button'>
        <Button variant="light">Share</Button>{' '}
        <Button variant="light"><img src={facebook} alt="Facebook" /></Button>{' '}
        <Button variant="light"><img src={path} alt="Path" /></Button>{' '}
        <Button variant="light"><img src={google} alt="Google" /><img src={google1} alt="Google" /></Button>{' '}
      </div>

      <div className='sign_up_login_in'>
        <Button variant="light" onClick={signUp}>Sign up</Button>{' '}
        <Button id='log_in_button' variant="light" onClick={login}>Log in</Button>{' '}
      </div>

      <div className='languages'>
      <Form.Select size="sm">
        <option>EN</option>
        <option>UA</option>
      </Form.Select>
      </div>
    </div>
  )
}
