import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user_icon from "../images/user.png";
import search from "../images/search_icon.png";
import logo from "../images/ordman_logo_nav.png";
import { UserContext } from './UserProvider';
export default function NavbarMine(props) {

    const user = useContext(UserContext);
    console.log(user);

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
    // console.log(categoryList);

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">

                <a className="navbar-brand p-0 me-0 " href="/home">
                    <img src={logo} className="logo" />
                </a>

                <div className="nav-item m-1">
                        <button className="btn turkiz nav-item" role="button" onClick={logout}>
                            יציאה
                        </button>
                </div>
                <div className="navber-brand d-flex align-self-center m-2">
                    <div className="nav-item">
                        <a href="/Cart" className="notification">
                            <span><img src={sal} className="icon"></img></span>
                            <span className="badge">3</span>
                        </a>
                    </div>
                    <div className="nav-item">
                        <a className="align-self-center" href="/love">
                            <img src={heart} className="icon"></img>
                        </a>
                    </div>
                    <div className="nav-item">
                        <a className="align-self-center" href="/userDashBoard">
                            <img src={user_icon} className="icon"></img>
                            {/* <a className="nav-link">{user.user}</a>  */}
                        </a>

                    </div>
                </div>




                <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNavDropdown">

                    {/* <ul className="navbar-nav p-2"> */}

                    <div className="nav-item search-wrapper d-flex align-items-center" dir="rtl">
                        <input id="search-input" className="form-control " type="search" placeholder="חיפוש" ></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        {/* <button className="btn" type="submit"><img src={search} className="icon"></img></button> */}
                    </div>

                    <div className="nav-item">
                        <a className="nav-link" href="/Products">כל הפריטים</a>
                    </div>

                    <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                            קטגוריות
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {categoryList.map(item =>
                                <div key={item.categoryName}>
                                    <a className="dropdown-item" role="button" onClick={() => clickMe(item.categoryName)}>{item.categoryName}</a>
                                    <hr className="dropdown-divider"></hr>
                                    {item.subcategories.map(sub =>
                                        <a key={sub.categoryName} className="dropdown-item" role="button" onClick={() => clickMe(sub.categoryName)} >{sub.categoryName}</a>
                                    )}
                                    <br></br>
                                </div>)
                            }
                        </ul>

                    </div>

                    {/* </ul> */}


                </div>
            </div>

        </nav>

    )
}
