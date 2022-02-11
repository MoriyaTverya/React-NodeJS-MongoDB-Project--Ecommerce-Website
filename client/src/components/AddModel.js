import React, { useState, useEffect } from "react";
import axios from "axios";
export default function AddModel({setCapacity, setColorState, productColors, namek}) {
    console.log("color begin: ", productColors);
    const [input, setInput] = useState({})
    const misureList = [" 0 ", " 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 "]

    const [model, setModel] = useState({
        color: '',
        sizes: {},
        images: []
    })

    const [colorList, setcolorList] = useState([]);
    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/color/get');
        setcolorList(result.data);
    }, []);


    function handleRadioColorChange(event) {
        setModel({ ...model, color: event.target.value });
        console.log("model change", event.target.value);
    }


    
    const addModel = async (event) => {
        event.preventDefault();
        console.log("begin: ", productColors);
        console.log("adding");
        console.log(productColors);
        if (productColors.includes(model.color)) {
            alert("color in");
        }
        else {
            setColorState(prevState =>[...prevState, model.color])
            setCapacity(prevState => [...prevState, model]);
            console.log("added");
        }

    }

    function handleSizeChange(event) {
        const { name, value } = event.target;
        console.log("size", name, "stock", value);
        setModel(prevState => {
            return {
                ...prevState,
                sizes: { ...prevState.sizes, [name]: value }
            }
        });
        console.log(model);
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
        setModel({ ...model, images: files });
        console.log(model);

    };

    return (
        <div className="auth-inner-color mt-3">
            <div className="container">
                <h4>דגם {namek}</h4>
                <div className="">
                    <div className="row">
                        <div className="col-lg-4 m-3">
                            <label>צבע</label><div>
                                {
                                    colorList.map(item =>
                                        <div className="form-check-inline m-2">
                                            <label className="containerc">
                                                <input type="radio" id={item.color} name={namek} value={item.color} onChange={handleRadioColorChange} />
                                                <span className="checkmark" style={{ backgroundColor: item.color }}></span>
                                            </label>
                                        </div>
                                    )
                                }
                                {/* {
                                                            colorList.map(item =>
                                                                <div key={item._id} className="form-check-inline m-2">
                                                                    <label className="containerc">
                                                                        <input type="checkbox" id="colorcheck" value={item.color} onChange={handleCheckboxColorChange} />
                                                                        <span className="checkmark" style={{ backgroundColor: item.color }}></span>
                                                                    </label>
                                                                </div>
                                                            )
                                                           
                                                    } */}
                            </div>
                        </div>

                        <div className="col-lg-6 m-2">
                            <label>מידות</label>
                            <div>
                                {
                                    misureList.map((size) =>

                                        <div class="form-check m-2">
                                            <label class="form-check-label float-left" for={size}> {size}</label>
                                            <input onChange={handleSizeChange}
                                                name={size}
                                                type="number"
                                                value={input.size}
                                                className="form-control"
                                                placeholder="כמות" style={{ width: "80px" }}
                                            />
                                        </div>

                                    )
                                }</div>
                        </div>

                        <div className="col">
                            <label for="productImage">תמונות</label>
                            <input
                                type="file"
                                name="productImage"
                                className="form-control"
                                accept=".jpeg, .png, .jpg"
                                multiple
                                onChange={(e) => handleFilesUpload(e)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={addModel}>שמור</button>
                    <button className="btn btn-primary btn-block">הסר</button>
                </div>
            </div>
        </div>

    )
}