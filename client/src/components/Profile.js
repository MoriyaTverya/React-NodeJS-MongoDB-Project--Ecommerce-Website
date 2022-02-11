import React, { useState, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";


export default function Profile() {

    const navigate = useNavigate();

    const clickMe = (data) => {
      navigate(`/product/${data._id}`);  
    }

    const [list, setList] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get('http://localhost:3001/product/get');
        setList(result.data);
    }, []);

    return (

        <div className="not-sidebar">
            <div className="container">
                <h1>פרופיל</h1>
                
            </div>
        </div>
    );
}