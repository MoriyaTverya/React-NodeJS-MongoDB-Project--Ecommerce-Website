import React, { useState, useEffect, useContext, Clock } from "react";
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from "axios";
import dateFormat from 'dateformat';
// import 'react-modern-calendar-datepicker';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
export default function BarChart(props) {


  const [orderlist, setList] = useState([]);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [labels1, setLabel1] = useState([])
  const newDate = new Date();
  var s = (newDate.getMonth() - 4);
  s = (s < 1) ? 12 + s : 12 - s;
  var h = newDate.getMonth() + 1;
  useEffect(async () => //initial
  {
    const fetchOrders = async () => {
      let result;
      if (props.name == null)
        result = await axios.get(`http://localhost:3001/order/get`);
      else
        result = await axios.get(`http://localhost:3001/order/customer/${props.name}`);

      let groupByCategory = result.data.reduce(function (rv, x) {
        (rv[dateFormat(x.date, "mm/yyyy")] = rv[dateFormat(x.date, "mm/yyyy")] || []).push(x);
        return rv;
      }, {});

      //  for (const [key, value] of Object.entries(groupByCategory)) {
      //   value.reduce(function(rv, x) {
      //      (rv[dateFormat(x.date, "dd/mm/yyyy")] = rv[dateFormat(x.date, "dd/mm/yyyy")] || []).push(x);
      //      return rv;
      //    }, {})
      //    console.log(`${key}: ${value}`);
      //  }
      console.log("iam here", groupByCategory);

      console.log(result.data);
      let orders = result.data;


      let labelsMonths = [];
      let dataMonths = [];
      let dataSum = [];
      let i = s;
      let j = 5;
      for (; j >= 0; j--, i++) {

        //  if(i==13)
        //    i=1; 
        //  console.log(i);
        var d = new Date();
        d.setMonth(d.getMonth() - j)
        labelsMonths.push(dateFormat(d, "mm/yyyy"))
        var x = false
        for (const [key, value] of Object.entries(groupByCategory)) {
          if (key == dateFormat(d, "mm/yyyy")) {
            dataMonths.push(value.length);
            x = true;
            var s = 0
            var p = 0
            value.forEach(element => {
              s++;
              p += element.totalPrice
            });
            dataSum.push(p);
            console.log(value.length)
          }
          console.log(`${key}: ${value}`);
        }
        if (!x) {
          dataMonths.push(0);
          dataSum.push(0);
        }
        // months[i-1]);
        //  dataMonths.push(groupByCategory.dateFormat(d, "mm/yyyy").count());
      }
      setData2(dataMonths);
      setData3(dataSum);
      setLabel1(labelsMonths);


    }
    fetchOrders();



  }, []);
  const data1 =
  {
    labels: labels1,
    datasets: [
      {
        label: "כמות הזמנות",
        data: data2,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        tension: 0.1
      }]
  }
  const data4 =
  {
    labels: labels1,
    datasets: [
      {
        label: "סכום",
        data: data3,
        fill: false,
        borderColor: 'rgb(255, 99, 132)'
      }]
  }
  const monthsN = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  const [monthsNOption, setmonthsNOption] = useState(monthsN[0]);
  const handleChangeM = async (event) => {
    setmonthsNOption(event.target);
  };
  const options = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  const [year, setYear] = useState(new Date().getFullYear());
  console.log(new Date().getFullYear());
  const handleChangeY = async (event) => {
    setYear(event.target);
  };
  const [title, setTitle] = React.useState("");
  const handleTitleChange = ev => setTitle(ev.target.value);

  return (
    <div className="row">
      <div className="col-6 col-lg-6 col-sm-12">
      <h5 className="price">כמות הזמנות לחודש</h5>
      <Bar data={data1} /></div>
      <div className="col-6 col-lg-6 col-sm-12">
      <h5 className="price">עלות הזמנות לחודש</h5>
      <Line data={data4} /></div>
    </div>
  );
}











// import React from "react";
// // import { Bar } from "npm install --save react-chartjs-2 chart.js";
// //import { MDBContainer } from "mdbreact";
// <script src="../../assets/js/plugins/chartjs.min.js"></script>
// export default function BarChart () {

//     return (
//     <div>
//         <h3 className="mt-5">Bar chart</h3>
//         <div class="card mb-3">
//     <div class="card-body p-3">
//     <div class="chart">
//       <canvas id="doughnut-chart" class="chart-canvas" height="300px"></canvas>
//       </div>
//        </div>
//     </div>
//         </div>
//     );

// }