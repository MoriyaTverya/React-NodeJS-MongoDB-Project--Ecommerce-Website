import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from './UserProvider';

export default function ProductView() {


    const user = useContext(UserContext);
    const { id } = useParams();
    const [stock, setStock] = useState({});
    const [input, setInput] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [sizes, setSizes] = useState({});
    const [item, setItem] = useState([]);
    const [images, setImages] = useState([]);
    const [largeImage, setImage] = useState('');
    const [isStock, setIsStock] = useState([]);

    let arr = []

    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/product/${id}`);
        setItem(result.data);

        setImages(result.data.productImages);
        setImage(result.data.productImages[0]);
        const object = result.data.productSizes;
        for (const [key] of Object.entries(object)) {
            arr.push(key);
        }
        setSizeList(arr);
        setStock(result.data.productSizes);
    }, []);

    function changeImage(event) {
        const myimg = event.target.name;
        setImage(myimg);
    }

    function handleSizeChange(event) {
        const { name, value } = event.target;
        setSizes(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value, 10)
            }
        });
    }

    function handleSizeChange(event) {
        const { name, value } = event.target; 
        if (stock[name] < value) {
            setIsStock(" ממידה "+name+" קיימים רק "+stock[name]+" פריטים במלאי ")
        }
        else{
            setIsStock("")
        setSizes(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value, 10)
            }
        });}
    }
    // const handleSizeChange  =async (event) =>{
    //     const { name, value } = event.target;
    //     if (stock[name] < value) {
    //         alert("אין מספיק במלאי");
    //     }
    //     else {
    //         // await promisedSetSize(name, value);
    //         setSizes(prevState => {
    //             return {
    //                 ...prevState,
    //                 [name]: parseInt(value, 10)
    //             }
    //         })
    //         setProduct(prevInput => {
    //             return {
    //                 ...prevInput,
    //                 psizes: sizes
    //             }
    //         })
    //         setOrder(prevInput => {
    //             return {
    //                 ...prevInput,
    //                 products: product
    //             }
    //         })

    //     }
    // }
    const createOrder = async (event) => {
        event.preventDefault();
       
        const newOrder ={
            customerId: user.id,
            date: Date(),
            products:[{
            productId: id,
            psizes: sizes
              }]
        }
        console.log(newOrder);
        const res = await axios.post('http://localhost:3001/order/create', newOrder);

        if (res.data === true) {
            alert("ok");
        }
        if (res.data === false) {
            alert("No");

        }
    }


    return (
        <div className="container">
            <div className="bg-white product-image">
                <div className="row">
                    <aside className="col-lg-1"></aside>
                    <aside className="col-lg-5 col-md-5 col-sm-12">
                        <article className="gallery-wrap">
                            <div className="img-big-wrap">
                                <div className="d-flex justify-content-center"> <a href="#"><img src={largeImage} style={{ maxWidth: "100%" }} /></a></div>
                            </div>
                            <div className="d-flex justify-content-center img-small-wrap p-0">
                                {
                                    images.map((image, index) =>
                                        <div key={`img${index}`} className="item-gallery" >
                                            <img src={image} onClick={changeImage} name={image} />
                                        </div>)
                                }

                            </div>
                        </article>
                    </aside>
                    <aside className="col-lg-5 col-md-7 col-sm-12">
                        <article className="card-body">
                            <h1 className="price">{item.productName}</h1>
                            <p className="price-detail-wrap price">
                                ₪{item.productPrice}
                            </p>
                            <dl className="item-property">
                                <p>{item.productDescribe}</p>
                            </dl>


                            <h4 className="price">מידות</h4>
                            <div>
                               
                                {
                                    sizeList.map((size) =>
                                        <span key={size} className="form-check">
                                            <label className="form-check-label"> {size}</label>
                                            <input onChange={handleSizeChange}
                                                name={size}
                                                type="number" min="0" step="1"
                                                value={input.size}
                                                className="form-control"
                                                id="rounded"
                                                placeholder="כמות" style={{ width: "80px" }}
                                            />
                                        </span>

                                    )
                                } 
                                <p className="mt-3">{isStock}</p>
                            </div>

                            <div className="item-buttons">
                                <button href="#" className="btn btn-block ms-3 turkiz" > הוספה לעגלה </button>
                                <button href="#" className="btn btn-block pink" onClick={createOrder}> הזמנה </button>
                            </div>

                        </article>
                    </aside>
                </div>
            </div>
        </div>
    );
}