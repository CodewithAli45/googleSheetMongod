const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sl: {type: Number},
    name: {type: String},
    email: {type: String},
    address:{type: String}
});

const User = mongoose.model('googl', userSchema);

module.exports = User;