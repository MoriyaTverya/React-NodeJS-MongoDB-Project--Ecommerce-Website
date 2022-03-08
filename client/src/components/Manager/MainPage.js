import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import axios from "axios";
// import Home from "./Home";
// import Navbar from "./Navbar";
// import UserDashboard from "./UserDashboard"
// import NavbarMine from "./NavbarMine";
// import Love from "./Love";
// import Cart from "./Cart";
// import NavbarReact from "./NavbarReact";
// import Sidenav from "./Sidenav";

import BarChart from "../Charts/barChart"
import LineChart from "../Charts/lineChart"
import Count from "../Charts/count"
// import LineChart1 from "./chart/lineChart"

export default function MainPage() {
  console.log("hii iam in mainpage");
  return (
    <div className="not-sidebar">
      <div className="row">
        <div className="col-3 p">
          <Count />
        </div>
        <div className="col-6 pe-5 ps-5 pt-2">
          <BarChart />
        </div>
        <div className="col-6 pe-5 ps-5 pt-2">
          <LineChart />
        </div>

      </div>
      {/* <LineChart1/> */}
    </div>
  )
}



