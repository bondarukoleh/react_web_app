const mongoose = require('mongoose');
const {Schema} = mongoose;

const userScheme = new Schema({
  googleID: {type: String, required: true, minlength: 5, maxlength: 50, unique: true},
  name: {type: String, required: true, minlength: 5, maxlength: 50},
});

const Model = mongoose.model('users', userScheme);

module.exports = {Model};
