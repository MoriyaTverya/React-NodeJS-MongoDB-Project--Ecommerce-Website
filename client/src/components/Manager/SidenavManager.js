import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SidenavManager() {
  const [showLink1, setShowLink1] = useState(true)
  return (
    <nav class="sidenav">
      <ul class="sidenav-menu">
        <li class="sidenav-item">
          <a class="sidenav-link " data-mdb-toggle="collapse" role="button" onClick={()=>{}}><span>לקוחות</span> </a>
          {showLink1 && <ul >
            <li class="sidenav-item">
              <a class="sidenav-link " href="/allClients" role="button" onClick={()=>{}}> כל הלקוחות</a>
            </li>
            <li class="sidenav-item">
              <a class="sidenav-link " href="/addClients" role="button" > הוספת לקוח</a>
            </li>
          </ul>}
        </li>
        <li class="sidenav-item">
          {/* <a class="sidenav-link " data-mdb-toggle="collapse" role="button" onClick={()=>{}}><span>קטגוריות</span> </a> */}
          {showLink1 && <ul>
            {/* <li class="sidenav-item">
              <a class="sidenav-link "  href="/allCategory"> כל הקטגוריות</a>
            </li> */}
            <li class="sidenav-item">
              <a class="sidenav-link  "  href="/category" >  הוספת קטגוריה</a>
            </li>
            <li class="sidenav-item">
              <a class="sidenav-link ripple-surface" href="/Cart"> הוספת צבע</a>
            </li>
          </ul>}
        </li>
        <li class="sidenav-item">
          <a class="sidenav-link ripple-surface" data-mdb-toggle="collapse" href="/allCategory" role="button"><span> מוצרים </span> </a>
          {showLink1 &&   <ul >
            <li class="sidenav-item">
              <a class="sidenav-link ripple-surface" href="/allProduct" >ניהול מוצרים</a>
            </li>
            <li class="sidenav-item">
              <a class="sidenav-link ripple-surface" href="/addProduct" >הוספת מוצר</a>
            </li>
            <li class="sidenav-item">
              <a class="sidenav-link ripple-surface" href="/profile"> הסרת מוצר</a>
            </li>
          </ul>}
        </li>
        <li class="sidenav-item">
          <a class="sidenav-link ripple-surface" data-mdb-toggle="collapse" href="/Orders" role="button"><span> הזמנות </span></a>
       
        </li>

      </ul>
    </nav>

  )
}