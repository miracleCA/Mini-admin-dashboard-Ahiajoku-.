import React from 'react';

import admin from '../Images/Admin.png';

import '../Styles/Components/TopNav.css';
import Logo from "../Images/Logo.png";

function TopNav() {
  return (
    <div id='topnav'>
        <span id='logo'>
          <a href='/'>
            <img alt='' src={Logo}/>
          </a>
        </span>
        <span id='admindt'>
            <img alt='' src={admin}/>
            <span style={{display: "grid"}}>
                <p>Admin Name</p>
                <p style={{fontWeight: "500", fontSize: "15px"}}>Admin</p>
            </span>
        </span>
    </div>
  )
}

export default TopNav;