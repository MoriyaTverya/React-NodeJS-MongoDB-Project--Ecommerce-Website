const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');

//מוצר: שם וכמויות
const orderSchema = {
    customerId: String,
    date:Date,
    products:[{
        type: Object
    }],
    status:String,
    totalPrice:Number
}   

const Order = connection.model('Order', orderSchema);
module.exports = Order;
