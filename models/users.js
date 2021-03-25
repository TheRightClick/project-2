const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const userSchema = new Schema({
    username: {type: String, required: true, unique:true},
    password: { type: String, required: true },
    isAdmin: Boolean,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

});


const User = model('User', userSchema);
module.exports = User;
