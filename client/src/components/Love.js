import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
export default function Love() {

  const [list, setList] = useState([]);
  useEffect(async () => //initial
  {
    let result = await axios.get('http://localhost:3001/manager/get');
    console.log(result.data);
    setList(result.data);
  }, []);

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
          {

            list.map(item => <div>
              <h1>
                {item.username}
              </h1>
              <h1>{item.password}</h1></div>)
          }
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Mountains in the Clouds"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Waves at Sea"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Yosemite National Park"
          />
        </div>
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Mountains in the Clouds"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
        </div>

        <div class="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Waves at Sea"
          />

          <img
            src="product_images/4.jpg"
            class="w-100 shadow-1-strong rounded mb-4"
            alt="Yosemite National Park"
          />
        </div>
      </div>
    </div>
  )
}