import React, { useState, useEffect, useContext } from "react";
import { UserContext } from './UserProvider';


export default function Navbar() {
  const user = useContext(UserContext);
    return (
      <nav class="sidenav">
        <ul class="sidenav-menu">
          <a class="sidenav-link" href="/userDashBoard">
          <li class="sidenav-item sidenav-link">
            אזור אישי
          </li>
          </a>
          <a class="sidenav-link" href="/orders" >
          <li class="sidenav-item sidenav-link">
            הזמנות
          </li>
          </a>
          <a class="sidenav-link" href={`/clientDetails/${user.id}`}>
          <li class="sidenav-item sidenav-link">
           פרטי חשבון
          </li>
          </a>
          
        </ul>
        </nav>

    )
}