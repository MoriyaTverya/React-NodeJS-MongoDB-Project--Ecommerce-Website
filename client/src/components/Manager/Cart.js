import React, { useState, useEffect } from "react";
import axios from "axios";
import { SketchPicker } from 'react-color'
import { HexColorPicker } from 'react-colorful'

export default function Color() {
    const [color, setColor] = useState("#aabbcc");
   
    const [input, setInput] = useState({
        colorname: ''
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
        return input.colorname.length > 0;
    }

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newColor = {
            colorname: input.colorname,
            color: color
        }
        console.log(newColor);
        const res = await axios.post('http://localhost:3001/color/create', newColor);
        alert(res.data);
    }
    return (
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

                        <label>בחר צבע</label>
                        
                   <HexColorPicker color={color} onChange={setColor} />;
                       
                    </div>
                    

                    <button type="submit" className="btn btn-primary btn-block">הוסף</button>

                </form>
            </div>
        </div>


    )
}