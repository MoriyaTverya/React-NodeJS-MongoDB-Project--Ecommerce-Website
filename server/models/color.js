const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');
const colorSchema = {
    colorname: String,
    color: String
}

const Color = connection.model('Color', colorSchema); 
module.exports = Color;

