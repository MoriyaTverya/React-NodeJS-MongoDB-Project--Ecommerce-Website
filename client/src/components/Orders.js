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
                                    <hr/>
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