import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from './UserProvider';
import {Doughnut, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DashBoardProduct from "./DashBoardProduct";
import ProductUpdate from "./ProductUpdate";
export default function ProductManage() {


    const user = useContext(UserContext);
    const { id } = useParams();
    const [stock, setStock] = useState({});
    const [stockList, setStockList] = useState([]);
    const [stockData, setStockData] = useState();
    const [sales, setSales] = useState([]);
    const [salesList, setSalesList] = useState([]);
    const [salesData, setSalesData] = useState();
    const [likes, setLikes] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [input, setInput] = useState([]);
    const [sizes, setSizes] = useState({});
    const [item, setItem] = useState([]);
    const [images, setImages] = useState([]);
    const [largeImage, setImage] = useState('');
    const [isStock, setIsStock] = useState([]);
    const [isUpdate, setUpdate] = useState(false);


    let arr = [];
    let arr2 = [];

    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(result.data);
        setImages(result.data.productImages);
        setImage(result.data.productImages[0]);
        if(result.data.productSizes){
        for (const [key] of Object.entries(result.data.productSizes)) {
            arr.push(key); 
            arr2.push(result.data.productSizes[key]);
        }
        setStockList(arr);
        setStock(result.data.productSizes);
        setStockData(arr2); }
        arr = []; arr2 = [];
        if(result.data.productSales){
        for (const [key] of Object.entries(result.data.productSales)) {
            arr.push(key);
            arr2.push(result.data.productSales[key]);
        }
        setSalesList(arr);
        setSalesData(arr2);
        console.log(stockList);
        setSales(result.data.productSales);}
        setColorList(result.data.productColors);
       arr = [];
        for (const like in result.data.productLikes) {
            let l = await axios.get(`http://localhost:3001/user/get/${result.data.productLikes[like]}`);
            arr.push(l.data.name);
        }
        setLikes(arr);
        setCategories(result.data.productCategories);

    }, []);

    function changeImage(event) {
        const myimg = event.target.name;
        setImage(myimg);
    }

    
    const stockChart = {
        labels:  stockList,
        datasets: [{
            label: 'מלאי',
            data: stockData,
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
            borderWidth: 1
        }]
    }

    
    const salesChart = {
        labels:  salesList,
        datasets: [{
            label: 'נמכרו',
            data: salesData,
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
            borderWidth: 1
        }]
    }

    function handleSizeChange(event) {
        const { name, value } = event.target;
        if (stock[name] < value) {
            setIsStock(" ממידה " + name + " קיימים רק " + stock[name] + " פריטים במלאי ")
        }
        else {
            setIsStock("")
            setSizes(prevState => {
                return {
                    ...prevState,
                    [name]: parseInt(value, 10)
                }
            });
        }
    }

    return (
        <div class="not-sidebar">
            
<div className="d-flex border-bottom align-items-center"> <h1 onClick={()=>{setUpdate(false)}} className="price pointer">ניהול מוצר</h1>
                <button className="btn btn-block btn-primary turkiz me-3 mt-2" onClick={()=>{setUpdate(true)}} >עדכן מוצר</button></div>
               {
                   isUpdate?
                   <ProductUpdate/>:
                   <DashBoardProduct id={id}/>
               }
                
</div>
    );
}