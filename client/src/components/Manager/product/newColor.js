import React, { useState, useEffect } from "react";
import axios from "axios";


export default function NewColor(props) {
    const [input, setInput] = useState({
        color: '',
        size: '',
        image:'',
    })


    const handleFileUpload = async (e) => {
        const files = e.target.files;
        console.log(files);
        // const base64 = await convertToBase64(file);
        // setInput({ ...input, productImage: base64 });
    };
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
        return input.size.length > 0 ;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newColor = {
            color: input.color,
            size: input.bissnesName,
            image: input.password,
        }

    }
    return (
        <div className="auth-wrapper" >
            <div className="auth-inner">
                <form onSubmit={handleSubmit} dir="rtl">

                    <div className="form-group">
                        <label>צבע </label>
                        <input onLoad={handleChange1}
                            name="color"
                            value={props.name}
                            type="text"
                            className="form-control"
                            placeholder="color"
                        />
                    </div>
                    <div className="form-group">
                        <label>מידות</label>
                        <input onChange={handleChange1}
                            name="size"
                            value={input.size}
                            type="text"bissnesName
                            className="form-control"
                            placeholder="הכנס מידות"
                        />
                    </div>
                    <div className="form-group">
                        <label>תמונות </label>
                        <input
                        type="file"
                        name="productImage"
                        className="form-control"
                        accept=".jpeg, .png, .jpg"
                        multiple
                        onChange={(e) => handleFileUpload(e)}
                      />
                    </div>
                    

                    <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>שמור</button>

                </form>
            </div>
        </div>



)

}