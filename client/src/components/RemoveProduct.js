import React, { useState, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";


export default function RemoveProducts() {

    const [items, setRemove] = useState([]);

    function handleCheckboxRemoveChange(event) {
        if (event.target.checked) {
            if (!items.includes(event.target.value)) {
                setRemove(prevState => [...prevState, event.target.value])
                console.log(items);
            }
        } else {
            setRemove(prevState => prevState.filter(color => color !== event.target.value));
          
        }
    }

    const removeItems = async(event) =>{
        event.preventDefault();
        const removeProducts = {
            items: items
        }

        console.log(removeProducts);

        const res = await axios.post('http://localhost:3001/product/delete', removeProducts);

        if (res.data === true) {
            console.log("ok");
        }
        if (res.data === false) {
            console.log("No");

        }
       
    }
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

    return (

        <div className="not-sidebar">
            <div className="container">
                <button className="btn turkiz btn-block" onClick={removeItems}> הסר פריטים נבחרים</button>
                <div className="px-lg-5">
                    <div className="row">
                        {
                            list.map((item) =>
                                <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                                    <input  class="form-check-input" type="checkbox" value={item._id} onChange={handleCheckboxRemoveChange} />
                                           
                               
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