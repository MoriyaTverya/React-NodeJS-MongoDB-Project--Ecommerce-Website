import {Pie} from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from 'dateformat';
export default function Count(props){
    const [treatment, settreatment] = useState(0);
    const [done, setDone] = useState(0);
    const [canceled, setCanceled] = useState(0);
    useEffect(async () => //initial
    {const fetchOrders = async () => {
      let result;
    if(props.name==null)
     result = await axios.get(`http://localhost:3001/order/get`);
    else
     result = await axios.get(`http://localhost:3001/order/customer/${props.name}`);

   let groupByCategory = await result.data.reduce(function(rv, x) {
     (rv[x.status] = rv[x.status] || []).push(x);
     return rv;
   }, {});
   console.log(groupByCategory);
   
   let t=0;
   let d=0; 
   let c=0;
   for (const [key, value] of Object.entries(groupByCategory)) {
         console.log(key," ",value.length)
         switch(key) {
          case 'בטיפול':
            t=value.length;
        break 
          case 'בוצע':
 d=value.length;
 break
          case 'בוטל':
          c=value.length;
          break
        }
        console.log(t," ",d," ",c)
   };
   settreatment(t);
   setDone(d);
   setCanceled(c);
  }
  fetchOrders();
}, []);

    const state = {
        labels: ['בוטל', 'בוצע', 'בטיפול'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(16, 185, 185)',
              'rgb(255, 193, 7)'
            ],
            borderWidth: 2,
            data: [canceled,done,treatment]
          }
        ]
      }



    return (
      <div>
          <h5 className="price">הזמנות לפי סטטוס</h5>
        <Pie data={state} />
      </div>
    );
  }









