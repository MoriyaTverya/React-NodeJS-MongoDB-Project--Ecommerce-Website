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

        orderlist.forEach((item) =>{
            item.products.forEach((p)=> fetchProducts(p.productId))});
        
    },[orderlist]);

        // const fetchProducts = async () => {
        // orderlist.forEach((item) =>
        //     item.products.forEach(
        //         async (p) => {
        //             let result = await axios.get(`http://localhost:3001/product/${p.productId}`);
        //             let a = { [p.productId]: result.data };
        //             console.log("a", a);
        //             setItems(prevInput => {
        //                 return {
        //                     ...prevInput,
        //                     [p.productId]: result.data
        //                 }
        //             })
        //         }))
        //     }
        //     fetchProducts();
    // }, [])



    console.log("oo", orderlist);

    console.log("ii", items);

    return (
        <div className="not-sidebar">
            <div className="container">
                <h1>הזמנות</h1>
                <div className="px-lg-3">
                    <div className="">
                        {
                            orderlist.map((item) =>
                                <div key={item._id} className="border px-3 py-4 mt-3">
                                    {
                                        item.products.map((p) =>
                                            <div className="row">
                                                {items[p.productId] ?
                                                <div> 
                                                <h5>{items[p.productId].productName}</h5>
                                                <img className="col-2" src={items[p.productId].productImages[0]}></img>
                                                </div>
                                                : <div></div>}
                                            </div>
                                        )
                                    }
                                    <h5> <a href="#" className="text-dark">{item.productId}</a></h5>
                                    <p className="small text-muted mb-0">{dateFormat(item.date, "yyyy-mm-dd")} </p>
                                    <div className="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
                                        <p className="small mb-0"><span className="font-weight-bold"></span></p>
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