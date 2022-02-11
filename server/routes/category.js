const express = require("express");
const router = express.Router();
const category = require("../models/category");
const mongoose = require("mongoose");
const Category = require("../models/category");


router.route("/create").post(async(req, res) => {
    const categoryName = req.body.categoryName;
    const masterCategory = req.body.masterCategory;
    if(!masterCategory){
    const newCategor = new category({
      categoryName
    });
  
    newCategor.save();
  }
  else{
    let categories = await category.findOne({categoryName : req.body.masterCategory} ); 
    console.log(categories.categoryName);
  //   category.updateOne(
  //     { categoryName: categories.categoryName },
  //     { $push: { subcategories: req.body.category } }
  //  )
  //categories.subcategory.push(categoryName);
  let v=await category.findOneAndUpdate(
    { categoryName: masterCategory }, 
    { $push: { subcategories: req.body  } },
   function (error, success) {
         if (error) {
             console.log(error);
         } else {
             console.log(success);
         }
     });
 
  categories.save(done);
   console.log(categories);
  }
  return res.status(200).send("צבע קיים");
  });

    router.get("/get", async (req, res) => { 
       let categories = await category.find();  
       console.log(category.find());  
       res.send(categories);
      });

      
router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let category = await Category.findOne({ _id: id });
  if (!category) return res.status(404).send("Sorry, there's no such product");
  return res.status(200).send(category);
});


  module.exports = router;
// router.post("/createCategory").post((req, res) => {
// //  const code = code++;
//     const categoryName = req.body.categoryName;
//     const masterCategory = req.body.masterCategory;
//     const newCategory = new Category({
//        // code,
//         categoryName,
//         masterCategory
//     });

//     newCategory.save();

// });

//
// module.exports = router;

// router.post("/validateUser", async (req, res) => {
//     let managers = await Manager.findOne({ username: req.body.username, password: req.body.password });
//     if (!managers) return res.status(200).send(false);
//     return res.status(200).send(true);

// });







// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   let manager = await Manager.findOne({ _id: id });
//   if (!manager) return res.status(404).send("Sorry, there's no such post");
//   return res.send(post);
// });
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

