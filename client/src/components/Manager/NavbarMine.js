import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user from "../images/user.png";
import search from "../images/search_icon.png";
import logo from "../images/ordman_logo_nav.png";
import { right } from "@popperjs/core";
function NavbarMine(props) {
    const [name, setName] = useState();
    useEffect(async () => //initial  
    {   
        if(props.name!=null){
            console.log("14 ",props.name.data);
            var id=props.name.data;
           let x= await axios.get(`http://localhost:3001/manager/getName/${id}`);
           console.log("x" , x);
           setName(x.data);
        }
       
    });
    return (
        
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container-fluid">
               
                    <a class="navbar-brand p-0 me-2" href="/home">
                        <img src={logo} style={{ width: "210px", marginRight: "10px", marginLeft: "10px" }}></img>
                    </a>
                    
                <div class="navber-brand d-flex align-self-center">
                        <div class="nav-item">
                            <a  class="notification">
                                <span><img src={sal} class="icon"></img></span>
                                <span class="badge">3</span>
                            </a>
                        </div>
                        <div class="nav-item">
                            <a class="align-self-center" href="/love">
                                <img src={heart} class="icon"></img>
                            </a>
                        </div>
                        <div class="nav-item">
                            <a class="align-self-center" href="/userDashBoard">
                                <img src={user} class="icon"></img>
                                
                                {name}
                                
                            </a>
                        </div>
                        <span class="col"></span>
                    </div>
               
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                  <form class="navbar-item d-flex align-items-center input-group w-auto" dir="rtl">
                        <input id="search-input" class="form-control lg-2" type="search" placeholder="חיפוש" ></input>
                        <button class="btn" type="submit"><img src={search} class="icon"></img></button>
                    </form>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="navbar-brand nav-link" aria-current="page" href="#">צרי קשר</a>
                        </li>
                        <li class="nav-item">
                            <a class="navbar-brand  nav-link" href="#">קטלוג 2022</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="navbar-brand  nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                חנות
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">בגדי הנקה</a></li>
                                <li><a class="dropdown-item" href="#">שמלות וחלוקים</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Valure Fashion</a></li>
                            </ul>
                        </li>
                    </ul>

                   
                </div>
            </div>
            
        </nav>

    )
}

export default NavbarMine;