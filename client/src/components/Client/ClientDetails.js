import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export default function ClientDetails() {
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
        password: item.password,
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
            password: input.password,
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
        <div className="row">
            <div className="row">
            <h3 className="col-11">{item.name}</h3>
            <div className="col-5">

                
                <div className="auth-inner">


                    <label>שם </label>
                    <input onChange={handleChange1}
                        name="name"
                        value={input.name}
                        type="text"
                        className="form-control"
                    />
                     <label>סיסמא </label>
                    <input onChange={handleChange1}
                        name="password"
                        value={input.password}
                        type="password"
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
        </div>
    );

}