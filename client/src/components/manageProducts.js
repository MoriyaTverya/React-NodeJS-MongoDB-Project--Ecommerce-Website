import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from './UserProvider';

export default function ManageProducts() {
    
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const clickMe = (data) => {
        navigate(`/productDashBoard/${data._id}`);
    }

    const [list, setList] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get('http://localhost:3001/product/get');
        setList(result.data)
    }, []);
    

    const handleLikeChange = async(event, item, i)=>{
        const id = event.target.value;
        let userId = {user: user.id};
       

        if (event.target.checked && !item.productLikes.includes(user.id)){
           
           item.productLikes.push(user.id);
        }
        else{
            item.productLikes =  item.productLikes.filter(like => like != user.id);
        }
        let tempList = [...list];
        
        tempList[i] = item;
        setList(tempList); 
        console.log(tempList);
        console.log(item.productLikes);
        const res = await axios.post(`http://localhost:3001/product/updateLikes/${id}`, userId);
            if (res.data === true) {
                console.log("ok");
            }
            else {
                alert(res);
            }
           
    }

    useEffect(()=>{
        console.log('list change',list);
    },[list])

    return (
        <div class="not-sidebar">
            <h1>ניהול מוצרים</h1>
            <div className="container">
                <div className="px-lg-5">
                    <div className="row">
                        {
                            list.map((item, i) =>
                                <div key={item._id} onClick={() => clickMe(item)}  className="row p-2 border-bottom">
                                    <div className="bg-white product-image col-1" >
                                        <a href="" className="product-like-icon"><i className="bi bi-chevron-right"></i></a>
                                        <img src={item.productImages[0]} alt="" className=" img-fluid card-img-top" role="button" />
                                        
                                         </div>
                                         <div className="m-2 d-flex col-6">
                                            
                                            <p className="">{item.productName}</p>
                                            
                                        </div>
                                        <div className="m-2 d-flex col-4">
                                        {item.productSale ?
                                                <div className="d-flex"><p className="text-decoration-line-through">  ₪{item.productPrice}</p> &nbsp; ₪{item.productSalePrice}</div>
                                                : <div className="d-flex">₪{item.productPrice}</div>}
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