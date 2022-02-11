import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ordman_home from '../images/ordman_home.jpg';

function Home() {

  

  return (
    <div className="Home">
      <div className="row">
        <img src src="product_images/panel.jpg" className=" col-12" />
      </div>
      <div className="row g-0 pt-5">
        <img src={ordman_home} className="col-lg-4 col-sm-6" />
        <div style={{ backgroundColor: "#E63C6C" }} className="col-lg-4 col-sm-6" />
        <img src={ordman_home} className="col-lg-4 col-sm-6" />
        <div style={{ backgroundColor: "#10B9B5" }} className="col-lg-4 col-sm-6" />
        <img src={ordman_home} className="col-lg-4 col-sm-6" />
        <div style={{ backgroundColor: "#FFD400" }} className="col-lg-4 col-sm-6" />
      </div>
      <div className="spacer-inner"></div>


      <footer className="text-center text-lg-start bg-light text-muted">
        <div className="spacer-inner pink"></div>
        <section className="">
          <div className="container text-center text-md-start mt-0">
            {/* <!-- Grid row --> */}
            <div className="row pt-5">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>אורדמן ספקים
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  מפת אתר
                </h6>
                <p>
                  <a href="#!" className="text-reset">Angular</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Vue</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Laravel</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  קטגוריות
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  שירות לקוחות ויצירת קשר
                </h6>
                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@example.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © כל הזכויות שמורות לאורדמן

        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  )
}


export default Home;