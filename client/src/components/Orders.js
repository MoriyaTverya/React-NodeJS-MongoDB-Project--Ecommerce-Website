import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from './UserProvider';
import dateFormat from 'dateformat';

export default function Orders() {

    const user = useContext(UserContext);
    const [orderlist, setList] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/order/customer/${user.id}`);
        setList(result.data);
        console.log(orderlist);
    }, []);
   
    //const [product, setProduct] = useState([]);
     
    // const getImage = async (id) => {
    //     console.log("hey", id);
    //     const result = await axios.get(`http://localhost:3001/product/${id}`);
    //     if (result.data.productImages[0])
    //        return result.data.productImages[0];
    //     return '';
    // }
    return (
        <div className="not-sidebar">
            <div className="container">
                <h1>הזמנות</h1>
                <div className="px-lg-3">
                    <div className="">
                        {
                            orderlist.map((item) =>
                            
                                <div key={item._id} className="border px-3 py-4 mt-3">

                                    {/* <img src={getImage(item.products[0].productId)}/> */}
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