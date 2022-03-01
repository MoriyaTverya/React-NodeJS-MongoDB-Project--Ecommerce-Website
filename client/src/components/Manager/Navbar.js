import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user from "../images/user.png";

export default function Navbar() {
//     const func =() => {
//       $('.navTrigger').click(function () {
//     $(this).toggleClass('active');
//     console.log("Clicked menu");
//     $("#mainListDiv").toggleClass("show_list");
//     $("#mainListDiv").fadeIn();

// });
    
    return (
      <nav class="nav">
        <div class="container">
            <div class="logo">
                <a href="#">Your Logo</a>
            </div>
            <div id="mainListDiv" class="main_list">
                <ul class="navlinks">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <span class="navTrigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
    )
  }
  