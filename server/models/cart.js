const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');


const cartSchema = {
    customer_id: String,
    products: [{
        type:Object
    }]

}   

const Cart = connection.model('Cart', cartSchema);
module.exports = Cart;
