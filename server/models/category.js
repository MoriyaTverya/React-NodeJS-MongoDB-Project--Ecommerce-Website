const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');

const categorySchema = {
    categoryName: String,
    masterCategory: String,
    subcategories:[{type:Object}]
}

const Category = connection.model('Category', categorySchema);
module.exports = Category;

