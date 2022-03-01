import React, { useState, useEffect } from "react";
import axios from "axios";
import NewColor from "./newColor";

export default function Content() {

    const [input, setInput] = useState({
        productName: '',
        productPrice: '',
        productImage: '',
        productDescribe: '',
    })

    const misureList = [" 0 ", " 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 "]
    const [productCapacity, setCapcity] = useState([{ color: '', sizes: {}, images: [] }]);

    const [showComponent, setShow] = useState(false);
    const [productColors, setColorState] = useState([])
    const [productCategory, setCategoryState] = useState([])
    const [sizeState, setSizeState] = useState({});

    const [colorList, setcolorList] = useState([]);
    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/color/get');
        setcolorList(result.data);
    }, []);


    const [categoryList, setCategoryList] = useState([]);
    useEffect(async () => //initial  
    {
        let result = await axios.get('http://localhost:3001/category/get');
        console.log(result.data);
        setCategoryList(result.data);
    }, []);


    function handleCheckboxColorChange(event) {
        if (event.target.checked) {
            if (!productColors.includes(event.target.value)) {
                setColorState(prevState => [...prevState, event.target.value])
                const element = <NewColor name={event.target.value} />;
                    // ReactDOM.render(
                    // element,
                    // document.getElementById('root')
                    // );
                setShow(true);
                setCapcity([{ color: "black", sizes: { " 0 ": 100, " 1 ": 100 }, images: ["hey", "hello"] }, { color: "pink", sizes: { " 0 ": 100, " 1 ": 100 }, images: ["hey", "hello"] }]);
                console.log("hey", productCapacity.color == "pink" ? true : false);
            }
        } else {
            setColorState(prevState => prevState.filter(color => color !== event.target.value));
            setShow(false);
        }
    }


    function handleCheckboxCategoryChange(event) {
        if (event.target.checked) {
            if (!productColors.includes(event.target.value)) {
                setCategoryState(prevState => [...prevState, event.target.value])
            }
        } else {
            setCategoryState(prevState => prevState.filter(color => color !== event.target.value));
        }
    }

    function handleChangeSize(event, property) {
        if (event.target.checked) {
            if (!productColors.includes(event.target.value)) {
                setSizeState(prevState => [...prevState, event.target.value])
            }
        } else {
            setSizeState(prevState => prevState.filter(color => color !== event.target.value));
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    function validateForm() {
        return input.productName.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProduct = {
            productName: input.productName,
            productPrice: input.productPrice,
            productImage: input.productImage,
            productDescribe: input.productDescribe,
            productCategory: productCategory,
            productColors: productColors,
            productCapacity: productCapacity
            //productSizes: { [input.productSizes]: input.capacity },

        }

        console.log(newProduct);
        const res = await axios.post('http://localhost:3001/product/create', newProduct);

        if (res.data === true) {
            alert("ok");
        }
        if (res.data === false) {
            alert("No");

        }
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

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        console.log(files);
        // const base64 = await convertToBase64(file);
        // setInput({ ...input, productImage: base64 });
    };
    return (
        <div className="not-sidebar">
            <div className="auth-inner-forms">
                <form onSubmit={handleSubmit} dir="rtl">
                    <h1> הוספת מוצר </h1>
                    <div className="form-group">
                        <label>שם המוצר</label>
                        <input onChange={handleChange}
                            name="productName"
                            value={input.productName}
                            type="text"
                            className="form-control"
                            placeholder="שם מוצר"
                        />
                        <label>תיאור</label>
                        <input onChange={handleChange}
                            name="productDescribe"
                            value={input.productDescribe}
                            type="text"
                            className="form-control"
                            placeholder="תיאור מוצר"
                        />
                        <label>מחיר</label>
                        <input onChange={handleChange}
                            name="productPrice"
                            value={input.productPrice}
                            type="number" min="0.00" step="0.1"
                            className="form-control"
                            placeholder="מחיר"
                        />

                        <label>קטגוריה</label>
                        {
                            categoryList.map(item =>
                                <div key={item._id}>
                                    <div className="form-check" dir="rtl">
                                        <input className="form-check-input" dir="rtl" onChange={handleCheckboxCategoryChange} type="checkbox" id={item.categoryName} value={item.categoryName} name="productCategory" />
                                        {item.categoryName}
                                    </div>
                                </div>)
                        }
                    </div>


                    <label>צבע</label>
                    <div>
                        {
                            colorList.map(item =>
                                <div key={item._id} className="form-check-inline">
                                    <label className="containerc">
                                        <input type="checkbox" id="colorcheck" value={item.color} onChange={handleCheckboxColorChange} />
                                        <span className="checkmark" style={{ backgroundColor: item.color }}></span>
                                    </label>

                                </div>
                            )
                        }
                    </div>
                    {
                        showComponent ?
                            // <div className="auth-inner">
                            //      <div className="form-group">
                            //     <label for="productImage">תמונת מוצר</label>
                            //     <input
                            //         type="file"
                            //         name="productImage"
                            //         className="form-control"
                            //         accept=".jpeg, .png, .jpg"
                            //         multiple
                            //         onChange={(e) => handleFileUpload(e)}
                            //     />

                            // </div>
                            // <div className="form-group">
                            //     <label>מידה</label>
                            //     {
                            //         misureList.map((item, index) =>
                            //             <div className="">
                            //                 <input onChange={handleChange} 
                            //                 value={item} 
                            //                 className="form-check-input" 
                            //                 type="checkbox" 
                            //                 name="productSizes" />
                            //                 {item}
                            //                 <input onChange={handleChange}
                            //                     name={"capacity"}
                            //                     type="number"
                            //                     value={input.capacity}
                            //                     className="form-control"
                            //                     placeholder="כמות"
                            //                 />
                            //             </div>
                            //             )
                            //     }
                            // </div></div>
                            <NewColor name="ניסוי" />
                
                : null }



                    <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()}>הוסף</button>

                </form>
            </div>
        </div>

    )
}