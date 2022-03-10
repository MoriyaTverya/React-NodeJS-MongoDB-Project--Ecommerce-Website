import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import sal from "../images/cart.png";
import heart from "../images/heart.png";
import user_icon from "../images/user.png";
import search from "../images/search_icon.png";
import logo from "../images/ordman_logo_nav.png";
import  UserContext  from './UserProvider copy';
export default function NavbarMine(props) {

    const {userValue,set_userValue} = useContext(UserContext);//get the curent user from the context


    
    //onst user = useContext(UserContext);
    console.log(userValue);

    const[innerLogin, setInnerLogin] = useState(userValue.innerAuth);

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
        let result = await axios.get(`http://localhost:3001/cart/getCart/${userValue.id}`);
        console.log(result.data.products);
        setCartItems(result.data.products);
    }, []);
    const [requestSearch,setR]=useState();
    const clickMeS = (data) => {
     
      console.log(requestSearch);
      navigate(`/search/${requestSearch}`);
    }
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

            
            {
                innerLogin?
                <div></div>:
                <div className="navber-brand d-flex align-self-center m-2">
                    <div className="nav-item">
                        <a href="/Cart" className="notification">
                            <span><img src={sal} className="icon"></img></span>
                            <span className="badge">{cartItems.length}</span>
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
                
            }


                




                <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNavDropdown">
              
                   

                    {
                innerLogin?
                <div></div>:
                <div className="d-flex">
  <div className="nav-item search-wrapper d-flex align-items-center" dir="rtl">
                        <input id="search-input" onChange={(e) => setR(e.target.value)} className="form-control" type="search" placeholder="חיפוש" ></input>
                        <i role="button" onClick={clickMeS} className="fa-solid fa-magnifying-glass"></i>
                         {/* <button className="btn" type="submit"><img src={search} className="icon"></img></button> */}
                    </div>
                    <div className="nav-item">
                        <a className="nav-link" href="/Products">כל הפריטים</a>
                    </div>

                    <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                            מה תרצי לקנות
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
                    </div>}

                    {/* </ul> */}


                </div>
            </div>

        </nav>

    )
}
