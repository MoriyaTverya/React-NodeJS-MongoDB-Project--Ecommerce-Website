import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from './UserProvider';
export default function Products() {


  const user = useContext(UserContext);
  const navigate = useNavigate();

  const clickMe = (data) => {
    navigate(`/product/${data._id}`);
  }

  const [list, setList] = useState([]);
  useEffect(async () => //initial
  {
    let result = await axios.get('http://localhost:3001/product/get');
    setList(result.data)
  }, []);

  const handleLikeChange = async(event)=>{
    const id = event.target.value;
    let userId = {user: user.id}
    const res = await axios.post(`http://localhost:3001/product/update/${id}`, userId);
        if (res.data === true) {
            console.log("ok");
            
        }
        else {
            alert(res);
        }
}

  return (

    <div>
      <div className="container">
        <h1 className="price">המוצרים שאהבת</h1>
        <div className="px-lg-5">
          <div className="row">
            {
              list.map((item) => {
                if (item.productLikes.includes(user.id))
                  return <div key={item._id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-12">
                    <div className="bg-white product-image" >
                      <a href="" className="product-like-icon"><i className="bi bi-chevron-right"></i></a>
                      <img src={item.productImages[0]} alt="" className="img-fluid card-img-top" onClick={() => clickMe(item)} role="button" />
                      <div className="mt-1 d-flex">
                        <div className="col-9">
                          <p className="large mb-0">{item.productName}</p>
                          {item.productSale ?
                            <div className="d-flex"><p className="text-decoration-line-through">  ₪{item.productPrice}</p> &nbsp; ₪{item.productSalePrice}</div>
                            : <div className="d-flex">₪{item.productPrice}</div>}
                        </div>
                        <div key={item._id} class="checkboxes-container col-2">
                          <div class="">
                            <input checked={item.productLikes.includes(user.id)} class="red-heart-checkbox" id={item._id} value={item._id} type="checkbox" onChange={handleLikeChange}></input>
                            <label for={item._id}>

                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              )
            }
          </div>
        </div>
      </div>
    </div>

  )}