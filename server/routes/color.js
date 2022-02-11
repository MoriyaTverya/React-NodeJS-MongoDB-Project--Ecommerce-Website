const express = require("express");
const router = express.Router();
const Color = require("../models/color");
const mongoose = require("mongoose");


router.route("/create").post((req, res) => {
  const colorname = req.body.colorname;
  const color = req.body.color;
  const newColor = new Color({
    colorname,
    color
  });
  
  newColor.save();

})

router.get("/get", async (req, res) => {
  let colors = await Color.find();
  console.log(Color.find());
  res.send(colors);
});

module.exports = router;
