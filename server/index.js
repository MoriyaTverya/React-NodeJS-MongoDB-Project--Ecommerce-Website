const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
// app.use(express.json());

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

//connect to mpngose
mongoose.connect("mongodb://localhost:27017/ordman", { useUnifiedTopology: true , useNewUrlParser: true})
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error(err));

app.listen(process.env.PORT || 3001, () => {
  console.log("server listening on port 3001");
});

app.use("/manager", require("./routes/manager"));
app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));
app.use("/color", require("./routes/color"));
app.use("/order", require("./routes/order"));
app.use("/cart", require("./routes/cart"));
app.use("/user", require("./routes/user"));

//connect to mongo
//require routes 
//app.use("/", require("./routes/try"));




