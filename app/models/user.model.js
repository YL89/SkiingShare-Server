const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    address: String,
    postalCode: String,
    phone: String
})

const User = mongoose.model("User", userSchema);

module.exports = User;