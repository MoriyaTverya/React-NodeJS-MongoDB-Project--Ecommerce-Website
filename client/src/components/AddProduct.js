import React, { useState, useEffect } from "react";
import axios from "axios";
export default function AddProduct() {

    const sizeList = [0,1,2,3,4,5,6]
    const [input, setInput] = useState({
        productName: '',
        productCode:'',
        productDescribe: '',
        productPrice: '',
        productSalePrice:'',
        productSale:false
    })

    const [productSizes, setSizes] = useState({});
    const [productImages, setImages] = useState([]);
    const [productColors, setColorState] = useState([])
    const [productCategories, setCategories] = useState([]);

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
        setSizes (prevState => {
                return {
                    ...prevState,
                    [name]: parseInt(value, 10)
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
            productSale: input.productSale,
            productSalePrice: input.productSalePrice
           
        }

        console.log(newProduct);

        // const res = await axios.post('http://localhost:3001/product/create', newProduct);

        // if (res.data === true) {
        //     alert("ok");
        // }
        // if (res.data === false) {
        //     alert("No");

        // }
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
            <div className="container">
                <div className="auth-inner-forms">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-4"> הוספת מוצר </h1>
                        <div className="form-group">
                            <h5>שם המוצר</h5>
                            <input onChange={handleChange}
                                name="productName"
                                value={input.productName}
                                type="text"
                                className="form-control p-2 mb-4"
                                placeholder="שם מוצר"
                            />
                            <h5>קוד</h5>
                            <input onChange={handleChange}
                                name="productCode"
                                value={input.productCode}
                                type="text"
                                className="form-control p-2 mb-4"
                                placeholder="קוד מוצר"
                                rows='3'
                            />
                            <h5>תיאור</h5>
                            <textarea onChange={handleChange}
                                name="productDescribe"
                                value={input.productDescribe}
                                type="text"
                                className="form-control p-2 mb-4"
                                placeholder="תיאור מוצר"
                                rows='3'
                            />
                            <h5>מחיר</h5>
                            <input onChange={handleChange}
                                name="productPrice"
                                value={input.productPrice}
                                type="number" min="0.00" step="0.1"
                                className="form-control p-2 mb-4"
                                placeholder="מחיר"
                            />

                         
                            <input type="checkbox" className="form-check-input m-1" onChange={handleSaleChange}  name="productSale"/>
                            <label class="form-check-label" for="productSale"><h5>מבצע</h5></label>
                            <div>
                               <h6>מחיר מבצע</h6>
                               <input onChange={handleChange}
                                name="productSalePrice"
                                value={input.productSalePrice}
                                type="number" min="0.00" step="0.1"
                                className="form-control p-2 mb-4"
                                placeholder="מחיר מבצע"
                                disabled = {!input.productSale}
                            /></div>
                            
                            
                            <h5>קטגוריות</h5>
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

                            <h5>מידות</h5>
                            <div>
                                {
                                    sizeList.map((size) =>

                                        <div class="form-check">
                                            <label class="form-check-label float-left"> {size}</label>
                                            <input onChange={handleSizeChange}
                                                name={size}
                                                type="number" min="0" step="1"
                                                value={input.size}
                                                className="form-control"
                                                placeholder="כמות" style={{ width: "80px" }}
                                            />
                                        </div>

                                    )
                                }
                            </div>

                            <br></br>

                            <h5>תמונות</h5>
                            <input
                                type="file"
                                name="productImage"
                                className="form-control"
                                accept=".jpeg, .png, .jpg"
                                multiple
                                onChange={(e) => handleFilesUpload(e)}
                            />

                            <br />

                            <h5>צבעים</h5>
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
                        </div >  
                         <br />

                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} disabled={!validateForm()}>הוסף</button>

                    </form>
                </div>
            </div>
        </div>

    )
}