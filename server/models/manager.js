const mongoose = require("mongoose");
const connection = mongoose.createConnection('mongodb://localhost:27017/ordman');
const managerSchema = {
    username: String,
    password: String
}

const Manager = connection.model('Manager', managerSchema); 
module.exports = Manager;

