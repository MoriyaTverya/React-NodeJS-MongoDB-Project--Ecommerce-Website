import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import UserDashboard from './components/UserDashboard';
import Cart from './components/Cart';
import NavbarMine from './components/NavbarMine';
import Love from './components/Love';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import Sidenav from './components/Sidenav';
import NotFound from './components/NotFound';
import AddProduct from './components/AddProduct';
import AddColor from './components/AddColor';
import Orders from './components/Orders';
import Profile from './components/Profile';
import CategoryPage from './components/CategoryPage';
import Home from './components/Home';


function App() {
const [login, setLogin] = useState(window.sessionStorage.getItem('auth'));
  return (
    <div className="App">
      <BrowserRouter>
      {login ?
            <div className="content-wrapper">
            {login && <NavbarMine setLogin={setLogin}/>}
            <Routes>
              <Route path="/" element={<Home/>}/> 
              <Route path="/home" element={<Home />} />
              <Route path="/love" element={<Love />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/userDashBoard" element={<UserDashboard />} />
              <Route path="/addProduct" element={<><Sidenav /><AddProduct /></>} />
              <Route path="/orders" element={<><Sidenav /><Orders /></>} />
              <Route path="/color" element={<><Sidenav /><AddColor /></>} />
              <Route path="/profile" element={<><Sidenav /><Profile /></>} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
            </div>:
            <Routes>
              <Route path="*" element={<Login setLogin={setLogin}/>}/> 
            
            </Routes>
           }
      </BrowserRouter>
    </div>
  )
;


}


export default App;
