import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddColor() {
    const [input, setInput] = useState({
        colorname: '',
        color: '',
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
        return input.color.length > 0 && input.colorname.length > 0;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newColor = {
            colorname: input.colorname,
            color: input.color
        }
        
        console.log(newColor);


        const res = await axios.post('http://localhost:3001/color/create', newColor);
        if (res.data === true) {
            console.log("ok");
        }
        if (res.data === false) {
            console.log("no");

        }
    }
    return (
        
        <div className="not-sidebar">
        <div className="auth-wrapper" >
            <div className="auth-inner">
                <form onSubmit={handleSubmit} dir="rtl">
                      <h1> הוספת צבע </h1>

                    <div className="form-group">
                        <label>שם הצבע</label>
                        <input onChange={handleChange1}
                            name="colorname"
                            value={input.colorname}
                            type="text"
                            className="form-control"
                            placeholder="הכנס שם צבע"
                        />
                        <label>ערך הצבע</label>
                        <input onChange={handleChange1}
                            name="color"
                            value={input.color}
                            type="text"
                            className="form-control"
                            placeholder="הכנס ערך צבע הקסדצימלי"
                        />
                    </div>
                    

                    <button type="submit" className="btn btn-primary btn-block">הוסף</button>

                </form>
            </div>
        </div>
        </div>


    )
}