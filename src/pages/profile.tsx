import React from 'react';
import '../css/profile.css';

function SideMenu(){
  return(
    <nav id="side-menu-wrapper">
      <ul id="side-menu">
        <li>
          <a href="#">WELCOME</a>
        </li>
        <li>
          <a href="#">PROJECTS</a>
        </li>
        <li>
          <a href="#">GET IN TOUCH</a>
        </li>
      </ul>
    </nav>
  );
}

export default function Profile(){
  return(
    <div id="profile-page">
      <SideMenu />
    </div>
  );
}