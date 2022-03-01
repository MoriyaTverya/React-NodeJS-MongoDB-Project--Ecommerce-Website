import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidenav from '../components/Sidenav';
import ordman_home from '../images/ordman_home.jpg'
export default function UserDashboard() {
  return (
    <div className="h-100 d-flex">
      <Sidenav />

    </div>

  )
}