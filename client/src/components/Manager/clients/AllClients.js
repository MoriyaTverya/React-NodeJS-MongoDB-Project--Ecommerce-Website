import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
export default function AllClients() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])

    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/user/get');

        setData(result.data);
        setFilter(result.data);

    }, []);

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.name.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
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
        navigate(`/client/${data._id}`);
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
            const res = await axios.delete(`http://localhost:3001/user/delete/${element}`);
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


    return (
        <div className="not-sidebar">

            <a role="button" class="btn btn-block turkiz m-2" href="/addClients"> הוספת לקוח חדש</a>
           <a role="button" class="btn btn-block pink m-2" onClick={handleDelete}>מחק</a>
           <div className="nav-item search-wrapper d-flex align-items-center m-4" dir="rtl">
                        <input onChange={(e) => requestSearch(e.target.value)} id="search-input" className="form-control" type="search" placeholder="חיפוש" ></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        {/* // <button className="btn" type="submit"><img src={search} className="icon"></img></button> */}
                    </div>
            
            <table class="table " data={data}>
                <thead>
                    <tr>
                        <tr><a role="checkbox"></a></tr>
                        <th scope="col">שם</th>
                        <th scope="col">שם חנות</th>
                        <th scope="col">סיסמא</th>
                        <th scope="col">מייל</th>
                        <th scope="col">טלפון</th>
                        <th scope="col">כתובת</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        filter.sort((a, b) => a.name > b.name ? 1 : -1)
                            //({ bissnesName: previousID }, { bissnesName: currentID }) => previousID - currentID)
                            .map(item => <tr key={item._id}>
                                <td class="table-light" > <input type="checkbox" value={item._id} onChange={handleChange} /></td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.name}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.bissnesName}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.password}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.mail}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.telephon}</td>
                                <td class="table-light" role="button" onClick={() => clickMe(item)}>{item.addres}</td>

                            </tr>)
                    }
                </tbody>
            </table>






        </div>

    )
}






























