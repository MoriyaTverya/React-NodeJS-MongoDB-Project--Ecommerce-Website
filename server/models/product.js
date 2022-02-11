const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');


const productSchema = {
    productName: String,
    productCode: String,
    productDescribe:String, 
    productPrice: Number,
    productCategories:[{
        type: String
    }], 
    productImages: [{
        type: String
    }],
    productColors:  [{
        type: String
    }],
    productSizes: Object

}   

const Product = connection.model('Product', productSchema);
module.exports = Product;
