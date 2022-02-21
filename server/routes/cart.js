const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const mongoose = require("mongoose");



router.get("/get", async (req, res) => { 
       let carts = await Cart.find();  
       res.send(carts);
});


router.get(`/getCart/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let products = await Cart.findOne({ customer_id: id });
  if (!products) return res.status(404).send("Sorry, there's no items in the cart");
  return res.status(200).send(products);
});


// router.get(`/:id`, async (req, res) => {
//   const id = req.params.id;
//   console.log(req.params.id);
//   let product = await Product.findOne({ _id: id });
//   if (!product) return res.status(404).send("Sorry, there's no such product");
//   return res.status(200).send(product);
// });


router.route("/removeItem/:id").post(async(req, res) => {
  try{
    console.log("hayushh");
  const customerId = req.params.id;
  const productId = req.body.productId;
  const product = await Cart.updateOne({customer_id: customerId},{ $pull: { products:{productId :productId}}}); 
  console.log("p" , product)
  console.log(customerId, "---", productId);
  if (!product) return res.status(404).send(false);
  return res.status(200).send(true);}
  catch(err){
    return res.status(200).send(err);
  }
});

router.route("/clearCart/:id").post(async(req, res) => {
  try{
  console.log("hayushh");
  const customerId = req.params.id;
  const product = await Cart.deleteOne({customer_id: customerId}); 
  if (!product) return res.status(404).send(false);
  return res.status(200).send(true);}
  catch(err){
    return res.status(200).send("hey");
  }
});

// router.get("/getItems").post(async(req, res) => {
//   try{
//   const ids = req.body.ids;
//   const products = await Product.find({ _id: { $in: ids} });
//   console.log(products);
//   if (!products) return res.status(404).send(false);
//   return res.status(200).send(true);}
//   catch(err){
//     return res.status(200).send(err);
//   }
// });


router.post(`/addToCart/:id`, async (req, res)=>{

    var query = Cart.updateOne(
        { customer_id: req.params.id},
        { $push: { "products": req.body.product}}
      );
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
Cart.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) return res.status(404).send(false);
});
    return res.status(200).send(true);
});
 
      
module.exports = router;

// router.post("/", async (req, res) => {
//   console.log(req.body);
//   try {
//     const newManager = new Manager({ ...req.body });
//     await newManager.save();
//     return res.send(newPost).status(200);
//   } catch (e) {
//     return res.status(400).send(e.message);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     let manager = await Manager.findOne({ _id: id });
//     if (!manager) return res.status(404).send("Sorry, there's no such post");
//     manager.name = req.body.name;
//     manager.password = req.body.password;

//     manager = await manager.save();
//     return res.send(manager).status(200);
//   } catch (e) {
//     return res.status(400).send(e.message);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const manager = await Manager.findOneAndDelete({ _id: id });
//   if (!manager) return res.status(404).send("Sorry, there's no such post");
//   return res.send(manager).status();
// });

