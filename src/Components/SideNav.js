import React from 'react';

import "../Styles/Components/SideNav.css";


function SideNav() {

  const logout = () => {
    localStorage.removeItem('atoken')
  }
  
  return (
    <div id='sidenav'>
        <div style={{display: "grid", height: "max-content"}}>
          <a style={{backgroundColor: (window.location.pathname == "/" ? "#308A11" : ""), color: (window.location.pathname == "/" ? "white" : "") }} href='/'><i className="fa-solid fa-users"></i>Lecturers</a>
          <a style={{backgroundColor: (window.location.pathname == "/lecture_notes" ? "#308A11" : ""), color: (window.location.pathname == "/lecture_notes" ? "white" : "") }} href='/lecture_notes'><i className="fa-solid fa-pen-to-square"></i>Lecture Notes</a>
          <a style={{backgroundColor: (window.location.pathname == "/proverbs" ? "#308A11" : ""), color: (window.location.pathname == "/proverbs" ? "white" : "") }} href='/'><i className="fa-regular fa-comments"></i>Proverbs</a>
          <a style={{backgroundColor: (window.location.pathname == "/gallery" ? "#308A11" : ""), color: (window.location.pathname == "/gallery" ? "white" : "") }} href='/gallery'><i className="fa-solid fa-table-cells"></i>Gallery</a>
          <a style={{backgroundColor: (window.location.pathname == "/events" ? "#308A11" : ""), color: (window.location.pathname == "/events" ? "white" : "") }} href='/'><i className="fa-solid fa-calendar-days"></i>Events</a>
          <a href='/' onClick={logout}><i className="fa-solid fa-power-off"></i>Logout</a>
        </div>
    </div>
  )
}

export default SideNav;