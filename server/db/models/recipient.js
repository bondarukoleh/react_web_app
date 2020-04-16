const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecipientScheme = new Schema({
  email: {type: String, required: true, minlength: 5, maxlength: 50},
  responded: {type: Boolean, default: false},
});

module.exports = {RecipientScheme};
