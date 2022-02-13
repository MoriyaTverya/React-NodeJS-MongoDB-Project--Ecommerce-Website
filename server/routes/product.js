const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");


router.route("/create").post((req, res) => {
 
   console.log(req.body.productImages.length);
  
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCode = req.body.productCode;
    const productDescribe = req.body.productDescribe;
    const productCategories = req.body.productCategories;
    const productColors = req.body.productColors;
    const productImages = req.body.productImages;
    const productSizes = req.body.productSizes;

    const newProduct = new Product({
      productName, 
      productPrice,
      productCode,
      productDescribe,
      productCategories,
      productColors,
      productImages,
      productSizes
    });
    
    newProduct.save();
   
  });

router.get("/get", async (req, res) => { 
       let products = await Product.find();  
       res.send(products);
});


router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let product = await Product.findOne({ _id: id });
  if (!product) return res.status(404).send("Sorry, there's no such product");
  return res.status(200).send(product);
});


router.get(`/getImage/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let product = await Product.findOne({ _id: id });
  if (!product) return res.status(404).send("Sorry, there's no such product");
  return res.status(200).send(product.productImages[0]);
});

router.route("/delete").post(async(req, res) => {
  try{
  const ids = req.body.items;
  const product = await Product.deleteMany({ _id: { $in: ids} });
  if (!product) return res.status(404).send(false);
  return res.status(200).send(true);}
  catch(err){
    return res.status(200).send(err);
  }
});

router.get("/getItems").post(async(req, res) => {
  try{
  const ids = req.body.ids;
  const products = await Product.find({ _id: { $in: ids} });
  console.log(products);
  if (!products) return res.status(404).send(false);
  return res.status(200).send(true);}
  catch(err){
    return res.status(200).send(err);
  }
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

