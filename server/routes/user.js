const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");


router.route("/create").post(async (req, res) => {
  const name = req.body.name;
  const auth = req.body.auth;
  const password = req.body.password;
  const bissnesName = req.body.bissnesName;
  const mail = req.body.mail;
  const telephon = req.body.telephon;
  const address = req.body.addres;
  const newUser = new User({
      name,
      auth,
      password,
      bissnesName,
      mail,
      telephon,
      address
  });
  let user1 = await User.findOne({ bissnesName: req.body.bissnesName });
  if (user1)
      return res.status(200).send("שם עסק כבר קיים במערכת");
  let user2 = await User.findOne({ password: req.body.password });
  if (user2)
      return res.status(200).send("סיסמא קיימת");
  newUser.save();
  return res.status(200).send(true);

});

router.post("/validateUser", async (req, res) => {
  let user = await User.findOne({ username: req.body.username, password: req.body.password });
  if (!user) return res.status(200).send(false);
  return res.status(200).send({valid:true, user:user});

});

router.get("/get", async (req, res) => {
  let clients1 = await User.find();
  res.send(clients1);
});

router.get(`/get/:id`, async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  let client = await User.findOne({ _id: id });
  if (!client) return res.status(404).send("Sorry, there's no such product");
  return res.status(200).send(client);
});

router.delete(`/delete/:id`, async (req, res) => {
    const id = req.params.id;
    const client = await User.findOneAndDelete({ _id: id });
    if (!client) return res.status(404).send("Sorry, there's no such post");
    return res.send(client).status();
  });

 
router.post(`/update/:id`, async (req, res)=>{
  console.log("iiiiiiii");
  console.log(req.params.id);
  console.log(req.body);
  const client=await User.updateOne(
      { _id: req.params.id },
      { $set:
         {
          name:req.body.name,
          bissnessName:req.body.bissnesName,
          mail:req.body.mail,
          telephon:req.body.telephon,
          address:req.body.addres
         }
      }
   );
   console.log(client);
   if (!client)
     return res.status(404).send("Sorry, there's no such post");
     return res.send(true).status(200);
})
module.exports = router;