import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user from "../images/user.png";

export default function Navbar() {
    return (
      <nav class="sidenav">
        <ul class="sidenav-menu">
          <a class="sidenav-link" href="/profile">
          <li class="sidenav-item sidenav-link">פרופיל
          </li>
          </a>
          <a class="sidenav-link" href="/orders" >
          <li class="sidenav-item sidenav-link">
            הזמנות
          </li>
          </a>
          <a class="sidenav-link" href="/color" >
          <li class="sidenav-item sidenav-link">
            הוסף צבע
          </li>
          </a> 
          <a class="sidenav-link" href="/addProduct">
          <li class="sidenav-item sidenav-link">
           הוסף מוצר
          </li>
          </a>
          <a class="sidenav-link" href="#">
          <li class="sidenav-item sidenav-link">
           החזרות
          </li>
          </a>
          <a class="sidenav-link" href="/cart">
          <li class="sidenav-item sidenav-link">
           סל
          </li>
          </a>
          <a class="sidenav-link" href="/cart">
          <li class="sidenav-item sidenav-link">
           מוצרים שאהבת
          </li>
          </a>
        </ul>
        </nav>

    )
}