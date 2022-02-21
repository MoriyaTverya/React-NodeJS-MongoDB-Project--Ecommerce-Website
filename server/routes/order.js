const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const axios = require("axios");

// const checkPer = async (order, stock ) => {
//   let arr = {};
//   console.log(order);
//   for (const size in order) {
//     if (order[size] > stock[size]) {
//         arr[size] = false;
//     }
//     else{
//        arr[size] = true;
//     }}
//   return arr;
// }

// const isStock = async (product) => {
//   let result = await axios.get(`http://localhost:3001/product/${product.productId}`);
//   console.log(result.data.productSizes);
//   result = result.data.productSizes;
//   let arr = await checkPer( product.psizes, result);
//   return arr;
// }


// const checkStock = async (products) => {
//   let checkResult = {};
//   await Promise.all(products.map(async (product) => {
//      checkResult[product.productId] = await isStock(product);
//   }));
//   console.log("ps" ,checkResult);
//   return checkResult;
// }

// function finalCheck(checkResult){
//   for (const product in checkResult) {
//     p = checkResult[product];
//     for(const size in p){
//       if(!product[size])
//         return false;
//     }
//   }
//   return true;

// }

router.route("/create").post(async (req, res) => {

  const customerId = req.body.customerId;
  const date = req.body.date;
  const products = req.body.products;
  const totalPrice = req.body.totalPrice;
  const status = req.body.status;

  const newOrder = new Order({
    customerId,
    date,
    products,
    totalPrice,
    status
  });
  


  // let checkResult = await checkStock(products);
  // if (finalCheck(checkResult)){
    newOrder.save();
  //   console.log("saveddd!");
    return res.status(200).send(true);
  // }
  // else {
    return res.status(404).send(checkResult);

  // }

  // 

  

});

router.get("/get", async (req, res) => {
  let orders = await Order.find();
  res.send(orders);
});

router.get(`/customer/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let orders = await Order.find({ customerId: id });
  if (!orders) return res.status(404).send("Sorry, there's no orders");
  return res.status(200).send(orders);
});

module.exports = router;