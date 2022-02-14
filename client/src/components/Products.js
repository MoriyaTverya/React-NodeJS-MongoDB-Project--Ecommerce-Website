import React, { useState, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";


export default function Products() {

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

    return (

        <div>
            <div className="container">
                <div className="px-lg-5">
                    <div className="row">
                        {
                            list.map((item) =>
                                <div key={item._id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-12">
                                    <div onClick={() => clickMe(item)} className="bg-white product-image" role="button">
                                        <a href="" className="product-like-icon"><i className="bi bi-chevron-right"></i></a>
                                        <img src={item.productImages[0]} alt="" className="img-fluid card-img-top" />
                                        <div className="mt-1">
                                            {/* <h5> <a href="#" className="text-dark"></a></h5> */}
                                            <p className="large text-muted mb-0">{item.productName}</p>
                                            
                                                    {item.productSale? 
                                                    <div className="d-flex"><p className="text-decoration-line-through">  ₪{item.productPrice}</p> &nbsp; ₪{item.productSalePrice}</div>
                                                    :<div className="d-flex">₪{item.productPrice}</div>}
                                                   
                                                
                                        </div>
                                    </div>
                                </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}