import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from './UserProvider';
import dateFormat from 'dateformat';

export default function Orders() {

    const user = useContext(UserContext);
    const [orderlist, setList] = useState([]);
    const [items, setItems] = useState({});


    useEffect(async () => //initial
    {
        const fetchOrders = async () => {
            let result = await axios.get(`http://localhost:3001/order/customer/${user.id}`);
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

  
    function getSizes(sizes) {
        var rows = [];
        for (const size in sizes) {
            rows.push(<div className="row"><div className="col-6" key={size}>{size}</div><div className="col-6">{sizes[size]}</div></div>);
        }
        return <tbody>{rows}</tbody>;

    }  
    
    var formatter = new Intl.NumberFormat()
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

    return (
        <div className="not-sidebar">
            <div className="container">
                <h1>הזמנות</h1>
                <div className="px-lg-3">
                    <div className="">
                        {
                            orderlist.map((item) =>
                                <div key={item._id} className="shadow px-3 py-4 m-3 w-75">
                                    <h5>מזהה לקוח</h5>
                                    <p className="">{item.customerId} </p>
                                    <h5>תאריך</h5>
                                    <p className="">{dateFormat(item.date, "dd/mm/yyyy HH:MM:ss")} </p>
                                    <hr/>
                                    <h5>פירוט הזמנה</h5>
                                    {
                                        item.products.map((p) =>
                                            <div >
                                                {items[p.productId] ?
                                                    <div className="p-1 m-2 d-flex justify-content-around row">
                                                        <div className="col-lg-2 col-sm-6">
                                                        <img className="w-100" src={items[p.productId].productImages[0]}></img>
                                                        </div>
                                                        <div className="mt-1 col-lg-4 col-sm-6">
                                                            <h5>{items[p.productId].productName}</h5>
                                                            {/* <p>{items[p.productId].productDescribe}</p> */}
                                                        </div>
                                                        <div className="col-lg-2 col-sm-4">
                                                        <h6>כמויות</h6>
                                                        <div>{getSizes(p.psizes)}</div></div>
                                                        <div className="col-lg-2 col-sm-4 ">
                                                         <h6> מחיר</h6>
                                                        <p >{p.price} ₪ </p></div>
                                                        <div className="col-lg-2 col-sm-4">
                                                        </div>
                                                    </div>
                                                    : <div>
                                                    </div>
                                                }
                                                      
                                            </div>
                                        )

                                    }

                                  
                                    <h5> <a href="#" className="text-dark">{item.productId}</a></h5>
                                    <h5 className="small text-muted mb-0"></h5>
                                    <div className="d-flex justify-content-right rounded-pill bg-light px-3 py-0 mt-4">
                                         <h6>  סה"כ  </h6><p>{formatter.format(item.totalPrice)} ₪ </p>
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