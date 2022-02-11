const express = require("express");
const router = express.Router();
const Manager = require("../models/manager");
const mongoose = require("mongoose");


router.route("/create").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newManger = new Manager({
    username,
    password
  });

  newManger.save();

})

router.get("/get", async (req, res) => {
  let managers = await Manager.find();
  console.log(Manager.find());
  res.send(managers);
});

module.exports = router;

router.post("/validateUser", async (req, res) => {
  let managers = await Manager.findOne({ username: req.body.username, password: req.body.password });
  if (!managers) return res.status(200).send(false);
  return res.status(200).send({valid:true, user:managers});

});







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

