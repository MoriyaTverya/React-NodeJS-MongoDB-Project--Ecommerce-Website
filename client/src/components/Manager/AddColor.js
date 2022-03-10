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
        <div className="not-sidebar" >
            <div className="">
                <form onSubmit={handleSubmit} dir="rtl">
                    <h5> הוספת צבע </h5>
                    <div className="row">
                        <div className="col-auto">
                            <div className="form-group">
                                <div className="row g-1 align-items-center">
                                    <div className="col-auto">
                                        <label>שם הצבע</label>
                                    </div>
                                    <div className="col-auto">
                                        <input onChange={handleChange1}
                                            name="colorname"
                                            value={input.colorname}
                                            type="text"
                                            className="form-control"
                                            placeholder="הכנס שם צבע"
                                        /></div>
                                </div></div>

                            </div><div className="col-6">
                                <label>בחר צבע</label>
                                <HexColorPicker color={color} onChange={setColor} />
                            </div>




                        </div>


                        <button type="submit" className="btn btn-primary btn-block">הוסף צבע</button>

                </form>
            </div>
            </div>


            )
}