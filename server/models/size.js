const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');

const productSchema = {
   size_0 : Number,
   size_1 : Number,
   size_2: Number,
   size_3: Number
}

const Product = connection.model('Product', productSchema);
module.exports = Product;
