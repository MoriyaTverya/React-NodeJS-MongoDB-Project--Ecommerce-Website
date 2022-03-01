import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from './UserProvider';

export default function Cart() {



    const user = useContext(UserContext);
    const navigate = useNavigate();

    const clickMe = (data) => {
        navigate(`/product/${data._id}`);
    }

    const [input, setInput] = useState([]);

    const [sizes, setSizes] = useState({});

    const [itemsDetails, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    useEffect(async () => //initial
    {
        let result = await axios.get(`http://localhost:3001/cart/getCart/${user.id}`);
        console.log(result.data.products);
        setCartItems(result.data.products);
    }, []);
    const [laterItems, setLaterItems] = useState([]);


    useEffect(async () => //initial
    {

        const fetchProducts = async (id) => {
            let result = await axios.get(`http://localhost:3001/product/${id}`);
            setItems(prevInput => {
                return {
                    ...prevInput,
                    [id]: result.data
                }
            })
        }

        cartItems.forEach((p) => fetchProducts(p.productId));

    }, [cartItems]);

    function getSizes(sizes) {
        var rows = [];
        for (const size in sizes) {
            rows.push(
                <div className="row ">
                    <div className="col-6" key={size}>{size}</div>
                    <div className="col-6">{sizes[size]}</div>
                </div>);
        }
        return <tbody>{rows}</tbody>;

    }

    var formatter = new Intl.NumberFormat()

    function getPrice(price, sizes) {
        let sum = 0;
        for (const size in sizes) {
            sum += parseFloat(sizes[size], 10);
        }

        let totalPrice = sum * price;
        return totalPrice;
    }

    function getSumPrice(products) {
        var totalPrice = 0;
        products.forEach(p => {
            totalPrice += getPrice(p.price, p.psizes);
        })
        return totalPrice;
    }

    const removeFromCart = async (event, productId) => {
        let product = { productId: productId };

        const res = await axios.post(`http://localhost:3001/cart/removeItem/${user.id}`, product);
        if (res.data === true) {
            alert("הוסר בהצלחה");
            setCartItems(cartItems.filter(item => item.productId != productId));
        }
        else {
            alert(res);
        }
    }
    const removeAfterOrder = async (productId) => {
        let product = { productId: productId };
        const res = await axios.post(`http://localhost:3001/cart/removeItem/${user.id}`, product);
        setCartItems(cartItems.filter(item => item.productId != productId));
    }

    const saveToLater = async (event, p) => {
        setCartItems(cartItems.filter(item => item.productId != p.productId));
        setLaterItems([...laterItems, p]);

    }

    const backToCart = async (event, p) => {
        setLaterItems(laterItems.filter(item => item.productId != p.productId));
        setCartItems([...cartItems, p]);

    }


    const checkPer = async (order, stock) => {
        let arr = [];
        console.log(order);
        for (const size in order) {
            if (order[size] > stock[size]) {
                return size;
            }
            return true;



        }
    }


    const checkStock = async (sizes, productId) => {
        console.log(productId);
        let result = await axios.get(`http://localhost:3001/product/${productId}`);
        result = result.data.productSizes;
        let v = await checkPer(sizes, result);
        return v;

    }

    const getNewStock = async (sizes, productId) => {
        let result = await axios.get(`http://localhost:3001/product/${productId}`);
        result = result.data.productSizes;
        for (const size in sizes) {
            result[size] = result[size] - sizes[size];
        }
        return result;
    }

    const getAmount = async (sizes, productId) => {
        let result = await axios.get(`http://localhost:3001/product/${productId}`);
        result = result.data.productSizes;
        console.log(result, "---", sizes);
        for (const size in sizes) {
            result[size] = result[size] + sizes[size];
        }
        return result;
    }


    const clearCart = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:3001/cart/clearCart/${user.id}`);
        setCartItems([]);
    }

    function handleSizeChange(event, index) {
        event.preventDefault();
        const { name, value } = event.target;
        
        // if (itemsDetails[cartItems[index].productId].productSizes[name] < value) {
        //     console.log(value);
            
        //     setIsStock(" ממידה " + name + " קיימים רק " + stock[name] + " פריטים במלאי ")
        // }
        // else {
        //     setIsStock("")
        // }
        // else {

        let tempList = [...cartItems];

        tempList[index].psizes ? tempList[index].psizes[name] ? tempList[index].psizes[name] = value : tempList[index].psizes = { ...tempList[index].psizes, [name]: value } : tempList[index] = { ...tempList[index], psizes: { [name]: value } }

        setCartItems(tempList);
        console.log(cartItems);
        setSizes(prevState => {
            return {
                ...prevState,
                [name]: parseInt(value, 10)
            }
        });}
        // }
    // }
    







    const sendOrder = async (event) => {
        event.preventDefault();
        // let a = false;
        // for (let item in cartItems) {
        //      a = await checkStock(item.psizes, item.productId);
        //     if(a != true){
        //         break;
        //     }
        // }  
        let flag = 0;
        for (let item in cartItems) {
            if (cartItems[item].psizes) {
                console.log(cartItems[item].psizes);
                cartItems[item].newStock = await getNewStock(cartItems[item].psizes, cartItems[item].productId);
                const newStock = { newStock: await getNewStock(cartItems[item].psizes, cartItems[item].productId) };
                const res1 = await axios.post(`http://localhost:3001/product/updateStock/${cartItems[item].productId}`, newStock);
                const amount = { amount: await getAmount(cartItems[item].psizes, cartItems[item].productId) };
                console.log(amount);
                const res2 = await axios.post(`http://localhost:3001/product/updateSales/${cartItems[item].productId}`, amount);
                console.log("item", cartItems[item], "\n res1: ", res1, "\n res2: ", res2);

            } else {
                alert(" לא נבחרו מידות עבור " +  itemsDetails[cartItems[item].productId].productName )
            }
        }
        console.log("item", cartItems);
        // if(a === true){

        const newOrder = {
            customerId: user.id,
            date: Date(),
            products: cartItems,
            totalPrice: getSumPrice(cartItems),
            status: 'בטיפול'
        }

        console.log("new", newOrder);

        const res = await axios.post('http://localhost:3001/order/create', newOrder);

        if (res.data === true) {
            alert("ההזמנה בוצעה בהצלחה");
        }
        if (res.data === false) {
            alert("אירעה שגיאה");
        }


        for (let item in cartItems) {
            removeAfterOrder(cartItems[item].productId);
        }



        // }
        // else 
        // alert("out of stock");
    }

    return (
        <div className="container content">
            <h1>סל</h1>

            <div className="row">
                {cartItems[0] ?
                    <div>
                        <button className="btn turkiz m-2 zoom" onClick={sendOrder} >ביצוע הזמנה</button>
                        <button className="btn pink m-2 zoom" onClick={clearCart} >רוקן סל</button>
                        {
                            cartItems.map((p, index) =>
                                <div key={p._id} className="">

                                    {itemsDetails[p.productId] ?
                                        <div className="row border p-2">


                                            <div className="p-0 col-lg-1 col-sm-1">
                                                <img className=" m-1 w-100" src={itemsDetails[p.productId].productImages[0]}></img>
                                            </div>
                                            <div className="col-lg-3 col-sm-3 pe-4">
                                                <h5>{itemsDetails[p.productId].productName}</h5>
                                                <p >{p.price} ₪ </p>
                                            </div>
                                            {/* <div className="col-lg-2 col-sm-2">
                                                <h6>כמויות</h6>
                                                <div>{getSizes(p.psizes)}</div>
                                            </div> */}
                                            <div className="col-lg-3 col-sm-3">
                                                <h6>סיכום הזמנה</h6>
                                                <div>
                                                    {
                                                        Object.keys(itemsDetails[p.productId].productSizes).map((size) =>

                                                            <span key={size} className="d-flex py-1">
                                                                <label className="form-check-label ms-1"> מידה {size}</label>
                                                                <input onChange={(e) => handleSizeChange(e, index)}
                                                                    name={size}
                                                                    type="number" min="0" step="1" max={itemsDetails[p.productId].productSizes[size]}
                                                                    value={p.psizes ? p.psizes[size] ? p.psizes[size] : 0 : 0}
                                                                    className="form-control me-1"
                                                                    id="rounded"
                                                                    placeholder={p.psizes ? p.psizes[size] ? p.psizes[size] : 0 : 0} style={{ width: "60px", height: "30px" }}
                                                                />
                                                                <p className="me-4">{itemsDetails[p.productId].productSizes[size] < 0  ?  ("אזל המלאי") : p.psizes ? p.psizes[size] ? itemsDetails[p.productId].productSizes[size] - p.psizes[size] < 0 ?  ( "קיימים במלאי רק " + itemsDetails[p.productId].productSizes[size] +"  פריטים ") : ("זמין במלאי"):("זמין במלאי"):"זמין במלאי"}</p>
                                                            </span>

                                                        )
                                                    }

                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-2">
                                                <h6 className="d-flex">  סה"כ  </h6> 
                                                <p>{" ₪ "+formatter.format(getPrice(p.price, p.psizes))} </p>
                                            </div>
                                            <div className="col-lg-3 col-sm-3 border-end">
                                                <div className="mt-3">
                                                    <div className="d-flex pointer zoom" value={p.productId} onClick={(e) => removeFromCart(e, p.productId)}><i className="fa-solid fa-x m-1 pointer"></i>הסרת פריט </div>
                                                    <div className="d-flex pointer zoom" value={p.productId} onClick={(e) => saveToLater(e, p)}><i className="fa-solid fa-arrow-down m-1 pointer"></i>שמירה למאוחר יותר</div>
                                                </div>
                                            </div>

                                        </div>
                                        : <div></div>
                                    }

                                </div>)
                        }
                    </div> : <div className="m-5">היי {user.user} :) <br /> </div>}
            </div>
            <div className="row border-top m-5 p-2">
              
                {laterItems.map((p) =>
                    <div key={p._id} className="m-2">  
                    <h4>מועד מאוחר יותר</h4>

                        {itemsDetails[p.productId] ?
                            <div className="row">
                                <div className="p-0 col-lg-1 col-sm-1">
                                    <img className=" m-1 w-100" src={itemsDetails[p.productId].productImages[0]}></img>
                                </div>
                                <div className="col-lg-3 col-sm-3 pe-4">
                                    <h5>{itemsDetails[p.productId].productName}</h5>
                                    <p >{p.price} ₪ </p>
                                </div>
                                <div className="col-lg-2 col-sm-2">
                                    <h6>כמויות</h6>
                                    <div>{getSizes(p.psizes)}</div>
                                </div>
                                <div className="col-lg-2 col-sm-2">
                                    <h6 className="d-flex">  סה"כ  </h6> {formatter.format(getPrice(p.price, p.psizes))} ₪
                                </div>
                                <div className="col-lg-4 col-sm-4 border-end">
                                    <div className="mt-3">
                                        <div className="d-flex m-2" value={p.productId} onClick={(e) => removeFromCart(e, p.productId)}><i className="fa-solid fa-x m-1"></i><label>הסרת פריט </label></div>
                                        <div className="d-flex m-2" onClick={(e) => backToCart(e, p)}><i className="fa-solid fa-arrow-up m-1"></i><label>החזר לסל</label></div>
                                    </div>
                                </div>

                            </div>
                            : <div>---</div>
                        }

                    </div>)
                }
            </div>
        </div>

    );
}
