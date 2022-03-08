import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ordman_home from '../images/ordman_home.jpg';
import { useNavigate } from 'react-router-dom';
import TopProducts from "./TopProducts";
function Home() {
  const navigate = useNavigate();

  const clickMe = (data) => {
    navigate(`/category/${data}`);
}

  return (
    <div className="Home">
      <div className="row">
        <img src src="product_images/panel_2.jpg" className=" col-12" />
      </div>
      <div className="row g-0 pt-5">
      {/* <div
          class="bg-image col-lg-4 col-sm-6"
          style={{ backgroundImage: `url(${ordman_home})`, height: "100vh"}}
        ></div> */}
       {/* <div className= "col-lg-4 col-sm-6"> <img src={ordman_home} className="col-12" /><h1 className="mt--5">בגדי הנקה</h1></div> */}
       {/* <div className= "col-lg-4 col-sm-6"></div> */}
        <div className="col-lg-4 col-sm-6 top1" role="button" onClick={() => clickMe("שמלות")}> <img src={ordman_home} className="col-lg-12 col-sm-12" /><div class="sigin">שמלות</div></div>
        <div style={{ backgroundColor: "#E63C6C" }} className="col-lg-4 col-sm-6" role="button" onClick={() => clickMe("חולצות")}>חולצות </div>
        <div  className="col-lg-4 col-sm-6 top1" role="button" onClick={() => clickMe("חצאיות")}><img src={ordman_home} className="col-lg-12 col-sm-12" /><div class="sigin">חצאיות</div></div>
        <div style={{ backgroundColor: "#10B9B5" }} className="col-lg-4 col-sm-6"  role="button" onClick={() => clickMe("בגדי הנקה")}>בגדי הנקה</div>
        <div  className="col-lg-4 col-sm-6 top1"role="button" onClick={() => clickMe("ילדות")}><img src={ordman_home} className="col-lg-12 col-sm-12" /><div class="sigin">שמלות</div></div> 
        <div style={{ backgroundColor: "#FFD400" }} className="col-lg-4 col-sm-6" role="button" onClick={() => clickMe("מבצע")}>מבצע</div>
      </div> 
      <TopProducts/>
      <div className="spacer-inner"></div>
      

    </div>
  )
}


export default Home;