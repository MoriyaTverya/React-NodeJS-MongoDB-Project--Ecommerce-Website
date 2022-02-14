const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');


const cartItemSchema = {
    productName: String,
    productCode: String,
    productDescribe:String, 
    productPrice: Number,
    productSalePrice:Number,
    productSale:Boolean,
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
