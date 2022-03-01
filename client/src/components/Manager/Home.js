import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ordman_home from '../images/ordman_home.jpg'
import ordman from "../images/‏‏ordmans_panel.jpg"
function Home() {
  return (
    <div className="Home">
     <div class="row row-cols-1 row-cols-md-1 gx-0">
     <img src ={ordman} class="col themed-grid-col" id="homepagepanel"/>
     </div>
     <div class="row row-cols-2 row-cols-md-3 gx-0">
      <img  src ={ordman_home} class="col themed-grid-col"/>
      <div style={{ backgroundColor: "#E63C6C"}} class="col themed-grid-col"/>
      <img src ={ordman_home} class="col themed-grid-col"/>
      <div style={{ backgroundColor: "#10B9B5"}}  class="col themed-grid-col"/>
      <img src ={ordman_home} class="col themed-grid-col"/>
      <div style={{ backgroundColor: "#FFD400"}}  class="col themed-grid-col"/>
    </div>
   </div>
  )
}


export default Home;