import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user from "../images/user.png";

function NavbarReact() {
    return (
<nav class="navbar navbar-dark navbar-expand-md bg-success">

<button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="navbar-collapse collapse dual-nav order-1 order-md-0">
  <ul class="navbar-nav border border-primary">
    <li class="nav-item">
      <a class="nav-link" href="#">Left Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Left Link</a>
    </li>
  </ul>
</div>

<div class="navbar-collapse collapse dual-nav order-2 order-md-1 justify-content-end">
  <ul class="navbar-nav border border-danger">
    <li class="nav-item">
      <a class="nav-link" href="#">Center Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Center Link</a>
    </li>
  </ul>
</div>

<a href="/" class="navbar-brand mx-auto order-0 order-md-2 p-2">Brand</a>

<div class="navbar-collapse collapse dual-nav order-3 order-md-3">
  <ul class="navbar-nav border border-danger">
    <li class="nav-item">
      <a class="nav-link" href="#">Center Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Center Link</a>
    </li>
  </ul>
</div>

<div class="navbar-collapse collapse dual-nav order-4 order-md-4 justify-content-end">
  <ul class="navbar-nav border border-primary">
    <li class="nav-item">
      <a class="nav-link" href="#">Right Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Right Link</a>
    </li>
  </ul>
</div>

</nav>


    )
}

export default NavbarReact;