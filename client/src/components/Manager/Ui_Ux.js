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

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
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
        const files = await Promise.all(Array.from(e.target.files).map(async file => {
            const base64 = await convertToBase64(file);
            return base64;
        })
        );
        console.log(files);
        setImages(files);
        console.log(productImages);


    };




    return (

        <div className="not-sidebar">
            <h5>אודות</h5>
            <textarea onChange={handleChange}
                name="productDescribe"
                value={input.productDescribe}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="תיאור מוצר"
                rows='3'
            />
            <h5>פרטי יצירת קשר</h5>
            <h5>כתובת</h5>
            <input onChange={handleChange}
                name="productName"
                value={input.productName}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />
            <h5>מייל</h5>
            <input onChange={handleChange}
                name="productName"
                value={input.productName}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />
            <h5>שירות לקוחות</h5>
            <input onChange={handleChange}
                name="productName"
                value={input.productName}
                type="text"
                className="form-control p-2 mb-4"
                placeholder="שם מוצר"
            />

            <h5>תמונות</h5>
            <h5>לוגו</h5>
            <input
                type="file"
                name="productImage"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <h5>באנר</h5>
            <input
                type="file"
                name="productImage"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <h5>קטגוריות</h5>
            <input
                type="file"
                name="productImage"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <input
                type="file"
                name="productImage"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            <input
                type="file"
                name="productImage"
                className="form-control"
                accept=".jpeg, .png, .jpg, .jfif"
                onChange={(e) => handleFilesUpload(e)}
            />
            
        </div>

    )
}