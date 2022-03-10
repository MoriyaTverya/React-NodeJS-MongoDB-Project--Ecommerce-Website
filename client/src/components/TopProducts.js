import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { UserContext } from './UserProvider';

export default function TopProducts() {

    const { id } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const clickMe = (data) => {
        navigate(`/product/${data._id}`);
    }

    const [list, setList] = useState([]);
    const [product, setProduct] = useState([]);
    // const [data, setData] = useState([]);
    useEffect(async () => //initial
    {
      
      let result = await axios.get('http://localhost:3001/product/get');
      //  setData(result.data);
      let data=result.data;
      console.log(data);
      let d=[];
      data.forEach(element => {
          let id=element._id;
          let sum=0;
          if(element.productSales){
          for (const [key, value] of Object.entries(element.productSales)) {
            console.log(key," ",value)
            sum+=value;
           };
        console.log(element.productSales);
        d.push({"id":id,"sum":sum});}
      });
      d.sort((a, b) => (a.sum > b.sum) ? -1 : 1)
      console.log("ddddd",d);
      let top=[];
      for(let i=0; i<d.length && i<4; i++){
         
          let id= d[i];
          console.log(id.id);
          let re =await axios.get(`http://localhost:3001/product/${id.id}`);
      top.push(re.data);
      }
      console.log("toppp",top);
      setList(top);
        // const filteredRows = data.sort((a, b) => a.productSales.forEach(element => {
            
        // }) > b.productSales ? 1 : -1)
        // if (filteredRows.length < 1) {
        //      alert("אין פריטים תואמים לחיפוש שלך")
        // }
        // else {
        //     console.log(filteredRows)
        //     setList(filteredRows)
        // }  
    // console.log(filteredRows);
    }, []);


    const handleLikeChange = async (event, item, i) => {
        const id = event.target.value;
        let userId = { user: user.id };


        if (event.target.checked && !item.productLikes.includes(user.id)) {

            item.productLikes.push(user.id);
        }
        else {
            item.productLikes = item.productLikes.filter(like => like != user.id);
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

    useEffect(() => {
        console.log('list change', list);
    }, [list])

    return (
        <div>
            <h2>מוצרים מובילים</h2>
            <div className="container">
                <div className="px-lg-5">
                    <div className="row">
                        {
                            list.map((item, i) =>
                                <div key={item._id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-12 zoom">
                                    <div className="bg-white product-image">
                                        <img src={item.productImages[0]} onClick={() => clickMe(item)} alt="" className="img-fluid card-img-top" role="button" />
                                        <div className="m-2 d-flex">
                                            <div className="col-9">
                                                <p className="large mb-0">{item.productName}</p>
                                                {item.productSale ?
                                                    <div className="d-flex"><p className="text-decoration-line-through">  ₪{item.productPrice}</p> &nbsp; ₪{item.productSalePrice}</div>
                                                    : <div className="d-flex">₪{item.productPrice}</div>}
                                            </div>
                                            <div key={item._id} class="checkboxes-container col-2">
                                                <div class="ms-0">
                                                    <input checked={item.productLikes.includes(user.id)} class="red-heart-checkbox" id={item._id} value={item._id} type="checkbox" onChange={(e) => handleLikeChange(e, item, i)}></input>
                                                    <label for={item._id}>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
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