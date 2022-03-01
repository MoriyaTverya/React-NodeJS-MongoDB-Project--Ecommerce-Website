import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
export default function AddClients() {
   
    
    const [input, setInput] = useState({
        name: '',
        bissnesName: '',
        password:'',
        mail:'',
        telephon:'',
        addres:''
    })


   
    function handleChange1(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    function validateForm() {
        return input.name.length > 0 ;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newClients = {
            name: input.name,
            bissnesName: input.bissnesName,
            password: input.password,
            mail: input.mail.toString(),
            telephon: input.telephon,
            addres: input.addres,
            auth:false
        }

        const res = await axios.post('http://localhost:3001/user/create', newClients);
        if (res.data === true) {
            alert("ok");
          
        }
        else {
            alert(res.data);
        }
       // <Navigate to="/allClient" />
    }
    return (
        <div className="auth-wrapper" >
            <div className="auth-inner">
                <form onSubmit={handleSubmit} dir="rtl">

                    <h1> הוספת לקוח </h1>

                    <div className="form-group">
                        <label>שם </label>
                        <input onChange={handleChange1}
                            name="name"
                            value={input.name}
                            type="text"
                            className="form-control"
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label>שם עסק</label>
                        <input onChange={handleChange1}
                            name="bissnesName"
                            value={input.bissnesName}
                            type="text"
                            className="form-control"
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label>סיסמא </label>
                        <input onChange={handleChange1}
                            name="password"
                            value={input.password}
                            type="text"
                            className="form-control"
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label>מייל </label>
                        <input onChange={handleChange1}
                            name="mail"
                            value={input.mail}
                            type="mail"
                            className="form-control"
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label>טלפון </label>
                        <input onChange={handleChange1}
                            name="telephon"
                            value={input.telephon}
                            type="text"
                            className="form-control"
                            placeholder=""
                        />
                    </div>
                    <div className="form-group">
                        <label>כתובת </label>
                        <input onChange={handleChange1}
                            name="addres"
                            value={input.addres}
                            type="addres"
                            className="form-control"
                            placeholder=""
                        />
                    </div>

                    
                   
                   
                    

                    <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>הוסף</button>

                </form>
            </div>
        </div>



    )
}