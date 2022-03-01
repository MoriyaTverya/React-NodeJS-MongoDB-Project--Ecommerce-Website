import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from './UserProvider';
import {Doughnut, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
export default function DashBoardProduct() {


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


    let arr = [];
    let arr2 = [];

    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(result.data);
        setImages(result.data.productImages);
        setImage(result.data.productImages[0]);
        for (const [key] of Object.entries(result.data.productSizes)) {
            arr.push(key); 
            arr2.push(result.data.productSizes[key]);
        }
        setStockList(arr);
        setStock(result.data.productSizes);
        setStockData(arr2); 
        arr = []; arr2 = [];
        for (const [key] of Object.entries(result.data.productSales)) {
            arr.push(key);
            arr2.push(result.data.productSales[key]);
        }
        setSalesList(arr);
        setSalesData(arr2);
        console.log(stockList);
        
        setSales(result.data.productSales);
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

            <div className="container-fluid row">
                <h1 className="price mt-3 border-bottom">ניהול מוצר</h1>
                <div className="col-6 mt-3">
                <h2 className="price">פרטים</h2>
                <div className="bg-white product-image">
                    <div className="row">
                        <aside className="col-lg-3 col-md-3 col-sm-12">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap">
                                    <div className="d-flex justify-content-center"> 
                                    <a href="#"><img src={largeImage} style={{ maxWidth: "100%" }} /></a>
                                    </div>
                                </div>
                                {/* <div className="d-flex justify-content-center img-small-wrap p-0">
                                    {
                                        images.map((image, index) =>
                                            <div key={`img${index}`} className="item-gallery" >
                                                <img src={image} onClick={changeImage} name={image} />
                                            </div>)
                                    }

                                </div> */}
                            </article>
                        </aside>
                        <aside className="col-lg-7 col-md-6 col-sm-12">
                            <article className="">
                                <h3 className="price">{item.productName}</h3>
                                <p className="">
                                    {item.productSale ?
                                        <div className="d-flex"><p className="text-decoration-line-through">  ₪{item.productPrice}</p> &nbsp; ₪{item.productSalePrice}</div>
                                        : <div className="d-flex">₪{item.productPrice}</div>}
                                </p>
                                <dl className="">
                                    <p>{item.productDescribe}</p>
                                </dl>

                                {/* <div className="item-buttons">
                                    <button href="#" className="btn btn-block ms-3 turkiz" onClick={addToCart}> הוספה לעגלה </button>
                                    <button href="#" className="btn btn-block pink" onClick={createOrder}> הזמנה </button>
                                </div> */}

                            </article>
                        </aside>
                        
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-2 border-bottom">
                            <h4 className="price">מלאי</h4>
                            {/* <Bar data={stockChart}/> */}
                            <div className="row w-75">
                                <h6 className="col-6 price"> מידה</h6>
                                <h6 className="col-6 price"> כמות</h6>
                                {
                                    stockList.map((size) =>
                                        <span className="row" key={size} >
                                            <p className="col-6"> {size}</p>
                                            <p className="col-6"> {stock[size]}</p>
                                        </span>
                                    )
                                }
                                  

                            </div>
                        </div>
                    
                        <div className="col-lg-5 col-md-5 col-sm-12 me-3 ms-3">
                            <h4 className="price">קטגוריות</h4>
                            <div>
                                {

                                    categories.map((category) =>
                                        <p>{category}</p>
                                    )
                                }

                            </div>
                            <br/>
                        </div>
                        
                      
                        <div className="col-lg-5 col-md-3 col-sm-12">
                            
                            <h4 className="price">צבעים</h4>
                            <div className="d-flex">
                                {
                                    colorList.map(item =>
                                        <div>
                                            <div className="shadow-sm circle m-2 me-0" style={{ backgroundColor: item }}></div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="col-5 mt-3">
                        <h2 className="price">נתונים וסטטיסטיקות</h2>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <h4 className="price">מכירות</h4> 
                            <Bar data={salesChart}/>
                            {/* <div className="row">
                                <h5 className="col-5 price"> מידה</h5>
                                <h5 className="col-5 price"> כמות</h5>
                                {
                                    salesList.map((size) =>
                                        <span className="row" key={size} >
                                            <p className="col-6"> {size}</p>
                                            <p className="col-6"> {sales[size]}</p>
                                        </span>
                                    )
                                }
                           

                            </div> */}

                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                            <h4 className="price">{likes.length} אנשים אהבו את זה </h4>
                            <div className="row">
                                {
                                    likes.map((like) =>
                                        <span className="d-flex" key={like} >
                                            <i class="fas fa-heart m-1" style={{color:"#10B9B5"}}></i><p className="col-6"> {like}</p>
                                        </span>
                                    )
                                }

                            </div>
                        </div>

                    

                </div>
            </div ></div>
    );
}