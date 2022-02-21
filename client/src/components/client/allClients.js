import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
export default function AllClients() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])

    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/clients/get');

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
   

    return (
        <div>

            <div class="modal-footer"> <a role="button" class="btn mb-2 mb-md-0 btn-secondary btn-block" href="/addClients"> הוספת לקוח חדש</a> </div>
            <div class="modal-footer"> <a role="button" class="btn mb-2 mb-md-0 btn-secondary btn-block" onClick={handleDelete}>מחק</a> </div>
            <TextField onChange={(e) => requestSearch(e.target.value)} />
            <table class="table table-bordered" data={data}>
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






























