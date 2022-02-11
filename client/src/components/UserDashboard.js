import React, {useContext}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidenav from '../components/Sidenav';
import AddProduct from './AddProduct';
import Cart from '../components/Cart';
import ordman_home from '../images/ordman_home.jpg'
export default function UserDashboard() {
  return (
    <>
      <Sidenav/>
      <div class="not-sidebar">
        <h1>ברוכה הבאה לאזור האישי</h1>
      </div>
    </>

  )
}