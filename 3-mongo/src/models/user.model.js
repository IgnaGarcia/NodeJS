const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserShema = Schema({
    username: String,
    age: Number
});

module.exports = mongoose.model("user", UserShema);