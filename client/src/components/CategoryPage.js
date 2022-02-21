import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";


export default function CategoryPage() {
    const {id}=useParams();
    // const [category, setCategory] = useState([]);

    // useEffect(async () => //initial
    // {
    //     let result = await axios.get(`http://localhost:3001/category/${id}`);
    //     console.log("result",result);
    //     setCategory(result.data);
    // },[]);


    return (
        <div className="container">
            <h1>{id}</h1>
            <h3></h3>
        </div>
    );
}