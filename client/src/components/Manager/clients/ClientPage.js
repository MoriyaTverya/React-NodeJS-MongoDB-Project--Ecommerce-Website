import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BarChart from "../../Charts/barChart";
import Count from "../../Charts/count";
import ClientOrders from "./ClientOrders";
import LineChart from "../../Charts/lineChart";
export default function ClientPage() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/user/get/${id}`);
        console.log(result.data);
        setItem(result.data);
        setInput(result.data);
    }, []);

    const [input, setInput] = useState({
        name: item.name,
        bissnesName: item.bissnesName,
        mail: item.mail,
        telephon: item.telephon,
        addres: item.addres,
    })

    const [change, setChange] = useState(false);

    function handleChange1(event) {
        setChange(true);
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newClients = {
            name: input.name,
            bissnesName: input.bissnesName,
            mail: input.mail.toString(),
            telephon: input.telephon,
            addres: input.addres
        }


        console.log(newClients);
        const res = await axios.post(`http://localhost:3001/user/update/${id}`, newClients);
        if (res.data === true) {
            alert("ok");

        }
        else {
            alert(res.data);
        }
    }

    return (
        <div className="not-sidebar">
            <div className="row me-1">
             <h3 className="">{item.name}</h3>
             <div className="col-9">
                    <h4>כל ההזמנות</h4>
                    <ClientOrders />
                    <div className="row">
                        <div className="col-3">
                            <BarChart name={id} />
                        </div>
                        <div className="col-3">
                            <LineChart name={id} />
                        </div>
                         <div className="col-3">
                            <Count name={id} />
                        </div>
                    </div>
                </div>
                <div className="col-3 border-start ">
                        <div className="">
                            <h5>פרטים</h5>
                            <label>שם </label>
                            <input onChange={handleChange1}
                                name="name"
                                value={input.name}
                                type="text"
                                className="form-control"
                            />

                            <label>שם עסק</label>
                            <input onChange={handleChange1}
                                name="bissnesName"
                                value={input.bissnesName}
                                type="text"
                                className="form-control"
                            />

                            <label>מייל </label>
                            <input onChange={handleChange1}
                                name="mail"
                                value={input.mail}
                                type="mail"
                                className="form-control"

                            />

                            <label>טלפון </label>
                            <input onChange={handleChange1}
                                name="telephon"
                                value={input.telephon}
                                type="text"
                                className="form-control"
                            />

                            <label>כתובת </label>
                            <input onChange={handleChange1}
                                name="addres"
                                value={input.addres}
                                type="addres"
                                className="form-control"
                            />


                            <button type="submit" className="btn btn-primary btn-block" disabled={!change} onClick={handleSubmit}>עדכן</button>
                       </div>
                    

                </div>
               
            </div>
        </div>
    );

}