const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');

const userSchema = {
    name: String,
    auth:Boolean,
    password: String,
    bissnessName: String,
    mail: String,
    telephon: String,
    address: String
}


const User = connection.model('User', userSchema);
module.exports = User;
