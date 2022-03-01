import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { UserContext } from '../UserProvider';
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import ClientOrders from "./clientOrders";
// import BarChart from "../chart/barChart";
// import Count from "../chart/count";

export default function OrderPage() {
     const {id} = useParams();
    const [item, setItem] = useState([]);
  
   // const user = useContext(UserContext);
    const [orderlist, setList] = useState([]);
    const [items, setItems] = useState({});



    useEffect(async () => //initial
    {
        const fetchOrders = async () => {
            let result = await axios.get(`http://localhost:3001/order/get/${id}`);
            setList(result.data);
        }

        fetchOrders();

    }, []);


    useEffect(async () => //initial
    {

        const fetchProducts = async (id) => {
            let result = await axios.get(`http://localhost:3001/product/${id}`);
            setItems(prevInput => {
                return {
                    ...prevInput,
                    [id]: result.data
                }
            })
        }

        orderlist.forEach((item) => {
            item.products.forEach((p) => fetchProducts(p.productId))
        });

    }, [orderlist]);

    var formatter = new Intl.NumberFormat()
    // 'he-IL', {
    //     style: 'currency',
    //     currency: 'NIS',

    //     //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    //   });
    function getSizes(sizes) {
        var rows = [];
        for (const size in sizes) {
            rows.push(<div className="row"><div className="col-6" key={size}>{size}</div><div className="col-6">{sizes[size]}</div></div>);
        }
        return <tbody>{rows}</tbody>;

    }
    function getPrice(productId, sizes) {
        let sum = 0;
        for (const size in sizes) {
            sum += parseFloat(sizes[size], 10);
        }

        sum = sum * items[productId].productPrice;
        return sum;
    }

    function getSumPrice(products) {
        var sum = 0;
        products.forEach(p => {
            sum += getPrice(p.productId, p.psizes);
        })
        return sum;
    }


    const handleChange = async (event) => {
        console.log(event.target.name);
        const status = {
            status: event.target.value,
        }
        const res = await axios.post(`http://localhost:3001/order/update/${event.target.name}`, status);
        console.log(res.data);
        window.location.reload(false);
    };
    // console.log("oo", orderlist);

    // console.log("ii", items);

    return (
        <div className="not-sidebar">
            <div className="container">
                <h1>הזמנות</h1>
                <div className="px-lg-3">
                    <div className="">
                        {
                            orderlist.map((item) =>
                                <div key={item._id} className="shadow-sm px-3 py-4 m-3">
                                    
                                    <h5>תאריך</h5>
                                    <p className="">{dateFormat(item.date, "dd/mm/yyyy HH:MM:ss")} </p>
                                    <h5>סטטוס הזמנה</h5>
                                    {/* <Dropdown disabled onChange={this._onSelect}  placeholder="Select an option" />; */}

                                    <select value={item.status} name={item._id} onChange={handleChange}>
                                        <option value="בטיפול">בטיפול</option>
                                        <option value="בוצע">בוצע</option>
                                        <option value="בוטל">בוטל</option>
                                    </select>
                                    <hr />
                                    <h5>פירוט הזמנה</h5>
                                    {
                                        item.products.map((p) =>
                                            <div >
                                                {items[p.productId] ?
                                                    <div className="p-1 m-2 d-flex justify-content-around">
                                                        <img className="col-2" src={items[p.productId].productImages[0]}></img>
                                                        <div className="">
                                                            <h5>{items[p.productId].productName}</h5>
                                                            {/* <p>{items[p.productId].productDescribe}</p> */}
                                                        </div>
                                                        <div>
                                                            <h5>מידות</h5>
                                                            <div>{getSizes(p.psizes)}</div></div>
                                                        <div><h5> מחיר ליחידה</h5>
                                                            <p >{items[p.productId].productPrice} ₪ </p></div>
                                                        <div>
                                                            <h5>סה"כ</h5>
                                                            <p class={item._id}>{formatter.format(getPrice(p.productId, p.psizes))} ₪ </p></div>
                                                        {/* סך הזמנה &nbsp;{formatter.format(getSumPrice(item.products))} ₪ <p className="small mb-0"><span className="font-weight-bold"></span></p> */}


                                                    </div>
                                                    : <div>
                                                    </div>
                                                }
                                            </div>
                                        )

                                    }


                                    <h5> <a href="#" className="text-dark">{item.productId}</a></h5>
                                    <h5 className="small text-muted mb-0"></h5>
                                    <div className="d-flex justify-content-between rounded-pill bg-light px-3 py-2 mt-4">

                                        <div className="badge badge-danger px-3 rounded-pill font-weight-normal">מוצר</div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
    }