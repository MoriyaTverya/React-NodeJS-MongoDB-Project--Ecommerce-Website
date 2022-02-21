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
        result = result.data.productSales;
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






    const sendOrder = async (event) => {
        event.preventDefault();
        // let a = false;
        // for (let item in cartItems) {
        //      a = await checkStock(item.psizes, item.productId);
        //     if(a != true){
        //         break;
        //     }
        // }
        for (let item in cartItems) {
            cartItems[item].newStock = await getNewStock(cartItems[item].psizes, cartItems[item].productId);
            const newStock = { newStock: await getNewStock(cartItems[item].psizes, cartItems[item].productId) };
            const res1 = await axios.post(`http://localhost:3001/product/updateStock/${cartItems[item].productId}`, newStock);
            const amount = { amount: await getAmount(cartItems[item].psizes, cartItems[item].productId) };
            console.log(amount);
            const res2 = await axios.post(`http://localhost:3001/product/updateSales/${cartItems[item].productId}`, amount);
            console.log("item", cartItems[item], "\n res1: ", res1, "\n res2: ", res2);
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
            alert("ok");
        }
        if (res.data === false) {
            alert("No");
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

            <div className="row w-75">
                <h4>סל</h4>
                {cartItems[0] ?
                    <div>
                        <button className="btn turkiz m-2" onClick={sendOrder} >שליחת הזמנה</button>
                <button className="btn pink m-2" onClick={clearCart} >רוקן סל</button>
                        {
                            cartItems.map((p) =>
                                <div key={p._id} className="m-3">

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
                                                    <div className="d-flex m-2" value={p.productId} onClick={(e) => saveToLater(e, p)}><i className="fa-solid fa-arrow-down m-1"></i><label>שמירה למאוחר יותר</label></div>
                                                </div>
                                            </div>

                                        </div>
                                        : <div>---</div>
                                    }

                                </div>)
                        }
                    </div> : <div>היי {user.user} :) <br/> עדיין אין פריטים בסל שלך</div>}
            </div>
            <div className="row border-top m-5 p-2">
                <h4>מועד מאוחר יותר</h4>
                {laterItems.map((p) =>
                    <div key={p._id} className="m-2">

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

