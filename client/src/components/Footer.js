import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user_icon from "../images/user.png";
import search from "../images/search_icon.png";
import logo from "../images/ordman_logo_nav.png";
import { UserContext } from './UserProvider';
export default function Footer(props) {


    
    const user = useContext(UserContext);
    console.log(user);

    const[innerLogin, setInnerLogin] = useState(false);

    console.log(innerLogin);

    const navigate = useNavigate();

    const clickMe = (data) => {
        navigate(`/category/${data}`);
    }
    function logout() {
        props.setLogin(false);

    }
    const [categoryList, setCategoryList] = useState([]);
    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/category/get');
        setCategoryList(result.data);
    }, []);
    
    const [cartItems, setCartItems] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/cart/getCart/${user.id}`);
        console.log(result.data.products);
        setCartItems(result.data.products);
    }, []);
    
    // console.log(categoryList);

    return (

        <footer className="text-center text-lg-start bg-light text-muted">
        <div className="spacer-inner pink"></div>
        <section className="">
          <div className="container text-center text-md-start mt-0">
           
            <div className="row pt-5">
              <div className="col-md-12 col-lg-4 col-xl-3 mx-auto mb-4 ">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>אורדמן ספקים
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
           
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
              <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
              
                <h6 className="text-uppercase fw-bold mb-4">
                  קטגוריות
                </h6>
                {categoryList.map(item =>
                                <p key={item.categoryName}>
                                    <a className="text-reset" role="button" onClick={() => clickMe(item.categoryName)}>{item.categoryName}</a>
                                    
                                </p>)
                            }
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
               
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
            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © כל הזכויות שמורות לאורדמן

        </div>
      </footer>

    )
}
