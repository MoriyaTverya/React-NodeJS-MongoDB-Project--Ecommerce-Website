import React, { useState, useEffect } from "react";
import axios from "axios";
import AddColor from "./AddColor";
import Color from "./Manager/Color";
import Category from "./Manager/category/Category";
import { useParams } from "react-router-dom";
export default function ProductUpdate() {



    const [item, setItem] = useState();

    const { id } = useParams();
    const sizeList = [0, 1, 2, 3, 4, 5, 6]
    const [input, setInput] = useState({
        productName: '',
        productCode: '',
        productDescribe: '',
        productPrice: '',
        productSalePrice: '',
        productSale: false
    })

    const [productSizes, setSizes] = useState({});
    const [productSales, setSales] = useState({});
    const [productImages, setImages] = useState([]);
    const [productColors, setColorState] = useState([])
    const [productCategories, setCategories] = useState([]);
    const [productLikes, setLikes] = useState([]);

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
        setCategoryList(result.data);
    }, []);

    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(result.data);
        setInput({
            productName: result.data.productName,
            productCode: result.data.productCode,
            productDescribe: result.data.productDescribe,
            productPrice: result.data.productPrice,
            productSalePrice: result.data.productSalePrice,
            productSale: result.data.productSale
        })
        setSizes(result.data.productSizes);
        setImages(result.data.productImages);
        setColorState(result.data.productColors);
        setCategories(result.data.productCategories);
        setLikes(result.data.productLikes);
    }, []);




    function handleCheckboxColorChange(event) {
        if (event.target.checked) {
            if (!productColors.includes(event.target.value)) {
                setColorState(prevState => [...prevState, event.target.value])
                console.log(productColors);
            }
        } else {
            setColorState(prevState => prevState.filter(color => color !== event.target.value));

        }
    }

    function handleCheckboxCategoryChange(event) {
        if (event.target.checked) {
            if (!productCategories.includes(event.target.value)) {
                setCategories(prevState => [...prevState, event.target.value])
            }
        } else {
            setCategories(prevState => prevState.filter(category => category !== event.target.value));
        }
    }
    function handleSaleChange(event) {
        if (event.target.checked) {
            setInput(prevState => {
                return {
                    ...prevState,
                    productSale: true
                }
            })
        } else {
            setInput(prevState => {
                return {
                    ...prevState,
                    productSale: false
                }
            })
        }
    }


    function handleSizeChange(event) {
        const { name, value } = event.target;
        setSizes(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value, 10)
            }
        });
        setSales(prevState => {
            return {
                ...prevState,
                [name]: 0
            }
        });
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
            productCode: input.productCode,
            productDescribe: input.productDescribe,
            productPrice: input.productPrice,
            productCategories: productCategories,
            productImages: productImages,
            productColors: productColors,
            productSizes: productSizes,
            productSales: productSales,
            productSale: input.productSale,
            productSalePrice: input.productSalePrice,
            productLikes: productLikes

        }

        console.log(newProduct);

        const res = await axios.post(`http://localhost:3001/product/update/${id}`, newProduct);

        if (res.data === true) {
            alert("עודכן בהצלחה");
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
        <div className="">
            <div className="container-fluid">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <h4 className="">עדכן מוצר</h4>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 ms-2">
                                <div className="form-group">
                                    <div className="mt-2"></div>
                                    <h5>פרטים</h5>
                                    <div class="row g-1 align-items-center">
                                        <div class="col-auto">
                                            <label for="productName" class="col-form-label"><h6>שם מוצר</h6></label>
                                        </div>
                                        <div class="col-auto">
                                            <input onChange={handleChange}
                                                name="productName"
                                                id="productName"
                                                value={input.productName}
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                            /></div>

                                        <div className="row g-1 align-items-center">
                                            <div class="col-auto">
                                                <label for="productCode" class="col-form-label"><h6>קוד מוצר</h6></label>
                                            </div>
                                            <div class="col-auto">
                                                <input onChange={handleChange}
                                                    name="productCode"
                                                    value={input.productCode}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    rows='3'
                                                />
                                            </div></div></div>
                                    <h6>תיאור</h6>
                                    <textarea onChange={handleChange}
                                        name="productDescribe"
                                        value={input.productDescribe}
                                        type="text"
                                        className="form-control p-2 mb-4"
                                        placeholder="תיאור מוצר"
                                        rows='3'
                                    />
                                </div>
                                <div className="mt-2">
                                    <h5>מחיר</h5>
                                    <div class="row align-items-center">
                                        <div className="col-auto">
                                            <input onChange={handleChange}
                                                name="productPrice"
                                                id="productPrice"
                                                value={input.productPrice}
                                                type="number" min="0.00" step="0.1"
                                                className="form-control"
                                                style={{ width: "80px" }}
                                                placeholder="מחיר"
                                            /></div>
                                        <div className="col-auto row gx-2 align-items-center">
                                            <div className="col-auto">
                                                <input type="checkbox" className="form-check-input m-1" checked={input.productSale} onChange={handleSaleChange} name="productSale" id="productSale" />
                                                <label class="form-check-label" for="productSale">מבצע</label>
                                            </div>
                                            <div class="col-auto">
                                                <input onChange={handleChange}
                                                    name="productSalePrice"
                                                    value={input.productSalePrice}
                                                    type="number" min="0.00" step="0.1"
                                                    className="form-control"
                                                    placeholder="מחיר מבצע"
                                                    disabled={!input.productSale}
                                                /></div>

                                        </div>
                                    </div>


                                    <div className="mt-4">

                                        <h5>מלאי</h5>
                                        <div className="row">
                                            {
                                                sizeList.map((size) =>

                                                    <div class="col-auto row mb-1">
                                                        <label class="col-auto"> {size}</label>
                                                        <input onChange={handleSizeChange}
                                                            name={size}
                                                            type="number" min="0" step="1"
                                                            value={productSizes[size]}
                                                            className="form-control col-auto"
                                                            placeholder="כמות" style={{ width: "80px" }}
                                                        />
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 ms-5">
                                <h5>תמונות</h5>
                                <article className="gallery-wrap">
                                    <div className="d-flex justify-content-center img-small-wrap p-0">
                                        {
                                            productImages.map((image, index) =>
                                                <div key={`img${index}`} className="item-gallery" >
                                                    <img src={image} name={image} />
                                                </div>)
                                        }

                                    </div>
                                </article>
                                <input
                                    type="file"
                                    name="productImage"
                                    className="form-control"
                                    accept=".jpeg, .png, .jpg"
                                    multiple
                                    onChange={(e) => handleFilesUpload(e)}
                                />

                                <div className="mt-3">

                                    <h5>צבעים</h5>
                                    {
                                        productColors.map(item =>
                                            <div key={item._id} className="form-check-inline m-2">
                                                <label className="containerc">
                                                    <input type="checkbox" id="colorcheck" value={item.color} onChange={handleCheckboxColorChange} />
                                                    <span className="checkmark" style={{ backgroundColor: item }}></span>
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mt-3">
                                    {
                                        colorList.map(item =>
                                            <div key={item._id} className="form-check-inline m-2">
                                                <label className="containerc">
                                                    <input type="checkbox" id="colorcheck" value={item.color} onChange={handleCheckboxColorChange} />
                                                    <span className="checkmark" style={{ backgroundColor: item.color }}></span>
                                                </label>
                                            </div>
                                        )

                                    }

                                    <div className="border p-2"><Color /></div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">

                                <h5>קטגוריות</h5>
                                {

                                    productCategories.map(item =>
                                        <ul>
                                            <il>
                                                   {item}
                                            </il>
                                           
                                        </ul>)
                                }
                                {

                                    categoryList.map(item =>
                                        <ul>
                                            <il>
                                                <input type="checkbox" className="form-check-input m-1" onChange={handleCheckboxCategoryChange} id={item.categoryName} value={item.categoryName} name="productCategory" />
                                                {item.categoryName}
                                            </il>
                                            {item.subcategories.map(x =>
                                                <ul><div>
                                                    <input type="checkbox" className="form-check-input m-1" onChange={handleCheckboxCategoryChange} id={x.categoryName} value={x.categoryName} name="productCategory" />
                                                    {x.categoryName}
                                                </div></ul>)
                                            }
                                        </ul>)
                                }
                                <div className="border p-2"> <Category /></div>

                            </div >
                        </div>
                        <div className="float-left">
                            <button type="submit" className="btn btn-primary btn-block turkiz" onClick={handleSubmit} disabled={!validateForm()}>עדכן מוצר</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >

    )
}