import React, { useState, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";


export default function RemoveProducts() {

    const [removeItems, setRemove] = useState([]);

    function handleCheckboxRemoveChange(event) {
        if (event.target.checked) {
            if (!removeItems.includes(event.target.value)) {
                setRemove(prevState => [...prevState, event.target.value])
                console.log(removeItems);
            }
        } else {
            setRemove(prevState => prevState.filter(color => color !== event.target.value));
          
        }
    }
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
                                <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                                     <h5>הסר</h5>
                                    <input type="checkbox"  value={item._id} onChange={handleCheckboxRemoveChange} />
                                           
                               
                                    <div onClick={() => clickMe(item)} className="bg-white product-image" role="button">
                                        <a href="" className="product-like-icon"><i className="bi bi-chevron-right"></i></a>
                                        <img src={item.productImages[0]} alt="" className="img-fluid card-img-top" />
                                        <div className="p-3">
                                            {/* <h5> <a href="#" className="text-dark"></a></h5> */}
                                            <p className="large text-muted mb-0">{item.productName}</p>
                                            <div className="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-3">
                                                <p className="small mb-0"><span className="font-weight-bold">₪{item.productPrice}</span></p>
                                                
                                            </div>
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