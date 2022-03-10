import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Ui_Ux() {


    const [input, setInput] = useState({
        about: '',
        address: '',
        email: '',
        customerCare: '',
        logo: '',
        baner:'',
        image1:'',
        image2:'',
        image3:''
    })
    const [productImages, setImages] = useState([]);

    function handleChange(event) {
        const { name, value } = event.target;
        console.log(name, "", value);
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
        console.log(input);
    }


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFilesUpload = async (e) => {
        const name = e.target.name;
        console.log(name);
        const files = await Promise.all(Array.from(e.target.files).map(async file => {
            const base64 = await convertToBase64(file);
            return base64;
        })
        );
        console.log(files);
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: files
            }
        })
        console.log(input);

    };


    



    return (

        <div className="not-sidebar">
            <h5>אודות</h5>
            <textarea onChange={handleChange}
                name="about"
                value={input.about}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="תיאור מוצר"
                rows='3'
            />
            <h5>פרטי יצירת קשר</h5>
            <h5>כתובת</h5>
            <input onChange={handleChange}
                name="address"
                value={input.address}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />
            <h5>מייל</h5>
            <input onChange={handleChange}
                name="email"
                value={input.email}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />
            <h5>שירות לקוחות</h5>
            <input onChange={handleChange}
                name="customerCare"
                value={input.customerCare}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />

            <h5>תמונות</h5>
            <h5>לוגו</h5>
            <input
                type="file"
                name="logo"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <h5>באנר</h5>
            <input
                type="file"
                name="baner"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <h5>קטגוריות</h5>
            <input
                type="file"
                name="image1"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <input
                type="file"
                name="image2"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <input
                type="file"
                name="image3"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            
        </div>

    )
}