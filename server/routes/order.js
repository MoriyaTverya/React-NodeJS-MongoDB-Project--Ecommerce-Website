const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");


router.route("/create").post((req, res) => {
 
    const customerId = req.body.customerId;
    const date = req.body.date;
    const products = req.body.products;

    const newOrder = new Order({
      customerId,
      date,
      products
    });
    
    newOrder.save();
   
  });

router.get("/get", async (req, res) => { 
       let orders = await Order.find();  
       res.send(orders);
});
      
router.get(`/customer/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let orders= await Order.find({ customerId: id });
  if (!orders) return res.status(404).send("Sorry, there's no orders");
  return res.status(200).send(orders);
});

module.exports = router;