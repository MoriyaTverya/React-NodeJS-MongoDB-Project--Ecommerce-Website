import React, { useState, useEffect, useContext} from 'react';
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

import ManageOrders from './components/Manager/order/Orders';
import Profile from './components/Profile';
import CategoryPage from './components/CategoryPage';
import Home from './components/Home';
import ManageProducts from './components/ManageProducts';
import RemoveProducts from './components/RemoveProducts';
import DashBoardProduct from './components/DashBoardProduct';
import ClientDetails from './components/Client/ClientDetails';
import SidenavManager from './components/Manager/SidenavManager';
import AddClients from './components/Manager/clients/AddClients';
import AllClients from './components/Manager/clients/AllClients';
import { UserContext } from './components/UserProvider';
import ClientPage from './components/Manager/clients/ClientPage';
import OrderPage from "./components/Manager/order/OrderPage";
import AllCategory from "./components/Manager/category/allCategory";
import Category from "./components/Manager/category/Category";
import Color from "./components/Manager/Cart";
import MainPage from "./components/Manager/MainPage";
function App() {
  
  const user = useContext(UserContext);
  const [login, setLogin] = useState(window.sessionStorage.getItem('auth'));
  // const [innerLogin, setInnerLogin] = useState(false);
  const [innerLogin, setInnerLogin] = useState(false);
  // useEffect(async () => //initial
  // {
  //     setInnerLogin(window.sessionStorage.getItem('innerAuth'));
  // }, []);
  // console.log(innerLogin);
  return (
    <div className="App">
      <BrowserRouter>
        {login ?
          <div className="content-wrapper">
            {login && <NavbarMine setLogin={setLogin} />}
             {innerLogin && <SidenavManager/>}
            <Routes>
              {
                innerLogin?
                  <>
                    <Route path="/" element={<MainPage />} />
                    
                    <Route path="/home" element={<MainPage />} />
                    <Route path="/allClients" element={<AllClients name={user} />} />
                    <Route path="/addClients" element={<AddClients name={user} />} />
                    <Route path="/client/:id" element={<ClientPage />} />
                    <Route path="/allCategory" element={<AllCategory name={user} />} />
                    <Route path="/category" element={<Category name={user} />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path="/order/:id" element={<OrderPage />} />
                    <Route path="/productDashBoard/:id" element={<DashBoardProduct />} />
                    <Route path="/addProduct" element={<AddProduct/>} />
                    <Route path="/allProduct" element={<ManageProducts name={user} />} />
                    <Route path="/cart" element={<Color name={user} />} />
                    <Route path="/Orders" element={<ManageOrders name={user} />} />
                     <Route path="/profile" element={<><Profile /></>} />
                    <Route path="/Products" element={<Products />} />‏
                    {/* <Route path="/manageProducts" element={<><Sidenav /><ManageProducts /></>} />
                    <Route path="/home" element={<MainPage setShow={setShow} name={user} />} />
                   
                    <Route path="/love" element={<Love name={user} />} />
                   <Route path='*' element={<NotFound />} />
                    <Route path="/addProduct" element={<><Sidenav /><AddProduct /></>} />
                    <Route path="/color" element={<><Sidenav /><AddColor /></>} />
                    */} 
                    
                  </> 
                  :
                  <>
                    <Route path="/" element={<Home />} /> 
                   
                    <Route path="/home" element={<Home />} />
                    <Route path="/love" element={<Love />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/userDashBoard" element={ <><Sidenav/><UserDashboard /></> }/>
                    <Route path="/orders" element={<><Sidenav /><Orders /></>} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                    <Route path="/clientDetails/:id" element={<><Sidenav/><ClientDetails /></>} />
                    <Route path='*' element={<NotFound />} />
                  </>}
            </Routes>
          </div> :
          <Routes>
            <Route path="*" element={<Login setLogin={setLogin} />} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  )
    ;


}


export default App;
