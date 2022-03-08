import React from 'react';
import axios from 'axios';

import dateFormat from 'dateformat';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import TextField from '@mui/material/TextField';
export default function AllClients() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])

    useEffect(async () => //initial  
    {
        console.log(id);
        let result = await axios.get(`http://localhost:3001/order/customer/${id}`);
        console.log("order",result.data);
        setData(result.data);
        setFilter(result.data);

    }, []);

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.date.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        if (searchedVal.length < 1) {
            setFilter(data)
        }
        else {
            setFilter(filteredRows)
        }
    };

    const navigate = useNavigate();
    const clickMe = (data) => {
        navigate(`/order/${data._id}`);
    }

    const [deleteClients, setdelete] = useState([])
    const handleChange = (event) => {
        console.log(event.target.value);
        if (event.target.checked) {
            setdelete(prevState => [...prevState, event.target.value])
        } else {
            setdelete(prevState => prevState.filter(c => c !== event.target.value));
        }
    }
    const handleDelete = async (event) => {
        deleteClients.forEach(async element => {
            const res = await axios.delete(`http://localhost:3001/clients/delete/${element}`);
            if (res.data === true) {
                alert("ok");
            }
            if (res.data === false) {
                alert("No");

            }
        });

        console.log("eeee");
    }
    //const [list, setList] = useState([]);

    var formatter = new Intl.NumberFormat()
    return (
        <div>
            <div role="button" class="btn pink m-2 btn-block" onClick={handleDelete}>מחק</div> 
            
            {/* <input onChange={(e) => requestSearch(e.target.value)} /> */}
            <div className="m-1 search-wrapper d-flex align-items-center" dir="rtl">
                        <input onChange={(e) => requestSearch(e.target.value)}  id="search-input" className="form-control" type="search" placeholder="חיפוש" ></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        
                    </div>
            <table class="table table-bordered" data={data}>
                <thead>
                    <tr>
                        <tr><a role="checkbox"></a></tr>
                        <th scope="col">מספר הזמנה</th>
                        <th scope="col">תאריך </th>
                        <th scope="col">סטטוס הזמנה</th>
                        <th scope="col">סה"כ לתשלום</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        filter.sort((a, b) => a.date > b.date ? -1 : 1)
                            //({ bissnesName: previousID }, { bissnesName: currentID }) => previousID - currentID)
                            .map(item => <tr key={item._id}>
                                <td class="table-light" > <input type="checkbox" value={item._id} onChange={handleChange} /></td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item._id}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{dateFormat(item.date, "dd/mm/yyyy")}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.status}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{formatter.format(item.totalPrice)} ₪</td>

                            </tr>)
                    }
                </tbody>
            </table>






        </div>

    )
}






























